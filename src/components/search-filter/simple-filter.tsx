"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Combobox from "@/components/ui/combobox";
import CustomDropdownInput from "@/components/ui/input-with-dropdown";
import { MixerHorizontalIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { AiFillStar, AiOutlineSearch, AiOutlineReload } from "react-icons/ai";
import LoginPopUpTrigger from "../auth/login-popup-trigger";

export default function SimpleFilter() {
  const { data: session } = useSession();
  const [brands, setBrands] = useState<
    { name: string; models: { name: string }[] }[]
  >([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [registrationYear, setRegistrationYear] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [resetKey, setResetKey] = useState<number>(0);
  const [loading, setLoading] = useState(true); // State for loading

  const router = useRouter();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await fetch("/api/get-brands-and-models");
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands and models:", error);
      } finally {
        setLoading(false); // Stop loading when done
      }
    }
    fetchBrands();
  }, []);

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

  const logState = (action: string) => {
    console.log(`${action}:`, {
      brand: selectedBrand,
      model: selectedModel,
      mileage,
      price,
      registrationYear,
      keywords,
    });
  };

  const handleClearFilters = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setMileage("");
    setPrice("");
    setRegistrationYear("");
    setKeywords("");
    setResetKey((prevKey) => prevKey + 1);
    logState("Filters cleared");
  };

  const handleSearch = () => {
    logState("Search initiated with filters");
  };

  const renderButtonWithLoginTrigger = (button: React.ReactNode) => {
    if (!session) {
      return <LoginPopUpTrigger>{button}</LoginPopUpTrigger>;
    }
    return button;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    ); // Render loading state while fetching data
  }

  return (
    <div className="w-full items-center justify-center px-[20px] py-[16px] lg:px-20 max-w-screen-xl mx-auto">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Brand Selection */}
            <Combobox
              label="Brand"
              options={brands.map((brand) => brand.name)}
              placeholder="Select a brand"
              value={selectedBrand}
              onSelect={(value) => {
                setSelectedBrand(value);
                setSelectedModel(""); // Reset model when brand changes
                logState("Brand updated");
              }}
            />

            {/* Model Selection */}
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
              onSelect={(value) => {
                setSelectedModel(value);
                logState("Model updated");
              }}
              disabled={!selectedBrand}
            />

            {/* Mileage Input with Dropdown */}
            <CustomDropdownInput
              key={`mileage-${resetKey}`}
              label="Mileage to"
              placeholder="km"
              options={mileageOptions}
              onSelect={(value) => {
                setMileage(value);
                logState("Mileage updated");
              }}
            />

            {/* Price Input with Dropdown */}
            <CustomDropdownInput
              key={`price-${resetKey}`}
              label="Price up to"
              placeholder="$"
              suffix="$"
              options={priceOptions}
              onSelect={(value) => {
                setPrice(value);
                logState("Price updated");
              }}
            />

            {/* Year Input with Dropdown */}
            <CustomDropdownInput
              key={`registrationYear-${resetKey}`}
              label="First registration from"
              placeholder=""
              options={years}
              maxLength={4}
              groupSize={5}
              onSelect={(value) => {
                setRegistrationYear(value);
                logState("Registration Year updated");
              }}
            />

            {/* Keywords Input */}
            <div className="flex flex-col justify-between">
              <Label className="block text-left mb-1">Keywords</Label>
              <Input
                placeholder="Enter keywords"
                className="w-full"
                value={keywords}
                onChange={(e) => {
                  setKeywords(e.target.value);
                  logState("Keywords updated");
                }}
              />
            </div>
          </div>

          {/* Row with Advanced Filters, Saved Searches, and Search Button */}
          <div className="flex flex-col md:flex-col lg:flex-row sm:flex-row justify-between items-center mt-10 space-y-4 sm:space-y-0 sm:space-x-4 ">
            <div className="flex space-x-4">
              <button
                className="flex items-center text-gray-600 hover:text-blue-500"
                onClick={() => {
                  logState("Advanced Filters clicked");
                  router.push("listings/advanced-search");
                }}
              >
                <MixerHorizontalIcon className="w-5 h-5 mr-2 text-blue-500" />
                Advanced Filters
              </button>
              {renderButtonWithLoginTrigger(
                <button
                  className="flex items-center text-gray-600 hover:text-blue-500"
                  onClick={() => logState("Saved Searches clicked")}
                >
                  <BookmarkIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Saved Searches
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                className="text-gray-600 border-gray-400 bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300"
                onClick={handleClearFilters}
              >
                <AiOutlineReload className="mr-2" />
                Clear Filters
              </Button>
              {renderButtonWithLoginTrigger(
                <Button
                  className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-600 hover:shadow-xl"
                  onClick={() => logState("Save search clicked")}
                >
                  <AiFillStar className="mr-2" />
                  Save Search
                </Button>
              )}
              <Button
                onClick={handleSearch}
                className="w-full sm:w-48 bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-500 hover:to-blue-700 text-white shadow-md"
              >
                <AiOutlineSearch className="mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
