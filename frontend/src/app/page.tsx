"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import FilterSortControls from "./components/others/FilterSortControls";
import Loading from "./loading";
import Footer from "./components/others/Footer";

import { useGetAllFilteredItems, useGetAllItems } from "./hooks/useItems";

import "swiper/css";
import "swiper/css/free-mode";
import {
  ImageSwiperSection,
  ProductSection,
} from "./components/items/ProductItems";

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

  if (filteredItems.length === 0) return <p>No items found</p>;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3">
        <FilterSortControls items={allItems} />
        {filteredItems && (
          <div className="flex flex-col gap-10">
            <ProductSection heading="Best Sellers" items={filteredItems} />

            <ProductSection heading="Highest Rated" items={filteredItems} />
            <ImageSwiperSection
              items={[
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-z.jpg-1695120860164-mainImg-21.jpeg",
                  link: "/",
                },
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-s.avif-1695114645578-mainImg-20.avif",
                  link: "/",
                },
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-z.jpg-1695120860164-mainImg-21.jpeg",
                  link: "/",
                },
              ]}
            />
            <ProductSection heading="For Men" items={filteredItems} />
            <ProductSection heading="For Women" items={filteredItems} />
            <ImageSwiperSection
              items={[
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-z.jpg-1695120860164-mainImg-21.jpeg",
                  link: "/",
                },
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-s.avif-1695114645578-mainImg-20.avif",
                  link: "/",
                },
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-z.jpg-1695120860164-mainImg-21.jpeg",
                  link: "/",
                },
              ]}
            />
            <ProductSection heading="Unisex" items={filteredItems} />
            <ImageSwiperSection
              items={[
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-z.jpg-1695120860164-mainImg-21.jpeg",
                  link: "/",
                },
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-s.avif-1695114645578-mainImg-20.avif",
                  link: "/",
                },
                {
                  imgPath:
                    "https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/item-650960d7b2bf72f6e43f1234-z.jpg-1695120860164-mainImg-21.jpeg",
                  link: "/",
                },
              ]}
            />
          </div>
        )}
      </div>
      <Footer hasUser />
    </>
  );
}
