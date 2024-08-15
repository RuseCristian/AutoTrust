"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import {
  PiRoadHorizon,
  PiCalendarBlank,
  PiGasPump,
  PiEngine,
  PiLightning,
  PiTire,
} from "react-icons/pi";
import { GiGearStickPattern } from "react-icons/gi";
import { InfoCard } from "@/components/listings/info-card";
import { ImageCarousel } from "@/components/listings/image-carousel";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface CarListingCardProps {
  images: string[];
  model: string;
  price: string;
  registrationYear: string;
  mileage: string;
  horsepower: string;
  transmission: string;
  fuelType: string;
  tractionType: string;
  href: string;
  dealerData: {
    imageSrc: string;
    name: string;
    href: string;
    rating: number;
  };
  serviceData: {
    imageSrc: string;
    name: string;
    href: string;
    rating: number;
  };
}

export function CarListingCard({
  images,
  model,
  price,
  registrationYear,
  mileage,
  horsepower,
  transmission,
  fuelType,
  tractionType,
  href,
  dealerData,
  serviceData,
}: CarListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    router.push(href);
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20">
        <Card
          onClick={handleClick}
          className="transition-transform transform hover:scale-[101%] shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row lg:flex-row lg:min-h-64 cursor-pointer"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="absolute top-4 right-4 cursor-pointer z-30"
          >
            {isFavorite ? (
              <HeartFilledIcon className="w-8 h-8 text-red-500 transition-transform transform duration-200 ease-in-out" />
            ) : (
              <HeartIcon className="w-8 h-8 text-gray-500 transition-transform transform duration-200 ease-in-out" />
            )}
          </div>
          <CardHeader className="p-0 w-full md:w-1/2 lg:w-1/3">
            <ImageCarousel images={images} className="h-full w-full" />
          </CardHeader>
          <CardContent className="p-4 w-full md:w-1/2 lg:w-2/3 lg:flex lg:flex-col lg:justify-between">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800 lg:mb-4 sm:mb-8 md:mb-8 text-left">
                {model}
              </CardTitle>
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardDescription className="flex items-center text-gray-600">
                      <PiCalendarBlank className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />{" "}
                      {registrationYear}
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent>Registration Year</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardDescription className="flex items-center text-gray-600">
                      <PiRoadHorizon className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />{" "}
                      {mileage} miles
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent>Mileage</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardDescription className="flex items-center text-gray-600">
                      <PiEngine className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />{" "}
                      {horsepower} HP
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent>Horsepower</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardDescription className="flex items-center text-gray-600">
                      <GiGearStickPattern className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />{" "}
                      {transmission}
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent>Transmission Type</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardDescription className="flex items-center text-gray-600">
                      {fuelType === "Electric" ? (
                        <PiLightning className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                      ) : (
                        <PiGasPump className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                      )}{" "}
                      {fuelType}
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent>Fuel Type</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardDescription className="flex items-center text-gray-600">
                      <PiTire className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />{" "}
                      {tractionType}
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent>Traction Type</TooltipContent>
                </Tooltip>
              </div>
              <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <InfoCard data={dealerData} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Dealership</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-full">
                      <InfoCard data={serviceData} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Service</TooltipContent>
                </Tooltip>
                <div className="text-2xl sm:text-3xl pt-4 sm:pt-12 font-bold text-gray-800">
                  {price}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
