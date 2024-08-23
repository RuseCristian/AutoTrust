import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdditionalDetails() {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden mb-6">
      <CardHeader>
        <CardTitle className="text-left">Additional Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Year Input */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="year" className="block text-left mb-1">
              Year
            </Label>
            <Input id="year" placeholder="Enter year" name="year" />
          </div>

          {/* Additional Option Placeholder */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="option1" className="block text-left mb-1">
              Option 1
            </Label>
            <Input id="option1" placeholder="Enter value" name="option1" />
          </div>

          {/* Additional Option Placeholder */}
          <div className="flex flex-col justify-between">
            <Label htmlFor="option2" className="block text-left mb-1">
              Option 2
            </Label>
            <Input id="option2" placeholder="Enter value" name="option2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
