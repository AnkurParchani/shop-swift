"use client";

import ProductItems from "./components/items/ProductItems";
import FilterSortControls from "./components/others/FilterSortControls";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3">
      <FilterSortControls />
      <ProductItems />
    </div>
  );
}
