import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Your Prisma client
import redisClient from "@/lib/redis"; // Your Redis client

const CACHE_KEY = "hero_images";

export async function GET() {
  try {
    // Check if data is in cache
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from database
    const heroImages = await db.heroImages.findMany();

    // Cache the result in Redis
    await redisClient.set(CACHE_KEY, JSON.stringify(heroImages), {
      EX: 2592000, // Cache expires in 30 days
    });

    return NextResponse.json(heroImages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero images" },
      { status: 500 }
    );
  }
}
