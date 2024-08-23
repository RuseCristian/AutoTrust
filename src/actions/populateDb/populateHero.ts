"use server";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db";

const prisma = new PrismaClient();

const heroImages = [
  "/illustration_art/hero/1.jpg",
  "/illustration_art/hero/2.jpg",
  "/illustration_art/hero/3.jpg",
  "/illustration_art/hero/4.jpg",
  "/illustration_art/hero/5.jpg",
  "/illustration_art/hero/6.jpg",
  "/illustration_art/hero/7.jpg",
  "/illustration_art/hero/8.jpg",
  "/illustration_art/hero/9.jpg",
  "/illustration_art/hero/10.jpg",
  "/illustration_art/hero/11.jpg",
  "/illustration_art/hero/12.jpg",
  "/illustration_art/hero/13.jpg",
];

export async function seedHeroImages() {
  try {
    for (const location of heroImages) {
      await db.heroImages.create({
        data: { location },
      });
    }
    console.log("Hero images populated successfully!");
  } catch (error) {
    console.error("Failed to populate hero images:", error);
  } finally {
    await prisma.$disconnect();
  }
}
