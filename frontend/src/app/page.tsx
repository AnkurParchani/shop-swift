"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import FilterSortControls from "./components/others/FilterSortControls";
import ProductItems from "./components/items/ProductItems";
import Loading from "./loading";

import { useGetAllItems } from "./hooks/useItems";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: items,
    isLoading,
    error,
    refetch: refetchGetAllItems,
  } = useGetAllItems(searchParams);

  // Refetching the data if there's a change in query parameter
  useEffect(() => {
    refetchGetAllItems();
  }, [refetchGetAllItems, searchParams]);

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3">
      <FilterSortControls items={items} />
      <ProductItems items={items} />
    </div>
  );
}
