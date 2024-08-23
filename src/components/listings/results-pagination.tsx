"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Combobox from "@/components/ui/combobox";
import { CarListingCard } from "@/components/listings/listing-card";

export function ResultsPagination({
  currentPage,
  totalPages,
  results,
  sortOptions = [
    "Relevance",
    "Price: Low to High",
    "Price: High to Low",
    "Newest Listings",
  ],
  onPageChange,
  onSortChange,
  onResultsPerPageChange,
}: {
  currentPage: number;
  totalPages: number;
  results: {
    id: number;
    images: string[];
    model: string;
    price: string;
    registrationYear: string;
    mileage: string;
    horsepower: string;
    transmission: string;
    fuelType: string;
    tractionType: string;
    href: string;
    dealerData: {
      imageSrc: string;
      name: string;
      href: string;
      rating: number;
    };
    serviceData: {
      imageSrc: string;
      name: string;
      href: string;
      rating: number;
    };
    location: {
      country: string;
      city: string;
    };
  }[];
  sortOptions?: string[];
  onPageChange: (page: number) => void;
  onSortChange: (sort: string) => void;
  onResultsPerPageChange: (resultsPerPage: string) => void;
}) {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [status]);

  // Avoid rendering until session status is fully known
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const startPages = Math.min(currentPage - 1, totalPages - maxPageButtons);
      const endPages = Math.min(currentPage + 1, totalPages);

      if (currentPage > 2) {
        pageNumbers.push(
          <PaginationItem key={1}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(1)}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      for (let i = Math.max(currentPage - 1, 1); i <= endPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 1) {
        pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />);
        pageNumbers.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(totalPages)}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 py-16 pb-2 flex justify-between items-end mt-12">
        <div className="flex space-x-4">
          <Combobox
            options={sortOptions}
            placeholder="Sort by"
            label="Sort by"
            value={sortOptions[0]}
            onSelect={onSortChange}
          />
          <Combobox
            options={["10", "20", "30", "50"]}
            placeholder="Results per page"
            label="Results per page"
            value={"20"}
            onSelect={onResultsPerPageChange}
          />
        </div>
      </div>
      <div className="mt-6 space-y-8">
        {results.map((result) => (
          <CarListingCard
            key={result.id}
            images={result.images}
            model={result.model}
            price={result.price}
            registrationYear={result.registrationYear}
            mileage={result.mileage}
            horsepower={result.horsepower}
            transmission={result.transmission}
            fuelType={result.fuelType}
            tractionType={result.tractionType}
            href={result.href}
            dealerData={result.dealerData}
            serviceData={result.serviceData}
            location={result.location}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 py-16 pb-2 flex flex-wrap justify-center lg:justify-end items-center space-y-2 lg:space-y-0 mt-6">
        <Pagination className="flex justify-center overflow-x-auto max-w-full">
          <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
            <PaginationItem>
              {currentPage === 1 ? (
                <span className="cursor-not-allowed text-gray-400">
                  Previous
                </span>
              ) : (
                <PaginationPrevious
                  href="#"
                  onClick={() => onPageChange(currentPage - 1)}
                />
              )}
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              {currentPage === totalPages ? (
                <span className="cursor-not-allowed text-gray-400">Next</span>
              ) : (
                <PaginationNext
                  href="#"
                  onClick={() => onPageChange(currentPage + 1)}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
