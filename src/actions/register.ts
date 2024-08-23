"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterDealerSchema, RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/services/user";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  role: "BUYER" | "DEALER" | "SERVICE" | "ADMIN"
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, firstName, lastName } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success:
      "Account created successfully! Confirmation email sent! You will shortly be redirected to the login page.",
    userId: user.id,
  };
};
export const createDealership = async (
  userId: string,
  dealershipName: string,
  phoneNumber: string,
  pdfFilePath: string
) => {
  // Check if the user already has a dealership assigned
  const existingDealershipForUser = await db.dealership.findUnique({
    where: { userId },
  });

  if (existingDealershipForUser) {
    return { error: "This user already has an assigned dealership." };
  }

  // Check if any dealership exists with the same name
  const existingDealershipByName = await db.dealership.findUnique({
    where: { dealershipName },
  });

  if (existingDealershipByName) {
    return { error: "A dealership with this name already exists." };
  }

  // Check if the phone number is already in use
  const existingDealershipByPhone = await db.dealership.findUnique({
    where: { phoneNumber },
  });

  if (existingDealershipByPhone) {
    return {
      error: "This phone number is already associated with another dealership.",
    };
  }

  // Create the dealership record
  await db.dealership.create({
    data: {
      dealershipName,
      phoneNumber,
      pdfFilePath,
      userId,
    },
  });

  return {
    success:
      "Dealership created successfully!  Confirmation email sent! You will shortly be redirected to the login page.",
  };
};

export const createService = async (
  userId: string,
  serviceName: string,
  phoneNumber: string,
  pdfFilePath: string
) => {
  // Check if the user already has a service assigned
  const existingServiceForUser = await db.service.findUnique({
    where: { userId },
  });

  if (existingServiceForUser) {
    return { error: "This user already has an assigned service." };
  }

  // Check if any service exists with the same name
  const existingServiceByName = await db.service.findUnique({
    where: { serviceName },
  });

  if (existingServiceByName) {
    return { error: "A service with this name already exists." };
  }

  // Check if the phone number is already in use
  const existingServiceByPhone = await db.service.findUnique({
    where: { phoneNumber },
  });

  if (existingServiceByPhone) {
    return {
      error: "This phone number is already associated with another service.",
    };
  }

  // Create the service record
  await db.service.create({
    data: {
      serviceName,
      phoneNumber,
      pdfFilePath,
      userId,
    },
  });

  return {
    success:
      "Service created successfully! Confirmation email sent! You will shortly be redirected to the login page.",
  };
};
