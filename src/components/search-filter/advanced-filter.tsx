"use client";

import { useEffect, useState } from "react";
import TechnicalData from "./technical-data-details";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import H2Header from "@/components/ui/h2-header"; // Importing the H2Header component
import CarInfoDetails from "./car-info-details";
import Exterior from "./exterior-details";
import Offer from "./offer-details";
import Interior from "./interior-details";

export default function AdvancedFilter() {
  const [activeSection, setActiveSection] = useState("car-info");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleClick = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <form
        id="advancedFilterForm"
        className="w-full max-w-screen-xl mx-auto px-[20px] lg:px-20 flex-grow"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
        }}
      >
        <H2Header label="Search For Your Next Car" />

        <section id="car-info">
          <CarInfoDetails />
        </section>

        <section id="offer">
          <Offer />
        </section>

        <section id="technical-data">
          <TechnicalData />
        </section>

        <section id="exterior">
          <Exterior />
        </section>

        <section id="interior">
          <Interior />
        </section>
      </form>

      {/* Full-width sticky footer for search actions and section navigation */}
      <div className="bg-white -mb-16 p-4 w-full sticky z-50 border-b-4 bottom-0 border-blue-500">
        <div className="flex justify-between max-w-screen-xl mx-auto px-[20px] lg:px-20">
          <div className="flex space-x-4">
            <Button
              variant={activeSection === "car-info" ? "default" : "outline"}
              onClick={() => handleClick("car-info")}
            >
              Car Info
            </Button>
            <Button
              variant={activeSection === "offer" ? "default" : "outline"}
              onClick={() => handleClick("offer")}
            >
              Offer
            </Button>
            <Button
              variant={activeSection === "technical-data" ? "default" : "outline"}
              onClick={() => handleClick("technical-data")}
            >
              Technical Data
            </Button>
            <Button
              variant={activeSection === "exterior" ? "default" : "outline"}
              onClick={() => handleClick("exterior")}
            >
              Exterior
            </Button>
            <Button
              variant={activeSection === "interior" ? "default" : "outline"}
              onClick={() => handleClick("interior")}
            >
              Interior
            </Button>
          </div>

          <Button type="submit" form="advancedFilterForm">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
