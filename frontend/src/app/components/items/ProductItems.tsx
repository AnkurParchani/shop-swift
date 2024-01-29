"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ProductItem from "./ProductItem";
import Loading from "@/app/loading";

import { Item } from "../../../../global";
import { useGetAllItems } from "@/app/hooks/useItems";

const ProductItems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: items,
    isLoading,
    error,
    refetch: refetchGetAllItems,
  } = useGetAllItems(searchParams);

  useEffect(() => {
    refetchGetAllItems();
  }, [refetchGetAllItems, searchParams]);

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-10">
      {items.map((item: Item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductItems;
