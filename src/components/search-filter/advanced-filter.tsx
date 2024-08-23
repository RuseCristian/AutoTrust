"use client";

import { useState, useEffect } from "react";
import CarInfo from "./car-info-details";
import Offer from "./offer-details";
import TechnicalData from "./technical-data-details";
import Exterior from "./exterior-details";
import Interior from "./interior-details";
import H2Header from "@/components/ui/h2-header";
import StickyFooter from "./sticky-footer";

export default function AdvancedFilter() {
  const [carInfo, setCarInfo] = useState({});
  const [offerInfo, setOfferInfo] = useState({});
  const [technicalData, setTechnicalData] = useState({});
  const [exteriorInfo, setExteriorInfo] = useState({});
  const [interiorInfo, setInteriorInfo] = useState({});
  const [resetFilters, setResetFilters] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", {
      car_info: carInfo,
      offer_info: offerInfo,
      technical_data: technicalData,
      exterior_info: exteriorInfo,
      interior_info: interiorInfo,
    });
  };

  const handleClearFilters = () => {
    setIsResetting(true);
    setResetFilters(true);
    setTimeout(() => {
      setResetFilters(false);
      setIsResetting(false);
    }, 0);

    console.log("Form Data after Reset:", {
      car_info: carInfo,
      offer_info: offerInfo,
      technical_data: technicalData,
      exterior_info: exteriorInfo,
      interior_info: interiorInfo,
    });
  };

  useEffect(() => {
    if (!isResetting) {
      console.log("Updated Form Data:", {
        car_info: carInfo,
        offer_info: offerInfo,
        technical_data: technicalData,
        exterior_info: exteriorInfo,
        interior_info: interiorInfo,
      });
    }
  }, [carInfo, offerInfo, technicalData, exteriorInfo, interiorInfo]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <form
        id="advancedFilterForm"
        className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 flex-grow"
        onSubmit={handleFormSubmit}
      >
        <H2Header label="Search For Your Next Car" />

        <section id="car-info">
          <CarInfo setCarInfo={setCarInfo} reset={resetFilters} />
        </section>

        <section id="offer">
          <Offer setOfferInfo={setOfferInfo} reset={resetFilters} />
        </section>

        <section id="technical-data">
          <TechnicalData
            setTechnicalData={setTechnicalData}
            reset={resetFilters}
          />
        </section>

        <section id="exterior">
          <Exterior setExteriorInfo={setExteriorInfo} reset={resetFilters} />
        </section>

        <section id="interior">
          <Interior setInteriorInfo={setInteriorInfo} reset={resetFilters} />
        </section>
      </form>

      <StickyFooter
        onClearFilters={handleClearFilters}
        formId="advancedFilterForm"
      />
    </div>
  );
}
