"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import FilterSortControls from "./components/others/FilterSortControls";
import ProductItems from "./components/items/ProductItems";
import Loading from "./loading";

import { useGetAllFilteredItems, useGetAllItems } from "./hooks/useItems";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allItems, isLoading: allItemsIsLoading } = useGetAllItems();
  const {
    data: filteredItems,
    isLoading: filteredItemsIsLoading,
    refetch: refetchGetAllFilteredItems,
  } = useGetAllFilteredItems(searchParams);

  // Refetching the data if there's a change in query parameter
  useEffect(() => {
    refetchGetAllFilteredItems();
  }, [refetchGetAllFilteredItems, searchParams]);

  if (filteredItemsIsLoading || allItemsIsLoading) return <Loading />;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3">
      <FilterSortControls items={allItems} />
      <ProductItems items={filteredItems} />
      <ProductItems items={filteredItems} />
      <ProductItems items={filteredItems} />
      <ProductItems items={filteredItems} />
      <ProductItems items={filteredItems} />
      <ProductItems items={filteredItems} />
      <ProductItems items={filteredItems} />
    </div>
  );
}
