import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import CustomDropdownInput from "../ui/input-with-dropdown";
import Combobox from "../ui/combobox";
import { IoPricetagOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function Offer({
  setOfferInfo,
  reset,
}: {
  setOfferInfo: (info: any) => void;
  reset: boolean;
}) {
  const [selectedVehicleCondition, setSelectedVehicleCondition] =
    useState<string>("");
  const [selectedListingDuration, setSelectedListingDuration] =
    useState<string>("");
  const [dealerRatingFrom, setDealerRatingFrom] = useState<string>("");
  const [dealerRatingTo, setDealerRatingTo] = useState<string>("");
  const [serviceRatingFrom, setServiceRatingFrom] = useState<string>("");
  const [serviceRatingTo, setServiceRatingTo] = useState<string>("");

  useEffect(() => {
    setOfferInfo({
      vehicleCondition: selectedVehicleCondition,
      listingDuration: selectedListingDuration,
      dealerRating: {
        from: dealerRatingFrom,
        to: dealerRatingTo,
      },
      serviceRating: {
        from: serviceRatingFrom,
        to: serviceRatingTo,
      },
    });
  }, [
    selectedVehicleCondition,
    selectedListingDuration,
    dealerRatingFrom,
    dealerRatingTo,
    serviceRatingFrom,
    serviceRatingTo,
    setOfferInfo,
  ]);

  useEffect(() => {
    if (reset) {
      setSelectedVehicleCondition("");
      setSelectedListingDuration("");
      setDealerRatingFrom("");
      setDealerRatingTo("");
      setServiceRatingFrom("");
      setServiceRatingTo("");
    }
  }, [reset]);

  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <div className="flex items-center">
          <IoPricetagOutline className="w-8 h-8 mr-2 text-blue-500" />
          <CardTitle className="text-left text-2xl">Offer</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mb-12">
          <div>
            <Label htmlFor="dealerRating" className="block text-left mb-2">
              Dealer Rating
            </Label>
            <div className="flex items-center space-x-2">
              <CustomDropdownInput
                placeholder="From"
                options={["1", "2", "3", "4", "5"]}
                name="dealerRatingFrom"
                maxLength={1}
                className="w-1/2"
                onSelect={setDealerRatingFrom}
                reset={reset}
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["1", "2", "3", "4", "5"]}
                name="dealerRatingTo"
                maxLength={1}
                className="w-1/2"
                onSelect={setDealerRatingTo}
                reset={reset}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="serviceRating" className="block text-left mb-2">
              Service Rating
            </Label>
            <div className="flex items-center space-x-2">
              <CustomDropdownInput
                placeholder="From"
                options={["1", "2", "3", "4", "5"]}
                name="serviceRatingFrom"
                maxLength={1}
                className="w-1/2"
                onSelect={setServiceRatingFrom}
                reset={reset}
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["1", "2", "3", "4", "5"]}
                name="serviceRatingTo"
                maxLength={1}
                className="w-1/2"
                onSelect={setServiceRatingTo}
                reset={reset}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mb-12">
          <Combobox
            label="Vehicle Condition"
            options={["New", "Second Hand", "Any"]}
            placeholder="Select condition"
            value={selectedVehicleCondition}
            onSelect={setSelectedVehicleCondition}
          />

          <Combobox
            label="Listing Duration"
            options={[
              "1 day",
              "1 week",
              "1 month",
              "3 months",
              "6 months",
              "1 year",
              "Any",
            ]}
            placeholder="Select up for"
            value={selectedListingDuration}
            onSelect={setSelectedListingDuration}
          />
        </div>
      </CardContent>
    </Card>
  );
}
