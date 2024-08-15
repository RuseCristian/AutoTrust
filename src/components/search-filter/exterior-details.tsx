import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BodyTypeCheckboxGroup from "./body-type-checkbox-group";
import { IoCarSportOutline } from "react-icons/io5"; // Updated icon
import { Label } from "@/components/ui/label";
import CustomDropdownInput from "../ui/input-with-dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Exterior() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const toggleColorSelection = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
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
        <div className="mb-8 -mt-12">
          <BodyTypeCheckboxGroup />
        </div>

        <div>
          <Label className="block text-left mb-2 text-xl">Color</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { color: "black", label: "Black" },
              { color: "beige", label: "Beige" },
              { color: "grey", label: "Grey" },
              { color: "brown", label: "Brown" },
              { color: "white", label: "White" },
              { color: "orange", label: "Orange" },
              { color: "blue", label: "Blue" },
              { color: "yellow", label: "Yellow" },
              { color: "red", label: "Red" },
              { color: "green", label: "Green" },
              { color: "silver", label: "Silver" },
              { color: "gold", label: "Gold" },
              { color: "violet", label: "Violet" },
              { color: "any", label: "Any" },
            ].map(({ color, label }) => (
              <div
                key={color}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toggleColorSelection(color)}
              >
                <div
                  className={`relative w-6 h-6 rounded-sm border-2 ${
                    selectedColors.includes(color) ? "border-gray-500" : "border-gray-300"
                  } flex items-center justify-center`}
                  style={{
                    backgroundColor: color !== "any" ? color : "transparent",
                    borderColor: color === "white" && selectedColors.includes(color) ? "gray" : undefined,
                  }}
                >
                  {selectedColors.includes(color) && (
                    <CheckIcon
                      className={`w-4 h-4 ${
                        color === "white" ? "text-black" : "text-white"
                      }`}
                    />
                  )}
                </div>
                <span className="text-gray-800">{label}</span>
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
            />
          </div>
        </div>

        {/* Expandable Options Section */}
        <Accordion type="single" collapsible className="w-full mt-8">
          <AccordionItem value="extras">
            <AccordionTrigger className="flex justify-start items-center text-left">
              <Label className="text-xl font-medium hover:underline">Options</Label>
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
                  "Berganfahrassistent",
                  "Bi-Xenon headlights",
                  "Glare-free high beam",
                  "Roof rail",
                  "Electr. Rear flap",
                  "Electr. immobiliser",
                  "ESP",
                  "Long-range light assistant",
                  "Speed limitation system",
                  "Curved light",
                  "Laser light",
                  "LED headlights",
                  "LED daytime running lights",
                  "Light alloy rims",
                  "Light sensor",
                  "Air suspension",
                  "Night vision assistant",
                  "Fog lights",
                  "Emergency braking assistant",
                  "Emergency wheel",
                  "Breakdown kit",
                  "Panoramic roof",
                  "Rain sensor",
                  "Tire pressure control",
                  "Reserve wheel",
                  "Headlight cleaning",
                  "Sliding roof",
                  "Keyless central lock",
                  "Servo steering",
                  "Summer tyres",
                  "Sports suspension",
                  "Sports package",
                  "Lane Keeping Assistant",
                  "Steel rims",
                  "Start/stop automatic",
                  "Daytime running lights",
                  "Dead angle assistant",
                  "Traction control",
                  "Traffic sign recognition",
                  "Winter tyres",
                  "Xenon headlights",
                  "Central lock",
                ].map((extra) => (
                  <div key={extra} className="flex items-center space-x-2">
                    <Checkbox
                      id={extra}
                      className="w-6 h-6 border-2 border-gray-300"
                    />
                    <Label htmlFor={extra}>{extra}</Label>
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
