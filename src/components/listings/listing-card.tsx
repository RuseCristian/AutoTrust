"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
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

// @ts-ignore
import Flag from "react-world-flags";
import { countryMapping } from "@/utils/countryMapping";
import LoginPopUpTrigger from "../auth/login-popup-trigger";

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
  location: {
    country: string;
    city: string;
  };
  isLoggedIn: boolean;
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
  location,
  isLoggedIn,
}: CarListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  // Handle the favorite button click
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the card
    if (isLoggedIn) {
      setIsFavorite(!isFavorite); // Toggle the favorite state
    }
  };

  const handleCardClick = () => {
    router.push(href);
  };

  const handleInfoCardClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    router.push(url);
  };

  const countryName = countryMapping[location.country];

  return (
    <TooltipProvider>
      <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20">
        <Card
          onClick={handleCardClick}
          className="transition-transform transform hover:scale-[101%] shadow-lg rounded-lg overflow-hidden flex flex-col xl:flex-row xl:min-h-64 cursor-pointer relative"
        >
          {/* Image Carousel */}
          <div
            className="p-0 w-full xl:w-1/3 min-h-[200px] sm:min-h-[300px]"
            onClick={(e) => e.stopPropagation()} // Prevents the carousel click from bubbling up
          >
            <ImageCarousel
              images={images}
              className="h-full w-full min-h-[200px] sm:min-h-[300px]"
            />
          </div>

          <CardContent className="relative p-4 w-full xl:w-2/3 xl:flex xl:flex-col xl:justify-between">
            {/* Heart Icon for Favoriting */}
            <div
              className="absolute top-4 right-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {isLoggedIn ? (
                <button
                  className="z-50 cursor-pointer"
                  onClick={handleFavoriteClick}
                >
                  {isFavorite ? (
                    <HeartFilledIcon className="w-8 h-8 text-red-500" />
                  ) : (
                    <HeartIcon className="w-8 h-8 text-gray-500" />
                  )}
                </button>
              ) : (
                <LoginPopUpTrigger>
                  <div className="z-50 cursor-pointer">
                    <HeartIcon className="w-8 h-8 text-gray-500" />
                  </div>
                </LoginPopUpTrigger>
              )}
            </div>

            {/* Car Details */}
            <div>
              <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 xl:mb-4 text-left">
                {model}
              </CardTitle>

              <div className="flex items-center space-x-2 mb-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Flag
                      code={location.country}
                      alt={countryName}
                      className="w-8 h-8"
                    />
                  </TooltipTrigger>
                  <TooltipContent>Country</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xl font-semibold text-gray-800">
                      {countryName}, {location.city}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>City</TooltipContent>
                </Tooltip>
              </div>

              <div className="mb-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
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

              {/* Dealer and Service Info Cards */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-4 sm:space-y-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-[40%] cursor-pointer"
                      onClick={(e) => handleInfoCardClick(e, dealerData.href)}
                    >
                      <InfoCard data={dealerData} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Dealership</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="w-[40%] cursor-pointer"
                      onClick={(e) => handleInfoCardClick(e, serviceData.href)}
                    >
                      <InfoCard data={serviceData} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Service</TooltipContent>
                </Tooltip>
              </div>

              {/* Responsive Price Section */}
              <div className="absolute bottom-4 right-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight text-right">
                {price}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
