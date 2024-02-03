"use client";

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRouter } from "next/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import SwiperCore from "swiper/core";

import FilterSortControls from "./components/others/FilterSortControls";
import ProductItems from "./components/items/ProductItems";
import Loading from "./loading";
import Footer from "./components/others/Footer";

import { useGetAllFilteredItems, useGetAllItems } from "./hooks/useItems";
import { Item } from "../../global";

import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";

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

// Seperate section for different products
function ProductSection({
  items,
  heading,
}: {
  items: Item[];
  heading: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold text-primary">{heading}</h1>
      <ProductItems items={items} />
    </div>
  );
}

// Slider for between sections
function ImageSwiperSection({
  items,
}: {
  items: { imgPath: string; link: string }[];
}) {
  const router = useRouter();
  SwiperCore.use([Autoplay, FreeMode]);

  return (
    <Swiper
      className="w-full"
      centeredSlides={true}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={1500}
      modules={[FreeMode]}
    >
      {items.map((item) => (
        <SwiperSlide key={item.imgPath} className="bg-black">
          <Image
            src={item.imgPath}
            alt="Image"
            width={1000}
            className="h-32 rounded-md object-cover"
            objectFit="cover"
            onClick={() => router.push(item.link)}
            height={1000}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
