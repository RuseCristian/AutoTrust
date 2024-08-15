import AdvancedFilter from "@/components/search-filter/advanced-filter";
import { Poppins } from "next/font/google";

export default function Page() {
  return (
    <main>
      <div className="space-y-6 text-center">
        <AdvancedFilter></AdvancedFilter>
      </div>
    </main>
  );
}
