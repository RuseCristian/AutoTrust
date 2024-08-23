"use server";
import { db } from "@/lib/db";

const collections = [
  {
    title: "Fuel-Savers",
    description: "Keeps Your Wallet Full",
    image: "/collections/fuel-s.jpg",
    link: "/collections/fuel-savers",
  },
  {
    title: "Deutschland",
    description: "German Precision and Prestige",
    image: "/collections/deutschland.jpg",
    link: "/collections/deutschland",
  },
  {
    title: "Italian Art",
    description: "Passion at Every Gear Shift",
    image: "/collections/italy.jpg",
    link: "/collections/italian-art",
  },
  {
    title: "Electric Power",
    description: "Drive the Future",
    image: "/collections/electric.jpg",
    link: "/collections/electric-power",
  },
  {
    title: "Manuals Club",
    description: "Three Pedals, Pure Joy",
    image: "/collections/manual.jpg",
    link: "/collections/manuals-club",
  },
  {
    title: "UK's Finest",
    description: "Elegance on Wheels",
    image: "/collections/uk.jpg",
    link: "/collections/uks-finest",
  },
  {
    title: "Classic Cars",
    description: "Timeless Beauty",
    image: "/collections/classic.jpg",
    link: "/collections/classic-cars",
  },
  {
    title: "Off-road Adventures",
    description: "Conquer Any Terrain",
    image: "/collections/off-road.jpg",
    link: "/collections/off-road",
  },
  {
    title: "Family-Friendly",
    description: "Comfort and Safety for All",
    image: "/collections/family.jpg",
    link: "/collections/family-friendly",
  },
  {
    title: "American Muscle",
    description: "Raw Power and Performance",
    image: "/collections/american.jpg",
    link: "/collections/american-muscle",
  },
  {
    title: "SUV Collection",
    description: "Space and Comfort",
    image: "/collections/suv.jpg",
    link: "/collections/suv-collection",
  },
  {
    title: "Exotic Cars",
    description: "Exclusive and Extraordinary",
    image: "/collections/exotic.jpg",
    link: "/collections/exotic-cars",
  },
];

export async function main() {
  for (const collection of collections) {
    await db.featuredCollections.create({
      data: collection,
    });
  }
  console.log("Featured collections have been populated.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
