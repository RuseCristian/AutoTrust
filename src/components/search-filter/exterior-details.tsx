import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IoCarSportOutline } from "react-icons/io5"; // Updated icon
import { Label } from "@/components/ui/label";
import CustomDropdownInput from "../ui/input-with-dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Exterior({ setExteriorInfo, reset }: any) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [numberOfDoors, setNumberOfDoors] = useState<string>("");
  const [numberOfSeats, setNumberOfSeats] = useState<string>("");
  const [exteriorOptions, setExteriorOptions] = useState<string[]>([]);
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);

  useEffect(() => {
    if (reset) {
      setSelectedColors([]);
      setNumberOfDoors("");
      setNumberOfSeats("");
      setExteriorOptions([]);
      setBodyTypes([]);
    }
  }, [reset]);

  useEffect(() => {
    setExteriorInfo({
      colors: selectedColors,
      number_of_doors: numberOfDoors,
      number_of_seats: numberOfSeats,
      options: exteriorOptions,
      body_types: bodyTypes,
    });
  }, [
    selectedColors,
    numberOfDoors,
    numberOfSeats,
    exteriorOptions,
    bodyTypes,
    setExteriorInfo,
  ]);

  const toggleSelection = (item: string, state: string[], setState: any) => {
    setState(
      state.includes(item) ? state.filter((i) => i !== item) : [...state, item]
    );
  };

  const handleSingleSelection = (value: string, setState: any) => {
    setState(value);
  };

  const toggleBodyType = (type: string) => {
    toggleSelection(type, bodyTypes, setBodyTypes);
  };

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <div className="flex items-center">
          <IoCarSportOutline className="w-8 h-8 mr-2 text-blue-500" />
          <CardTitle className="text-left text-2xl">Exterior</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        <div className="mb-8 -mt-2">
          <Label className="block text-left mb-4 text-xl">Body Types</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4">
            {[
              { type: "Cabrio/Roadster", label: "Cabrio/Roadster" },
              { type: "SUV/ Pickup/SUV", label: "SUV/ Pickup/SUV" },
              { type: "Small cars", label: "Small cars" },
              { type: "Combi", label: "Combi" },
              { type: "Limousine", label: "Limousine" },
              { type: "Sports car/ Coupé", label: "Sports car/ Coupé" },
              { type: "Van/Minibus", label: "Van/Minibus" },
              { type: "Other", label: "Other" },
            ].map(({ type, label }) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={bodyTypes.includes(type)}
                  onCheckedChange={() => toggleBodyType(type)}
                  className={`w-6 h-6 border-2 ${
                    bodyTypes.includes(type)
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                />
                <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" />
                <Label htmlFor={type} className="text-sm text-left">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="block text-left mb-2 text-xl">Color</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Black",
              "Beige",
              "Grey",
              "Brown",
              "White",
              "Orange",
              "Blue",
              "Yellow",
              "Red",
              "Green",
              "Silver",
              "Gold",
              "Violet",
              "Any",
            ].map((color) => (
              <div
                key={color}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() =>
                  toggleSelection(color, selectedColors, setSelectedColors)
                }
              >
                <div
                  className={`relative w-6 h-6 rounded-sm border-2 ${
                    selectedColors.includes(color)
                      ? "border-gray-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                  style={{
                    backgroundColor: color !== "Any" ? color : "transparent",
                    borderColor:
                      color === "White" && selectedColors.includes(color)
                        ? "gray"
                        : undefined,
                  }}
                >
                  {selectedColors.includes(color) && (
                    <CheckIcon
                      className={`w-4 h-4 ${
                        color === "White" ? "text-black" : "text-white"
                      }`}
                    />
                  )}
                </div>
                <span className="text-gray-800 text-left">{color}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mt-8">
          <div>
            <Label htmlFor="numberOfDoors" className="block text-left mb-2">
              Number of Doors
            </Label>
            <CustomDropdownInput
              placeholder="Enter number of doors"
              options={["2", "3", "4", "5"]}
              name="numberOfDoors"
              maxLength={1}
              onSelect={(value) =>
                handleSingleSelection(value, setNumberOfDoors)
              }
            />
          </div>

          <div>
            <Label htmlFor="numberOfSeats" className="block text-left mb-2">
              Number of Seats
            </Label>
            <CustomDropdownInput
              placeholder="Enter number of seats"
              options={["2", "4", "5", "7"]}
              name="numberOfSeats"
              maxLength={1}
              onSelect={(value) =>
                handleSingleSelection(value, setNumberOfSeats)
              }
            />
          </div>
        </div>

        {/* Collapsible Options Section */}
        <Accordion type="single" collapsible className="w-full mt-8">
          <AccordionItem value="options">
            <AccordionTrigger className="text-left">
              <Label className="text-xl font-medium">Options</Label>
            </AccordionTrigger>
            <AccordionContent className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  "ABS",
                  "Distance warning",
                  "Adaptive cornering light",
                  "All-wheel drive",
                  "All-weather tyres",
                  "Heated windscreen",
                  "Bi-Xenon headlights",
                  "Roof rail",
                  "Electr. Rear flap",
                  "ESP",
                  "Speed limitation system",
                  "Laser light",
                  "LED headlights",
                  "Light alloy rims",
                  "Air suspension",
                  "Fog lights",
                  "Emergency braking assistant",
                  "Panoramic roof",
                  "Rain sensor",
                  "Keyless central lock",
                  "Sports suspension",
                  "Traction control",
                  "Xenon headlights",
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={exteriorOptions.includes(option)}
                      onCheckedChange={() =>
                        toggleSelection(
                          option,
                          exteriorOptions,
                          setExteriorOptions
                        )
                      }
                      className="w-6 h-6 border-2 border-gray-300"
                    />
                    <Label htmlFor={option} className="text-gray-800 text-left">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
