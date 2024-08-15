import { Poppins } from "next/font/google";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CarListingCard } from "@/components/listings/listing-card";
import { CollectionGrid } from "@/components/featured-collections/featured-collection";
import SimpleSearchFilter from "@/components/search-filter/simple-filter";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const carData = {
  imageSrc: "/admin.png",
  model: "Tesla Model S",
  price: "$75,000",
  registrationYear: "2022",
  mileage: "15,000",
  horsepower: "670",
  transmission: "Automatic",
  fuelType: "Electric",
  tractionType: "AWD",
  href: "/car/tesla-model-s",
  dealerData: {
    imageSrc: "/admin.png",
    name: "John Doe Dealership",
    href: "/dealer/john-doe",
    rating: 4.5,
  },
  serviceData: {
    imageSrc: "/admin.png",
    name: "Tesla Service Center",
    href: "/service/tesla",
    rating: 3.7,
  },
};
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center mt-16">
      <div className="space-y-6 text-center">
        <SimpleSearchFilter></SimpleSearchFilter>
        <CarListingCard
          images={[
            "/admin.png",
            "/admin.png",
            "/admin.png",
            "/admin.png",
            "/admin.png",
            "/admin.png",
          ]}
          model="Tesla Model S"
          price="$75,000"
          registrationYear="2022"
          mileage="15,000"
          horsepower="670"
          transmission="Automatic"
          fuelType="Electric"
          tractionType="AWD"
          href="/car/tesla-model-s"
          dealerData={{
            imageSrc: "/admin.png",
            name: "John Doe Dealership",
            href: "/dealer/john-doe",
            rating: 4.5,
          }}
          serviceData={{
            imageSrc: "/admin.png",
            name: "Tesla Service Center",
            href: "/service/tesla-service-center",
            rating: 4.0,
          }}
        />

        <CollectionGrid />
      </div>
    </main>
  );
}
