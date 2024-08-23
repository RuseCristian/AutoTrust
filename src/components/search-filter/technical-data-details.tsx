import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PiEngineLight } from "react-icons/pi";
import CustomDropdownInput from "../ui/input-with-dropdown";
import Combobox from "../ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";

export default function TechnicalData({
  setTechnicalData,
  reset,
}: {
  setTechnicalData: (info: any) => void;
  reset: boolean;
}) {
  const [selectedTransmissionType, setSelectedTransmissionType] =
    useState<string>("");
  const [selectedTractionType, setSelectedTractionType] = useState<string>("");
  const [selectedEmissionClass, setSelectedEmissionClass] =
    useState<string>("");
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [engineCapacityFrom, setEngineCapacityFrom] = useState<string>("");
  const [engineCapacityTo, setEngineCapacityTo] = useState<string>("");
  const [powerFrom, setPowerFrom] = useState<string>("");
  const [powerTo, setPowerTo] = useState<string>("");
  const [numberOfGears, setNumberOfGears] = useState<string>("");

  const engineCapacityOptions = [
    "0.6",
    "0.8",
    "1.0",
    "1.2",
    "1.4",
    "1.6",
    "1.8",
    "2.0",
    "2.5",
    "3.0",
    "4.0",
    "5.0",
    "6.0",
    "7.0",
    "8.0",
    "9.0",
  ];

  const horsepowerOptions = [
    "30",
    "50",
    "80",
    "100",
    "150",
    "200",
    "250",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ];

  const emissionClassesOptions = [
    "Euro 1",
    "Euro 2",
    "Euro 3",
    "Euro 4",
    "Euro 5",
    "Euro 6",
  ];
  const toggleFuelType = (type: string) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  useEffect(() => {
    setTechnicalData({
      transmissionType: selectedTransmissionType,
      tractionType: selectedTractionType,
      emissionClass: selectedEmissionClass,
      fuelTypes: selectedFuelTypes,
      engineCapacity: {
        from: engineCapacityFrom,
        to: engineCapacityTo,
      },
      power: {
        from: powerFrom,
        to: powerTo,
      },
      numberOfGears, // Adding numberOfGears to the technical data state
    });
  }, [
    selectedTransmissionType,
    selectedTractionType,
    selectedEmissionClass,
    selectedFuelTypes,
    engineCapacityFrom,
    engineCapacityTo,
    powerFrom,
    powerTo,
    numberOfGears, // Trigger update on number of gears change
    setTechnicalData,
  ]);

  useEffect(() => {
    if (reset) {
      setSelectedTransmissionType("");
      setSelectedTractionType("");
      setSelectedEmissionClass("");
      setSelectedFuelTypes([]);
      setEngineCapacityFrom("");
      setEngineCapacityTo("");
      setPowerFrom("");
      setPowerTo("");
      setNumberOfGears(""); // Reset numberOfGears on reset
    }
  }, [reset]);

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <div className="flex items-center">
          <PiEngineLight className="w-8 h-8 mr-2 text-blue-500" />
          <CardTitle className="text-left text-2xl">Technical Data</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-12 mb-12">
          {/* Transmission Type Selection */}
          <div className="flex flex-col justify-between">
            <Combobox
              label="Transmission Type"
              options={["Automatic", "Semi-Automatic", "Manual"]}
              placeholder="Select transmission type"
              value={selectedTransmissionType}
              onSelect={setSelectedTransmissionType}
            />
          </div>

          {/* Number of Gears Input */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="numberOfGears" className="block text-left mb-1">
              Number of Gears
            </Label>
            <CustomDropdownInput
              placeholder="Enter number of gears"
              options={["1", "2", "3", "4", "5", "6", "7", "8"]}
              name="numberOfGears"
              maxLength={1}
              reset={reset}
              onSelect={setNumberOfGears} // Ensure onSelect works correctly
            />
          </div>

          {/* Traction Type Selection */}
          <div className="flex flex-col justify-between">
            <Combobox
              label="Traction Type"
              options={["FWD", "RWD", "AWD"]}
              placeholder="Select traction type"
              value={selectedTractionType}
              onSelect={setSelectedTractionType}
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
                placeholder="From (L)"
                options={engineCapacityOptions}
                name="engineCapacityFrom"
                maxLength={2}
                groupSize={1}
                suffix="L"
                className="mr-2 w-1/2"
                onSelect={setEngineCapacityFrom}
                reset={reset}
              />
              <span className="text-gray-500 mx-2">-</span>
              <CustomDropdownInput
                placeholder="Up to (L)"
                options={engineCapacityOptions}
                name="engineCapacityUpTo"
                maxLength={2}
                groupSize={1}
                suffix="L"
                className="ml-2 w-1/2"
                onSelect={setEngineCapacityTo}
                reset={reset}
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
                placeholder="From (HP)"
                options={horsepowerOptions}
                name="powerFrom"
                suffix="HP"
                className="mr-2 w-1/2"
                maxLength={4}
                groupSize={5}
                onSelect={setPowerFrom}
                reset={reset}
              />
              <span className="text-gray-500 mx-2">-</span>
              <CustomDropdownInput
                placeholder="Up to (HP)"
                options={horsepowerOptions}
                name="powerTo"
                suffix="HP"
                maxLength={4}
                groupSize={5}
                className="ml-2 w-1/2"
                onSelect={setPowerTo}
                reset={reset}
              />
            </div>
          </div>

          {/* Emission Class Selection */}
          <div className="flex flex-col justify-between">
            <Combobox
              label="Emission Class"
              options={emissionClassesOptions}
              placeholder="Select emission class"
              value={selectedEmissionClass}
              onSelect={setSelectedEmissionClass}
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
              "Other",
            ].map((fuelType) => (
              <div key={fuelType} className="flex items-center space-x-2">
                <Checkbox
                  id={fuelType}
                  checked={selectedFuelTypes.includes(fuelType)}
                  onCheckedChange={() => toggleFuelType(fuelType)}
                  className="w-6 h-6 border-2 border-gray-300"
                />
                <Label htmlFor={fuelType} className="text-gray-800 text-left">
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
