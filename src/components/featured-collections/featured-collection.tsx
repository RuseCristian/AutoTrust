"use client";

import { useState } from "react";
import { CollectionCard } from "@/components/featured-collections/card";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import H2Header from "../ui/h2-header";

// Custom Animation using Tailwind
const customStyles = `
  @keyframes fade-swoosh {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @layer utilities {
    .animate-fade-swoosh {
      animation: fade-swoosh 1.0s ease-in-out forwards;
    }
  }
`;

// Injecting custom styles into the document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = customStyles;
  document.head.appendChild(style);
}

const collections = [
  {
    title: "Fuel-Savers",
    description: "Keeps Your Wallet Full",
    image: "/admin.png",
    link: "/collections/fuel-savers",
  },
  {
    title: "Deutschland",
    description: "German Precision and Prestige",
    image: "/admin.png",
    link: "/collections/deutschland",
  },
  {
    title: "Italian Art",
    description: "Passion at Every Gear Shift",
    image: "/admin.png",
    link: "/collections/italian-art",
  },
  {
    title: "Electric Power",
    description: "Drive the Future",
    image: "/admin.png",
    link: "/collections/electric-power",
  },
  {
    title: "Manuals Club",
    description: "Three Pedals, Pure Joy",
    image: "/admin.png",
    link: "/collections/manuals-club",
  },
  {
    title: "UK's Finest",
    description: "Elegance on Wheels",
    image: "/admin.png",
    link: "/collections/uks-finest",
  },
  {
    title: "Classic Cars",
    description: "Timeless Beauty",
    image: "/admin.png",
    link: "/collections/classic-cars",
  },
  {
    title: "Modern Marvels",
    description: "Cutting-Edge Technology",
    image: "/admin.png",
    link: "/collections/modern-marvels",
  },
  {
    title: "Off-road Adventures",
    description: "Conquer Any Terrain",
    image: "/admin.png",
    link: "/collections/off-road",
  },
  {
    title: "Luxury Rides",
    description: "Opulence in Motion",
    image: "/admin.png",
    link: "/collections/luxury-rides",
  },
  {
    title: "Family-Friendly",
    description: "Comfort and Safety for All",
    image: "/admin.png",
    link: "/collections/family-friendly",
  },
  {
    title: "American Muscle",
    description: "Raw Power and Performance",
    image: "/admin.png",
    link: "/collections/american-muscle",
  },
  {
    title: "Japanese Precision",
    description: "Reliability and Innovation",
    image: "/admin.png",
    link: "/collections/japanese-precision",
  },
  {
    title: "SUV Collection",
    description: "Space and Comfort",
    image: "/admin.png",
    link: "/collections/suv-collection",
  },
  {
    title: "Exotic Cars",
    description: "Exclusive and Extraordinary",
    image: "/admin.png",
    link: "/collections/exotic-cars",
  },
];

const ITEMS_PER_PAGE = 6;

export function CollectionGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const [animationKey, setAnimationKey] = useState(Date.now()); // Unique key for triggering animation

  const totalPages = Math.ceil(collections.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setAnimationKey(Date.now());
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevious = () => {
    setAnimationKey(Date.now());
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const paginatedCollections = collections.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 py-16">
      <H2Header label="Explore Collections" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedCollections.map((collection, index) => (
          <div
            key={`${index}-${animationKey}`} // Force re-render to trigger animation
            className="animate-fade-swoosh"
          >
            <CollectionCard
              title={collection.title}
              description={collection.description}
              image={collection.image}
              link={collection.link}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePrevious}
          className="p-2 bg-zinc-100 rounded-full hover:bg-gray-300 transition-colors transition-duration-300"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-zinc-100 rounded-full hover:bg-gray-300 transition-colors transition-duration-300"
          aria-label="Next page"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
