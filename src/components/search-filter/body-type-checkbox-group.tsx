import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { IoCarSportOutline } from "react-icons/io5"; // Placeholder icon, you can replace this with different icons per body type

export default function BodyTypeCheckboxGroup() {
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);

  const toggleBodyType = (type: string) => {
    setBodyTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="mt-12">
      <Label className="block text-left mb-4 text-xl">Body Types</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4">
        {/* Example with different icons for each body type */}
        <div className="flex items-center">
          <Checkbox
            id="cabrio"
            checked={bodyTypes.includes("Cabrio/Roadster")}
            onCheckedChange={() => toggleBodyType("Cabrio/Roadster")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("Cabrio/Roadster") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="cabrio" className="text-sm">
            Cabrio/Roadster
          </Label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="suv"
            checked={bodyTypes.includes("SUV/ Pickup/SUV")}
            onCheckedChange={() => toggleBodyType("SUV/ Pickup/SUV")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("SUV/ Pickup/SUV") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="suv" className="text-sm">
            SUV/ Pickup/SUV
          </Label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="smallcars"
            checked={bodyTypes.includes("Small cars")}
            onCheckedChange={() => toggleBodyType("Small cars")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("Small cars") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="smallcars" className="text-sm">
            Small cars
          </Label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="combi"
            checked={bodyTypes.includes("Combi")}
            onCheckedChange={() => toggleBodyType("Combi")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("Combi") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="combi" className="text-sm">
            Combi
          </Label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="limousine"
            checked={bodyTypes.includes("Limousine")}
            onCheckedChange={() => toggleBodyType("Limousine")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("Limousine") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="limousine" className="text-sm">
            Limousine
          </Label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="sportscar"
            checked={bodyTypes.includes("Sports car/ Coupé")}
            onCheckedChange={() => toggleBodyType("Sports car/ Coupé")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("Sports car/ Coupé") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="sportscar" className="text-sm">
            Sports car/ Coupé
          </Label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="van"
            checked={bodyTypes.includes("Van/Minibus")}
            onCheckedChange={() => toggleBodyType("Van/Minibus")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("Van/Minibus") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="van" className="text-sm">
            Van/Minibus
          </Label>
        </div>
        <div className="flex items-center">
          <Checkbox
            id="other"
            checked={bodyTypes.includes("Other")}
            onCheckedChange={() => toggleBodyType("Other")}
            className={`w-6 h-6 border-2 ${
              bodyTypes.includes("Other") ? "border-blue-500" : "border-gray-300"
            }`}
          />
          <IoCarSportOutline className="w-5 h-5 text-blue-500 mx-2" /> {/* Custom icon */}
          <Label htmlFor="other" className="text-sm">
            Other
          </Label>
        </div>
      </div>
    </div>
  );
}
