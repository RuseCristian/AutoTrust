import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GiCarSeat } from "react-icons/gi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Importing the RadioGroup and RadioGroupItem components
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Interior({ setInteriorInfo, reset }: any) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedAirbags, setSelectedAirbags] = useState<string>("");
  const [selectedAC, setSelectedAC] = useState<string>("");
  const [interiorOptions, setInteriorOptions] = useState<string[]>([]);

  useEffect(() => {
    if (reset) {
      setSelectedColors([]);
      setSelectedMaterials([]);
      setSelectedAirbags("");
      setSelectedAC("");
      setInteriorOptions([]);
    }
  }, [reset]);

  useEffect(() => {
    setInteriorInfo({
      colors: selectedColors,
      materials: selectedMaterials,
      airbags: selectedAirbags,
      air_conditioning: selectedAC,
      options: interiorOptions,
    });
  }, [
    selectedColors,
    selectedMaterials,
    selectedAirbags,
    selectedAC,
    interiorOptions,
    setInteriorInfo,
  ]);

  const toggleSelection = (item: string, state: string[], setState: any) => {
    setState(
      state.includes(item) ? state.filter((i) => i !== item) : [...state, item]
    );
  };

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <div className="flex items-center">
          <GiCarSeat className="w-8 h-8 mr-2 text-blue-500" />
          <CardTitle className="text-left text-2xl">Interior</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        {/* Interior Color */}
        <div className="mb-8">
          <Label className="block text-left mb-2 text-xl">Interior Color</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Beige", "Brown", "Grey", "Black", "Other"].map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={color}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() =>
                    toggleSelection(color, selectedColors, setSelectedColors)
                  }
                  className={`w-6 h-6 border-2 ${
                    selectedColors.includes(color)
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  aria-label={color}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                <Label htmlFor={color} className="text-left text-gray-800">
                  {color}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Material of Interior */}
        <div className="mb-8">
          <Label className="block text-left mb-2 text-xl">
            Material of Interior
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Alcantara",
              "Fabric",
              "Partial leather",
              "Velours",
              "Full leather",
              "Other",
            ].map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={material}
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={() =>
                    toggleSelection(
                      material,
                      selectedMaterials,
                      setSelectedMaterials
                    )
                  }
                  className={`w-6 h-6 border-2 ${
                    selectedMaterials.includes(material)
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                />
                <Label htmlFor={material} className="text-left text-gray-800">
                  {material}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Airbags (Radio Group) */}
        <div className="mb-8">
          <Label className="block text-left mb-2 text-xl">Airbags</Label>
          <RadioGroup
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            value={selectedAirbags}
            onValueChange={(value) => setSelectedAirbags(value)}
          >
            {[
              "Any",
              "Driver airbag",
              "Front airbags",
              "Front and side airbags",
              "Front, side and other airbags",
            ].map((airbag) => (
              <div key={airbag} className="flex items-center space-x-2">
                <RadioGroupItem value={airbag} id={airbag} />
                <Label htmlFor={airbag} className="text-left">
                  {airbag}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Air Conditioning (Radio Group) */}
        <div className="mb-8">
          <Label className="block text-left mb-2 text-xl">
            Air Conditioning
          </Label>
          <RadioGroup
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            value={selectedAC}
            onValueChange={(value) => setSelectedAC(value)}
          >
            {[
              "Any",
              "No air conditioning or automatic",
              "Air conditioning or automatic",
              "Automatic climate",
              "2-zone automatic climate control",
              "3-zone climate control",
              "4-zone automatic air conditioning",
            ].map((ac) => (
              <div key={ac} className="flex items-center space-x-2">
                <RadioGroupItem value={ac} id={ac} />
                <Label htmlFor={ac} className="text-left text-gray-800">
                  {ac}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Collapsible Options Section */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="extras">
            <AccordionTrigger className="flex justify-start items-center text-left">
              <Label className="text-xl">Options</Label>
            </AccordionTrigger>
            <AccordionContent className="mt-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  "Alarm system",
                  "Ambiente lighting",
                  "Android Auto",
                  "Apple CarPlay",
                  "Armrest",
                  "Heated steering wheel",
                  "Disabled accessible",
                  "Bluetooth",
                  "On-board computer",
                  "CD players",
                  "Electr. Window lifters",
                  "Electr. Side mirror",
                  "Electr. Seat adjustment",
                  "Electr. Seat adjustment, rear",
                  "Hands-free kit",
                  "Luggage compartment separation",
                  "Head-up display",
                  "Induction store for smartphones",
                  "Interior mirror autom. dim",
                  "Isofix",
                  "Isofix passenger seat",
                  "Leather steering wheel",
                  "Lordo's support",
                  "Massage seats",
                  "Fatigue warning",
                  "Multi-function steering wheel",
                  "Music streaming integrated",
                  "Navigation system",
                  "Emergency call system",
                  "Radio DAB",
                  "Smoking package",
                  "Switch-flipping",
                  "Seat ventilation",
                  "Seat heating",
                  "Seat heating rear",
                  "Ski bag",
                  "Sound system",
                  "Sports seats",
                  "Voice control",
                  "Standing heater",
                  "Touchscreen",
                  "Tuner / Radio",
                  "TV",
                  "Folding passenger seat",
                  "USB",
                  "Fully digital instrument cluster",
                  "Winter package",
                  "WLAN / Wifi Hotspot",
                ].map((extra) => (
                  <div key={extra} className="flex items-center space-x-2">
                    <Checkbox
                      id={extra}
                      checked={interiorOptions.includes(extra)}
                      onCheckedChange={() =>
                        toggleSelection(
                          extra,
                          interiorOptions,
                          setInteriorOptions
                        )
                      }
                      className={`w-6 h-6 border-2 ${
                        interiorOptions.includes(extra)
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    />
                    <Label htmlFor={extra} className="text-left text-gray-800">
                      {extra}
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
