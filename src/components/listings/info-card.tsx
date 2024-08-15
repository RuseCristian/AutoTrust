"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";

interface InfoCardData {
  imageSrc: string;
  name: string;
  href: string;
  rating: number; // Rating out of 5, supports decimals
}

interface InfoCardProps {
  data: InfoCardData;
  className?: string; // Added support for className prop
}

export function InfoCard({ data, className = "" }: InfoCardProps) {
  const { imageSrc, name, href, rating } = data;

  return (
    <Link href={href} className={`flex items-center p-4 w-full`}>
      <div className="flex-shrink-0 w-12 h-12">
        <Image
          src={imageSrc}
          alt={`${name} photo`}
          width={48}
          height={48}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[150px]">
          {name}
        </h3>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => {
            if (i < Math.floor(rating)) {
              return (
                <StarFilledIcon key={i} className="w-4 h-4 text-yellow-500" />
              );
            } else {
              return <StarIcon key={i} className="w-4 h-4 text-gray-300" />;
            }
          })}
          <span className="ml-2 text-sm text-gray-600">
            {rating.toFixed(1)}/5
          </span>
        </div>
      </div>
    </Link>
  );
}
