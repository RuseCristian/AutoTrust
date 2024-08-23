"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SimpleSearchFilter from "./search-filter/simple-filter";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/get-hero-images");
        const data = await response.json();
        const imageLocations = data.map(
          (image: { location: string }) => image.location
        );
        setImages(imageLocations);
        setLoading(false); // Set loading to false once images are fetched
      } catch (error) {
        console.error("Failed to fetch hero images:", error);
        setLoading(false); // Even on error, stop the loading animation
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden -mt-24">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900 to-transparent opacity-70"></div>

      {loading ? (
        // Loading animation
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        // Carousel Images
        <div className="absolute inset-0 z-0">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt="Hero Image"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-20 max-w-screen-xl mx-auto px-[20px] lg:px-20 pt-24 pb-16 text-center w-full">
        <h1 className="text-4xl lg:text-5xl font-extrabold mt-10 mb-4 drop-shadow-md">
          New Cars, New Beginnings
        </h1>
        <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          The road to your future starts here. Our thoroughly inspected vehicles
          aren't just purchases — they are gateways to a brighter tomorrow.
        </p>
      </div>

      <div className="relative z-20 mb-20">
        <SimpleSearchFilter />
      </div>
    </section>
  );
}
