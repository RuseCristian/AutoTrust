"use client";
import { useState } from "react";
import SimpleFilter from "@/components/search-filter/simple-filter";
import H2Header from "@/components/ui/h2-header";
import { ResultsPagination } from "@/components/listings/results-pagination";

const generatePlaceholderCars = (totalCars: number) => {
  const carModels = [
    "2021 BMW 320i",
    "2019 Mercedes-Benz C300",
    "2020 Audi A4",
    "2022 Tesla Model 3",
    "2018 Honda Accord",
    "2017 Toyota Camry",
    "2020 Ford Mustang",
    "2019 Chevrolet Camaro",
    "2021 Nissan Altima",
    "2021 Subaru Impreza",
  ];

  const cars = [];
  for (let i = 1; i <= totalCars; i++) {
    cars.push({
      id: i,
      model: carModels[i % carModels.length],
      images: [`/collections/american.jpg`], // Using the specified image
      price: `$${(20000 + i * 100).toLocaleString()}`,
      registrationYear: `${2015 + (i % 7)}`,
      mileage: `${(10000 + i * 500).toLocaleString()} miles`,
      horsepower: `${150 + (i % 100)}`,
      transmission: "Automatic",
      fuelType: "Gasoline",
      tractionType: i % 2 === 0 ? "AWD" : "RWD",
      href: `/listings/${i}`,
      dealerData: {
        imageSrc: `/collections/american.jpg`,
        name: `Dealer ${i % 10}`,
        href: `/dealers/dealer-${i % 10}`,
        rating: 5,
      },
      serviceData: {
        imageSrc: `/collections/american.jpg`,
        name: `Service ${i % 10}`,
        href: `/services/service-${i % 10}`,
        rating: 5,
      },
      location: {
        country: "US",
        city: `City ${i % 10}`,
      },
    });
  }
  return cars;
};

export default function SearchResultsPage() {
  const placeholderCars = generatePlaceholderCars(300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 20;

  const totalPages = Math.ceil(placeholderCars.length / resultsPerPage);

  const currentResults = placeholderCars.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Logic to fetch new data from API if necessary can be added here
  };

  const handleSortChange = (sort: string) => {
    // Add sorting logic here if necessary
  };

  const handleResultsPerPageChange = (resultsPerPage: string) => {
    // Logic to change the number of results per page can be added here
  };

  return (
    <main>
      <div className="space-y-6 text-center">
        <div className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 py-16 pb-2">
          <H2Header label="Search Results" />
        </div>
        <SimpleFilter />
        <ResultsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          results={currentResults}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
          onResultsPerPageChange={handleResultsPerPageChange}
        />
      </div>
    </main>
  );
}
