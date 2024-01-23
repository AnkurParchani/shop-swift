"use client";

import Loading from "@/app/loading";
import ProductItem from "./ProductItem";
import { Item } from "../../../../global";
import { useGetAllItems } from "@/app/hooks/useItems";

const ProductItems = () => {
  const { data: items, isLoading, error } = useGetAllItems();

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-5 py-10 sm:grid-cols-3 sm:gap-10">
      {items.map((item: Item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductItems;
