import { Poppins } from "next/font/google";
import { CarListingCard } from "@/components/listings/listing-card";
import { CollectionGrid } from "@/components/featured-collections/featured-collection";
import HeroSection from "@/components/hero";
import SeedButton from "@/components/populate-brand-model";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  const placeholderCars = {
    id: 1,
    title: "2021 BMW 320i",
    image: "/collections/classic.jpg",
    price: "$28,000",
    mileage: "30,000 miles",
    location: "New York, NY",
  };

  return (
    <main>
      <div className="space-y-6 text-center">
        <HeroSection></HeroSection>
        <CollectionGrid />
        <SeedButton></SeedButton>
      </div>
    </main>
  );
}
