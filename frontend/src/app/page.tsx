"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import FilterSortControls from "./components/others/FilterSortControls";
import Loading from "./loading";
import Footer from "./components/others/Footer";
import Error from "./error";
import EmptyList from "./components/others/EmptyList";

import { useGetAllFilteredItems, useGetAllItems } from "./hooks/useItems";
import { Item } from "../../global";

import {
  ImageSwiperSection,
  ProductSection,
} from "./components/items/ProductItems";

import "swiper/css";
import "swiper/css/free-mode";

export default function Home() {
  const [searchParams] = useSearchParams();
  const {
    data: allItems,
    isLoading: allItemsIsLoading,
    error: allItemsError,
    refetch: allItemsRefetch,
  } = useGetAllItems();
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

  if (allItemsError)
    return <Error error={allItemsError} reset={() => allItemsRefetch()} />;

  if (filteredItems.length === 0)
    return (
      <>
        <EmptyList
          description="Try again with different filters"
          iconSrc="/icons/not-found.svg"
          heading="No Items found"
          backButton
        />
        <Footer />
      </>
    );

  // Best sellers items (sort according to number of orders of an item)
  const bestSellerItems = filteredItems.sort(
    (a: Item, b: Item) => b.numOrders! - a.numOrders!,
  );

  // Highest rated items (most reviews)
  const highRatedItems = filteredItems.filter(
    (item: Item) => Number(item.ratings) >= 4,
  );

  // Male Filtered items
  const maleItems = filteredItems.filter(
    (item: Item) => item.forGender === "male",
  );

  // Female Filtered items
  const femaleItems = filteredItems.filter(
    (item: Item) => item.forGender === "female",
  );

  // Unisex Filtered items
  const unisexItems = filteredItems.filter(
    (item: Item) => item.forGender === "unisex",
  );

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-3">
        <FilterSortControls items={allItems} />
        {filteredItems && (
          <div className="flex flex-col gap-10">
            {/* Best sellers items carousel (according to number of orders) */}
            {bestSellerItems.length > 0 && (
              <ProductSection
                delay={3000}
                heading="Best Sellers"
                items={bestSellerItems}
              />
            )}

            {/* Items with highest stars (4 and 5) */}
            {highRatedItems.length > 0 && (
              <ProductSection
                delay={5000}
                heading="Highest Rated"
                items={highRatedItems}
              />
            )}

            {/* All Image of all items carousel */}
            <ImageSwiperSection
              delay={3000}
              items={allItems.map((item: Item) => {
                return {
                  imgPath: item.image,
                  link: `/items/${item.id}`,
                  inStock: item.inStock,
                };
              })}
            />
            {/* Male items carousel */}
            {maleItems.length > 0 && (
              <ProductSection
                delay={9000}
                heading="For Men"
                items={maleItems}
              />
            )}

            {/* Female items carousel */}
            {femaleItems.length > 0 && (
              <ProductSection
                delay={9000}
                heading="For Women"
                items={femaleItems}
              />
            )}

            {/* Highest rated items image carousel */}
            {(femaleItems.length > 0 || maleItems.length > 0) &&
              highRatedItems.length > 0 && (
                <ImageSwiperSection
                  delay={6000}
                  items={highRatedItems.map((item: Item) => {
                    return {
                      imgPath: item.image,
                      link: `/items/${item.id}`,
                      inStock: item.inStock,
                    };
                  })}
                />
              )}

            {/* Unisex items carousel */}
            {unisexItems.length > 0 && (
              <ProductSection
                delay={9000}
                heading="Unisex"
                items={unisexItems}
              />
            )}

            {/* Best seller items image carousel */}
            {unisexItems.length > 0 && (
              <ImageSwiperSection
                delay={8000}
                items={bestSellerItems.map((item: Item) => {
                  return {
                    imgPath: item.image,
                    link: `/items/${item.id}`,
                    inStock: item.inStock,
                  };
                })}
              />
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
