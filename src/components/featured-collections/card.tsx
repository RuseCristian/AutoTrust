"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export function CollectionCard({
  title,
  description,
  image,
  link,
}: CollectionCardProps) {
  return (
    <Link href={link}>
      <Card className="hover:scale-[101%] transition-transform rounded-lg overflow-hidden">
        <CardHeader className="p-0">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-4 text-left">
          <CardTitle className="text-lg font-semibold text-blue-500">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-2">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
