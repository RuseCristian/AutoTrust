import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CustomDropdownInput from "../ui/input-with-dropdown"; // Corrected import path
import { PiCalendarBlank } from "react-icons/pi"; // Importing the calendar icon
import { Separator } from "../ui/separator";

const carBrands: { [brand: string]: string[] } = {
  BMW: ["3 Series", "5 Series", "X5", "M3"],
  Mercedes: ["C-Class", "E-Class", "GLA", "S-Class"],
  Audi: ["A4", "Q5", "A6", "R8"],
};

export default function CarInfo() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <div className="flex items-center space-x-2 text-left">
          <PiCalendarBlank className="w-8 h-8 text-blue-500" /> {/* Calendar icon */}
          <CardTitle className="text-left text-2xl">Car Info</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        {/* First Row: Brand and Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mb-12">
          {/* Brand Selection */}
          <div>
            <Label htmlFor="brand" className="block text-left mb-2">
              Brand
            </Label>
            <Select onValueChange={setSelectedBrand} value={selectedBrand}>
              <SelectTrigger id="brand" className="text-gray-500">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(carBrands).map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          <div>
            <Label htmlFor="model" className="block text-left mb-2">
              Model
            </Label>
            <Select
              onValueChange={setSelectedModel}
              value={selectedModel}
              disabled={!selectedBrand}
            >
              <SelectTrigger id="model" className="text-gray-500">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {selectedBrand &&
                  carBrands[selectedBrand]?.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Second Row: Registration Year and Mileage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mb-12">
          {/* Registration Year */}
          <div>
            <Label htmlFor="registrationYear" className="block text-left mb-2">
              Registration Year
            </Label>
            <div className="flex items-center space-x-2">
              <CustomDropdownInput
                placeholder="From"
                options={["2020", "2021", "2022"]}
                name="registrationYearFrom"
                className="w-1/2"
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["2020", "2021", "2022"]}
                name="registrationYearTo"
                className="w-1/2"
              />
            </div>
          </div>

          {/* Mileage */}
          <div>
            <Label htmlFor="mileage" className="block text-left mb-2">
              Mileage
            </Label>
            <div className="flex items-center space-x-2">
              <CustomDropdownInput
                placeholder="From"
                options={["10,000", "20,000", "30,000"]}
                name="mileageFrom"
                className="w-1/2"
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["10,000", "20,000", "30,000"]}
                name="mileageTo"
                className="w-1/2"
              />
            </div>
          </div>
        </div>

        {/* Third Row: Price and Keywords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12">
          {/* Price */}
          <div>
            <Label htmlFor="price" className="block text-left mb-2">
              Price
            </Label>
            <div className="flex items-center space-x-2">
              <CustomDropdownInput
                placeholder="From"
                options={["10,000", "20,000", "30,000"]}
                name="priceFrom"
                className="w-1/2"
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["10,000", "20,000", "30,000"]}
                name="priceTo"
                className="w-1/2"
              />
            </div>
          </div>

          {/* Keywords */}
          <div>
            <Label htmlFor="keywords" className="block text-left mb-2">
              Keywords
            </Label>
            <Input id="keywords" placeholder="Enter keywords" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
