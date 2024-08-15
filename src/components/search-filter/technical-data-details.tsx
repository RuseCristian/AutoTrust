import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PiEngineLight } from "react-icons/pi";
import CustomDropdownInput from "../ui/input-with-dropdown"; // Importing the custom dropdown input component
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function TechnicalData() {
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);

  const toggleFuelType = (type: string) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <div className="flex items-center">
          <PiEngineLight className="w-8 h-8 mr-2 text-blue-500" />
          <CardTitle className="text-left text-2xl">Technical Data</CardTitle>
        </div>
      </CardHeader>

      {/* Separator between header and content */}
      <Separator />

      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-12 mb-12">
          {/* Transmission Type Selection */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="transmissionType" className="block text-left mb-1">
              Transmission Type
            </Label>
            <CustomDropdownInput
              placeholder="Select transmission type"
              options={["Automatic", "Manual"]}
              name="transmissionType"
            />
          </div>

          {/* Number of Gears Input */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="numberOfGears" className="block text-left mb-1">
              Number of Gears
            </Label>
            <Input id="numberOfGears" placeholder="Enter number of gears" />
          </div>

          {/* Traction Type Selection */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="tractionType" className="block text-left mb-1">
              Traction Type
            </Label>
            <CustomDropdownInput
              placeholder="Select traction type"
              options={["FWD", "RWD", "AWD"]}
              name="tractionType"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-12 mb-12">
          {/* Engine Capacity (from and up to) */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="engineCapacity" className="block text-left mb-1">
              Engine Capacity
            </Label>
            <div className="flex items-center">
              <CustomDropdownInput
                placeholder="From"
                options={["1.0L", "1.5L", "2.0L", "3.0L"]}
                name="engineCapacityFrom"
                className="mr-2 w-1/2"
              />
              <span className="text-gray-500 mx-2">-</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["1.0L", "1.5L", "2.0L", "3.0L"]}
                name="engineCapacityUpTo"
                className="ml-2 w-1/2"
              />
            </div>
          </div>

          {/* Power Input */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="power" className="block text-left mb-1">
              Power
            </Label>
            <div className="flex items-center">
              <CustomDropdownInput
                placeholder="From"
                options={["100", "200", "300"]}
                name="powerFrom"
                className="mr-2 w-1/2"
              />
              <span className="text-gray-500 mx-2">-</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["100", "200", "300"]}
                name="powerTo"
                className="ml-2 w-1/2"
              />
            </div>
          </div>

          {/* Emission Class Selection */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="emissionClass" className="block text-left mb-1">
              Emission Class
            </Label>
            <CustomDropdownInput
              placeholder="Select emission class"
              options={["Euro 6", "Euro 5", "Euro 4"]}
              name="emissionClass"
            />
          </div>
        </div>

        <div className="mb-12">
          {/* Fuel Type Checkbox Group */}
          <Label htmlFor="fuelType" className="block text-left mb-2 text-xl">
            Fuel Type
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Gasoline",
              "Diesel",
              "Electrical electric",
              "Ethanol (FFV, E85 etc.)",
              "Hybrid (diesel/electric)",
              "Hybrid (gasoline/electric)",
              "Hydrogen",
              "LPG (LPG)",
              "Natural gas (CNG)",
              "Plug-in Hybrid",
              "Other"
            ].map((fuelType) => (
              <div key={fuelType} className="flex items-center space-x-2">
                <Checkbox
                  id={fuelType}
                  checked={selectedFuelTypes.includes(fuelType)}
                  onCheckedChange={() => toggleFuelType(fuelType)}
                  className="w-6 h-6 border-2 border-gray-300"
                />
                <Label htmlFor={fuelType} className="text-gray-800">
                  {fuelType}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
