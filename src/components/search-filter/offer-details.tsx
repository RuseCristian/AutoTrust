import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import CustomDropdownInput from "../ui/input-with-dropdown"; // Importing the custom dropdown input component
import { IoPricetagOutline } from "react-icons/io5"; // Placeholder icon for the offer section
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Offer() {
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
        {/* Dealer and Service Ratings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mb-12">
          {/* Dealer Rating */}
          <div>
            <Label htmlFor="dealerRating" className="block text-left mb-2">
              Dealer Rating
            </Label>
            <div className="flex items-center space-x-2">
              <CustomDropdownInput
                placeholder="From"
                options={["1", "2", "3", "4", "5"]}
                name="dealerRatingFrom"
                className="w-1/2"
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["1", "2", "3", "4", "5"]}
                name="dealerRatingTo"
                className="w-1/2"
              />
            </div>
          </div>

          {/* Service Rating */}
          <div>
            <Label htmlFor="serviceRating" className="block text-left mb-2">
              Service Rating
            </Label>
            <div className="flex items-center space-x-2">
              <CustomDropdownInput
                placeholder="From"
                options={["1", "2", "3", "4", "5"]}
                name="serviceRatingFrom"
                className="w-1/2"
              />
              <span className="text-gray-400">—</span>
              <CustomDropdownInput
                placeholder="Up to"
                options={["1", "2", "3", "4", "5"]}
                name="serviceRatingTo"
                className="w-1/2"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Condition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12 mb-12">
          <div>
            <Label htmlFor="vehicleCondition" className="block text-left mb-2">
              Vehicle Condition
            </Label>
            <Select>
              <SelectTrigger id="vehicleCondition" className="text-gray-500">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="second-hand">Second Hand</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Listing Duration */}
          <div>
            <Label htmlFor="listingDuration" className="block text-left mb-2">
              Listing Duration
            </Label>
            <Select>
              <SelectTrigger id="listingDuration" className="text-gray-500">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 day">1 day</SelectItem>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="3 months">3 months</SelectItem>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
