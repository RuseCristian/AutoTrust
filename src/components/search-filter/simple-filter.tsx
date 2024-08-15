"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomDropdownInput from "@/components/ui/input-with-dropdown";
import { MixerHorizontalIcon, BookmarkIcon } from "@radix-ui/react-icons";
import H2Header from "@/components/ui/h2-header"; // Importing the H2Header component

const carBrands: { [brand: string]: string[] } = {
  BMW: ["3 Series", "5 Series", "X5", "M3"],
  Mercedes: ["C-Class", "E-Class", "GLA", "S-Class"],
  Audi: ["A4", "Q5", "A6", "R8"],
};

export default function SimpleFilter() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const router = useRouter();

  const redirectToAdvanced = () => {
    router.push("/listings/advanced-search");
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20">
      <H2Header label="Search For Your Next Car" />

      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Brand Selection */}
            <div className="flex flex-col justify-between">
              <Label htmlFor="brand" className="block text-left mb-1">
                Brand
              </Label>
              <Select onValueChange={setSelectedBrand} value={selectedBrand}>
                <SelectTrigger id="brand">
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
            <div className="flex flex-col justify-between">
              <Label htmlFor="model" className="block text-left mb-1">
                Model
              </Label>
              <Select
                onValueChange={setSelectedModel}
                value={selectedModel}
                disabled={!selectedBrand}
              >
                <SelectTrigger id="model">
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

            {/* Mileage Input with Dropdown */}
            <div className="flex flex-col justify-between">
              <CustomDropdownInput
                label="Mileage"
                placeholder="Select or type mileage"
                options={["10,000", "20,000", "30,000"]}
              />
            </div>

            {/* Price Input with Dropdown */}
            <div className="flex flex-col justify-between">
              <CustomDropdownInput
                label="Price"
                placeholder="Select or type price"
                options={["10,000", "20,000", "30,000"]}
              />
            </div>

            {/* Year Input with Dropdown */}
            <div className="flex flex-col justify-between">
              <CustomDropdownInput
                label="Year"
                placeholder="Select or type year"
                options={["2020", "2021", "2022"]}
              />
            </div>

            {/* Keywords Input */}
            <div className="flex flex-col justify-between">
              <Label className="block text-left mb-1">Keywords</Label>
              <Input placeholder="Enter keywords" className="w-full" />
            </div>
          </div>

          {/* Row with Advanced Filters, Saved Searches, and Search Button */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-4">
              <button
                className="flex items-center text-gray-600 hover:text-blue-500"
                onClick={redirectToAdvanced} // Redirect to advanced filter page
              >
                <MixerHorizontalIcon className="w-5 h-5 mr-2 text-blue-500" />
                Advanced Filters
              </button>
              <button className="flex items-center text-gray-600 hover:text-blue-500">
                <BookmarkIcon className="w-5 h-5 mr-2 text-blue-500" />
                Saved Searches
              </button>
            </div>
            <Button onClick={() => console.log("Searching...")}>Search</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
