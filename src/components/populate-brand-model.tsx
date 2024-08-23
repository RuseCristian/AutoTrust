"use client";
import seedCarListings from "@/actions/populateDb/populateListings";

export default function SeedButton() {
  const handleSeed = async () => {
    try {
      await seedCarListings();
      alert("Database seeded successfully!");
    } catch (error) {
      console.error("Error seeding the database:", error);
      alert("Failed to seed the database.");
    }
  };

  return (
    <button
      onClick={handleSeed}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Seed Database
    </button>
  );
}
