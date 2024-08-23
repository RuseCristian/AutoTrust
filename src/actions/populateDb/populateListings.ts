"use server";
import { PrismaClient } from "@prisma/client";
import { db } from "@/lib/db"; // Adjust the import path if needed

const prisma = new PrismaClient();

const seedCarListings = async () => {
  const carListings = [];

  for (let i = 1; i <= 50; i++) {
    carListings.push({
      title: `Car Listing ${i}`,
      description: `This is the description for car listing ${i}.`,
      brandId: 146,
      modelId: 2047,
      registrationYear: `${2015 + (i % 7)}`,
      mileage: `${10000 + i * 500} miles`,
      price: 20000 + i * 1000,
      dealershipId: "cm0465n620005ry79w071re6l",
      serviceId: "cm04662240009ry79gocj4iat",
      vehicleCondition: "Used",
      transmissionType: "Automatic",
      numberOfGears: 6,
      tractionType: i % 2 === 0 ? "AWD" : "RWD",
      engineCapacity: 2.0,
      power: 150 + i * 10,
      emissionClass: "Euro 6",
      fuelType: "Gasoline",
      bodyType: "Sedan",
      exteriorColor: "Black",
      numberOfDoors: 4,
      numberOfSeats: 5,
      interiorColor: "Black",
      materialOfInterior: "Leather",
      airbags: "Front, Side, Curtain",
      airConditioning: "Automatic",
      interiorOptions: {
        sunroof: true,
        heatedSeats: true,
        bluetooth: true,
        navigationSystem: true,
      },
      exteriorOptions: {
        alloyWheels: true,
        ledHeadlights: true,
        parkingSensors: true,
        towBar: false,
      },
      country: "US",
      city: `City ${i % 10}`,
      images: {
        set: ["cars/1.jpg", "cars/2.jpg", "cars/3.jpg"], // Correctly storing images as JSON
      },
    });
  }

  try {
    for (const carListing of carListings) {
      await db.carListing.create({
        data: carListing,
      });
    }
    console.log("Car listings populated successfully!");
  } catch (error) {
    console.error("Failed to populate car listings:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedCarListings;
