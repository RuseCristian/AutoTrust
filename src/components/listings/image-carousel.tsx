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

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between z-20 p-2">
        <button
          className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          onClick={prevSlide}
          style={{ zIndex: 30 }}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          className="bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          onClick={nextSlide}
          style={{ zIndex: 30 }}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Image */}
      <div className="w-full h-full">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={400}
          height={300}
          className="w-full h-48 object-cover lg:h-full rounded-lg"
          style={{ zIndex: 10 }}
        />
      </div>

      {/* Indicator */}
      <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-50 text-white py-1 px-2 rounded-full text-sm z-20 flex items-center">
        <FiImage className="w-4 h-4 inline-block mr-1" />
        <span className="mr-1">
          {currentIndex + 1}/{images.length}
        </span>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1">
        {images.slice(0, 5).map((_, index) => (
          <DotFilledIcon
            key={index}
            className={cn(
              "w-5 h-5",
              currentIndex % 5 === index ? "text-white" : "text-gray-500"
            )}
          />
        ))}
      </div>
    </div>
  );
}
