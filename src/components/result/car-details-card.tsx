"use client";

import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  PiCalendarBlank,
  PiRoadHorizon,
  PiGasPump,
  PiEngine,
  PiTire,
  PiLightning,
} from "react-icons/pi";
import { GiGearStickPattern } from "react-icons/gi";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface CarListing {
  transmissionType: string;
  power: string;
  registrationYear: string;
  mileage: string;
  transmission: string;
  fuelType: string;
  tractionType: string;
}

export const CarDetailsCard = ({ carDetails }: { carDetails: CarListing }) => {
  return (
    <Card className="mt-8 shadow-lg">
      <CardContent>
        <CardTitle className="text-2xl font-semibold mb-4"></CardTitle>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <CardDescription className="flex items-center text-gray-600">
                <PiCalendarBlank className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                {carDetails.registrationYear}
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent>Registration Year</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardDescription className="flex items-center text-gray-600">
                <PiRoadHorizon className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                {carDetails.mileage} miles
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent>Mileage</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardDescription className="flex items-center text-gray-600">
                <PiEngine className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                {carDetails.power} HP
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent>Horsepower</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardDescription className="flex items-center text-gray-600">
                <GiGearStickPattern className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                {carDetails.transmissionType}
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent>Transmission Type</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardDescription className="flex items-center text-gray-600">
                {carDetails.fuelType === "Electric" ? (
                  <PiLightning className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                ) : (
                  <PiGasPump className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                )}
                {carDetails.fuelType}
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent>Fuel Type</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <CardDescription className="flex items-center text-gray-600">
                <PiTire className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-blue-500" />
                {carDetails.tractionType}
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent>Traction Type</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};
