"use client";

import { useEffect, useState } from "react";
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

const ITEMS_PER_PAGE = 6;

export function CollectionGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [animationKey, setAnimationKey] = useState(Date.now());

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/get-featured-collections");
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchCollections();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    ); // Render loading state while fetching data
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 py-16">
      <H2Header label="Explore Collections" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedCollections.map((collection, index) => (
          <div key={`${index}-${animationKey}`} className="animate-fade-swoosh">
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
