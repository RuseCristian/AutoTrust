"use server";

import { AuthError } from "next-auth";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/services/two-factor-token";
import { getUserByEmail } from "@/services/user";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  // Check if the password matches
  const passwordMatches = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatches) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const now = new Date();
    const lastAttempt = existingUser.verificationEmailSentAt;
    const attempts = existingUser.verificationEmailAttempts;

    // Check if the user has exceeded the rate limit
    if (
      lastAttempt &&
      attempts >= 3 &&
      now.getTime() - new Date(lastAttempt).getTime() < 15 * 60 * 1000 // 15 minutes
    ) {
      return {
        error:
          "You have exceeded the maximum number of verification email attempts. Please try again later.",
      };
    }

    // Generate and send the verification email
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    // Update the user record with the new attempt
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        verificationEmailSentAt: now,
        verificationEmailAttempts:
          lastAttempt &&
          now.getTime() - new Date(lastAttempt).getTime() < 15 * 60 * 1000
            ? attempts + 1
            : 1, // Reset the counter if 15 minutes have passed
      },
    });

    return { success: "Confirmation email resent!" };
  }

  // Check if the account is associated with a dealer or service and if it's verified
  if (existingUser.role === "DEALER") {
    const dealership = await db.dealership.findUnique({
      where: { userId: existingUser.id },
    });

    if (dealership && !dealership.verifiedAt) {
      return {
        error:
          "Dealer Certificate has not yet been manually verified by authorized personnel, please wait.",
      };
    }
  }

  if (existingUser.role === "SERVICE") {
    const service = await db.service.findUnique({
      where: { userId: existingUser.id },
    });

    if (service && !service.verifiedAt) {
      return {
        error:
          "Service Certificate has not yet been manually verified by authorized personnel, please wait.",
      };
    }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
