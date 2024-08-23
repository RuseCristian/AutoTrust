import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Combobox from "../ui/combobox";
import CustomDropdownInput from "../ui/input-with-dropdown";
import { PiCalendarBlank } from "react-icons/pi";
import { Separator } from "../ui/separator";

const mileageOptions = [
  "5.000",
  "10.000",
  "20.000",
  "30.000",
  "40.000",
  "50.000",
  "60.000",
  "70.000",
  "80.000",
  "90.000",
  "100.000",
  "125.000",
  "150.000",
  "175.000",
  "200.000",
  "225.000",
  "250.000",
];
const priceOptions = [
  "500",
  "1.000",
  "1.500",
  "2.000",
  "2.500",
  "3.000",
  "3.500",
  "4.000",
  "4.500",
  "5.000",
  "6.000",
  "7.000",
  "8.000",
  "9.000",
  "10.000",
  "11.000",
  "12.000",
  "13.000",
  "14.000",
  "15.000",
  "17.500",
  "20.000",
  "22.500",
  "25.000",
  "27.500",
  "30.000",
  "35.000",
  "40.000",
  "45.000",
  "50.000",
  "55.000",
  "60.000",
  "70.000",
  "80.000",
  "90.000",
  "100.000",
];

const currentYear = new Date().getFullYear();
const years: string[] = [];
for (let year = currentYear; year >= 1900; year--) {
  years.push(year.toString());
}

export default function CarInfo({
  setCarInfo,
  reset,
}: {
  setCarInfo: (info: any) => void;
  reset: boolean;
}) {
  const [brands, setBrands] = useState<
    { name: string; models: { name: string }[] }[]
  >([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [registrationYearFrom, setRegistrationYearFrom] = useState<string>("");
  const [registrationYearTo, setRegistrationYearTo] = useState<string>("");
  const [mileageFrom, setMileageFrom] = useState<string>("");
  const [mileageTo, setMileageTo] = useState<string>("");
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch("/api/get-brands-and-models");
      const data = await response.json();
      setBrands(data);
    }
    fetchBrands();
  }, []);

  useEffect(() => {
    setCarInfo({
      brand: selectedBrand,
      model: selectedModel,
      registrationYear: {
        from: registrationYearFrom,
        to: registrationYearTo,
      },
      mileage: {
        from: mileageFrom,
        to: mileageTo,
      },
      price: {
        from: priceFrom,
        to: priceTo,
      },
      keywords,
    });
  }, [
    selectedBrand,
    selectedModel,
    registrationYearFrom,
    registrationYearTo,
    mileageFrom,
    mileageTo,
    priceFrom,
    priceTo,
    keywords,
    setCarInfo,
  ]);

  // Reset all fields when reset is triggered
  useEffect(() => {
    if (reset) {
      setSelectedBrand("");
      setSelectedModel("");
      setRegistrationYearFrom("");
      setRegistrationYearTo("");
      setMileageFrom("");
      setMileageTo("");
      setPriceFrom("");
      setPriceTo("");
      setKeywords("");
    }
  }, [reset]);

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <div className="flex items-center space-x-2 text-left">
          <PiCalendarBlank className="w-8 h-8 text-blue-500" />{" "}
          <CardTitle className="text-left text-2xl">Car Info</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        {/* First Row: Brand and Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mb-12">
          {/* Brand Selection */}
          <div>
            <Combobox
              label="Brand"
              options={brands.map((brand) => brand.name)}
              placeholder="Select a brand"
              value={selectedBrand}
              onSelect={(value) => {
                setSelectedBrand(value);
                setSelectedModel(""); // Reset model when brand changes
              }}
            />
          </div>

          {/* Model Selection */}
          <div>
            <Combobox
              label="Model"
              options={
                selectedBrand
                  ? brands
                      .find((brand) => brand.name === selectedBrand)
                      ?.models.map((model) => model.name) || []
                  : []
              }
              placeholder="Select a model"
              value={selectedModel}
              onSelect={setSelectedModel}
              disabled={!selectedBrand}
            />
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
                options={years}
                name="registrationYearFrom"
                maxLength={4}
                groupSize={5}
                className="w-1/2"
                onSelect={setRegistrationYearFrom}
                reset={reset} // Pass reset prop
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={years}
                name="registrationYearTo"
                maxLength={4}
                groupSize={5}
                className="w-1/2"
                onSelect={setRegistrationYearTo}
                reset={reset} // Pass reset prop
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
                placeholder="From km"
                suffix="km"
                options={mileageOptions}
                name="mileageFrom"
                className="w-1/2"
                onSelect={setMileageFrom}
                reset={reset} // Pass reset prop
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to km"
                suffix="km"
                options={mileageOptions}
                name="mileageTo"
                className="w-1/2"
                onSelect={setMileageTo}
                reset={reset} // Pass reset prop
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
                options={priceOptions}
                name="priceFrom"
                maxLength={8}
                className="w-1/2"
                onSelect={setPriceFrom}
                reset={reset} // Pass reset prop
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={priceOptions}
                name="priceTo"
                maxLength={8}
                className="w-1/2"
                onSelect={setPriceTo}
                reset={reset} // Pass reset prop
              />
            </div>
          </div>

          {/* Keywords */}
          <div>
            <Label htmlFor="keywords" className="block text-left mb-2">
              Keywords
            </Label>
            <Input
              id="keywords"
              placeholder="Enter keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
