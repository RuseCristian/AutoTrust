"use client";

import { Card, CardContent } from "@/components/ui/card";

interface CarSpecsCardProps {
  specs: { [key: string]: string }; // This allows any set of key-value pairs
}

export function CarSpecsCard({ specs }: CarSpecsCardProps) {
  return (
    <Card className="mt-8 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
          {Object.entries(specs).map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-[200px,1fr] items-center py-1"
            >
              <span className="font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-left">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
