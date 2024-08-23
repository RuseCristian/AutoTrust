"use client";

import { useEffect, useState } from "react";
import { ImageCarousel } from "@/components/result/image-carousel";
import { CarDetailsCard } from "@/components/result/car-details-card";
import { CarSpecsCard } from "@/components/result/data-card";
import { InteriorOptionsCard } from "@/components/result/interior-options-card";
import { ExteriorOptionsCard } from "@/components/result/exterior-options-card";
import { TooltipProvider } from "@/components/ui/tooltip";

const CarDetailPage = ({ params }: { params: { car_id: string } }) => {
  const { car_id } = params;
  const [carDetails, setCarDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/get-car-listing/${car_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch car details");
        }

        const data = await response.json();
        console.log(data);
        setCarDetails(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [car_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!carDetails) {
    return <p>No car details found.</p>;
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 py-16 pb-2">
        {/* Car Title */}
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold">{carDetails.title}</h1>
        </div>

        {/* Image Carousel */}
        {carDetails.images && (
          <div className="my-6 w-full">
            <ImageCarousel images={carDetails.images} />
          </div>
        )}

        {/* Car Details Card */}
        <CarDetailsCard carDetails={carDetails} />

        {/* Car Specs Card */}
        <CarSpecsCard
          specs={{
            brand: carDetails.brand.name,
            model: carDetails.model.name,
            vehicleCondition: carDetails.vehicleCondition,
            mileage: carDetails.mileage,
            "Engine Capacity": carDetails.engineCapacity,
            performance: `${carDetails.power} HP`,
            driveType: carDetails.tractionType,
            fuelType: carDetails.fuelType,
            numberOfSeats: carDetails.numberOfSeats,
            numberOfDoors: carDetails.numberOfDoors,
            transmissionType: carDetails.transmissionType,
            bodyType: carDetails.bodyType,
            exteriorColor: carDetails.exteriorColor,
            interiorColor: carDetails.interiorColor,
            materialOfInterior: carDetails.materialOfInterior,
            emissionClass: carDetails.emissionClass,
            initialRegistration: carDetails.registrationDate,
            numberOfOwners: carDetails.numberOfVehicleOwners,
            airConditioning: carDetails.airConditioning,
            airbags: carDetails.airbags,
          }}
        />

        {/* Interior Options Card */}
        <InteriorOptionsCard options={carDetails.interiorOptions} />

        {/* Exterior Options Card */}
        <ExteriorOptionsCard options={carDetails.exteriorOptions} />
      </div>
    </TooltipProvider>
  );
};

export default CarDetailPage;
