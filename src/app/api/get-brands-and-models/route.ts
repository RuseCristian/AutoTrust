import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import redisClient from "@/lib/redis";

const CACHE_KEY = "car_brands_with_models";

export async function GET() {
  try {
    // Check if data is in cache
    const cachedData = await redisClient.get(CACHE_KEY);

    if (cachedData) {
      return NextResponse.json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from database
    const brands = await db.carBrand.findMany({
      include: {
        models: true,
      },
    });

    // Cache the result in Redis
    await redisClient.set(CACHE_KEY, JSON.stringify(brands), {
      EX: 2592000, // Cache expires in 30 days
    });

    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch brands and models" },
      { status: 500 }
    );
  }
}
