import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure your Prisma client is correctly configured
import redisClient from "@/lib/redis"; // Ensure this points to your Redis client setup

const CACHE_KEY = "featured_collections";

export async function GET() {
  try {
    // Check if data is in cache
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from database
    const collections = await db.featuredCollections.findMany();

    // Cache the result in Redis
    await redisClient.set(CACHE_KEY, JSON.stringify(collections), {
      EX: 2592000, // Cache expires in 30 days
    });

    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch featured collections" },
      { status: 500 }
    );
  }
}
