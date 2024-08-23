"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "@radix-ui/react-icons";

interface OptionsCardProps {
  options: { [key: string]: any }; // Allow any value type
}

export function ExteriorOptionsCard({ options }: OptionsCardProps) {
  return (
    <Card className="mt-8 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-xl font-semibold mb-4">Exterior Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
          {Object.entries(options).map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-[200px,1fr] items-center py-1"
            >
              <span className="font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-left">
                {value === true && <CheckIcon className="text-green-500" />}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
