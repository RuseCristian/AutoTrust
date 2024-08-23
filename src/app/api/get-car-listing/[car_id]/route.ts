import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { car_id: string } }
) {
  const { car_id } = params;
  console.log("test");
  try {
    const carListing = await db.carListing.findUnique({
      where: { id: car_id },
      include: {
        dealership: true,
        service: true,
        brand: true,
        model: true,
      },
    });

    if (!carListing) {
      return NextResponse.json(
        { error: "Car listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(carListing);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
