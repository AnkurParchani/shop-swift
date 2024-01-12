"use client";

import Loading from "@/app/loading";
import { getItems } from "@/app/services/apiItems";
import { useQuery } from "@tanstack/react-query";
import ProductItem from "./ProductItem";
import { Item } from "../../../../global";

const ProductItems = () => {
  // Getting all the items
  const {
    isLoading,
    error,
    data: items,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  if (isLoading) return <Loading />;

  console.log(items);

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-5 py-10 sm:grid-cols-3 sm:gap-10">
      {items.map((item: Item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductItems;
