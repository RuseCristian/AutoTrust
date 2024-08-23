"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { db } from "@/lib/db"; // Assuming you have db imported

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  if (!existingUser.emailVerified) {
    return { error: "Account has not yet been verified!" };
  }

  const currentTime = new Date();
  const timeDifferenceSinceLastRequest = existingUser.passwordResetRequestedAt
    ? Math.abs(
        (currentTime.getTime() -
          existingUser.passwordResetRequestedAt.getTime()) /
          (1000 * 60 * 60) // Convert milliseconds to hours
      )
    : null;

  if (
    timeDifferenceSinceLastRequest !== null &&
    timeDifferenceSinceLastRequest < 1 &&
    existingUser.passwordResetAttempts >= 3
  ) {
    return {
      error:
        "Too many password reset requests. Please try again after an hour.",
    };
  }

  // Reset attempt counter after an hour
  if (
    timeDifferenceSinceLastRequest !== null &&
    timeDifferenceSinceLastRequest >= 1
  ) {
    existingUser.passwordResetAttempts = 0;
  }

  // Check if password was recently reset
  if (existingUser.passwordLastReset) {
    const timeDifference = Math.abs(
      (currentTime.getTime() - existingUser.passwordLastReset.getTime()) /
        (1000 * 60 * 60)
    );
    if (timeDifference <= 24) {
      return { error: "Password has already been reset in the last 24 hours." };
    }
  }

  // Update user record with the new reset request time and increment the attempt counter
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      passwordResetRequestedAt: currentTime,
      passwordResetAttempts: existingUser.passwordResetAttempts + 1,
    },
  });

  // Generate and send the password reset token
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success:
      "Reset email sent! You will shortly be redirected to the main page.",
  };
};
