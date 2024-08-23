"use client";

import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import { FiImage } from "react-icons/fi";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setDirection("left");
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) {
      setDirection("right");
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className={cn("relative w-full h-full group", className)}>
      {currentIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-6 flex items-center justify-center hover:bg-opacity-75 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 z-20 rounded-tr-md rounded-br-md"
          onClick={prevSlide}
          style={{ height: "40%" }}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white px-3 py-6 flex items-center justify-center hover:bg-opacity-75 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 z-20 rounded-tl-md rounded-bl-md"
          onClick={nextSlide}
          style={{ height: "40%" }}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}

      {/* Images Container */}
      <div className="relative w-full h-full overflow-hidden min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] xl:min-h-[250px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out",
              currentIndex === index
                ? "transform translate-x-0"
                : currentIndex < index
                ? "transform translate-x-full"
                : "transform -translate-x-full"
            )}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-full object-cover"
              onClick={(e) => e.stopPropagation()} // Prevent click propagation
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-50 text-white py-1 px-2 rounded-full text-sm z-20 flex items-center">
        <FiImage className="w-4 h-4 inline-block mr-1" />
        <span className="mr-1">
          {currentIndex + 1}/{images.length}
        </span>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1">
        {images.slice(0, 5).map((_, index) => (
          <DotFilledIcon
            key={index}
            className={cn(
              "w-5 h-5",
              currentIndex === index ? "text-white" : "text-gray-500"
            )}
          />
        ))}
      </div>
    </div>
  );
}
