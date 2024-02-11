import Image from "next/image";
import SwiperCore from "swiper/core";
import { useRouter } from "next/navigation";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import ProductItem from "./ProductItem";

import { Item } from "../../../../global";

// Seperate section for different products
function ProductSection({
  items,
  heading,
  delay,
}: {
  items: Item[];
  heading: string;
  delay?: number;
}) {
  SwiperCore.use([Autoplay, FreeMode]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold text-content1-400">{heading}</h1>

      <Swiper
        className="w-full"
        slidesPerView={2}
        loop={true}
        spaceBetween={15}
        autoplay={{
          delay: delay || 2500,
          disableOnInteraction: false,
        }}
        speed={2500}
        modules={[FreeMode]}
        breakpoints={{
          545: {
            slidesPerView: 3,
          },
          750: {
            slidesPerView: 4,
          },
          1028: {
            slidesPerView: 5,
          },
        }}
      >
        {items.map((item: Item) => (
          <SwiperSlide key={item.id}>
            <ProductItem key={item.id} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// Slider for between sections
function ImageSwiperSection({
  items,
  delay,
}: {
  items: { imgPath: string; link: string; inStock: boolean }[];
  delay?: number;
}) {
  const router = useRouter();
  SwiperCore.use([Autoplay, FreeMode]);

  return (
    <Swiper
      className=" w-full rounded-md"
      centeredSlides={true}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: delay || 4000,
        disableOnInteraction: false,
      }}
      speed={2000}
      modules={[FreeMode]}
      breakpoints={{
        545: {
          slidesPerView: 2,
        },
        750: {
          slidesPerView: 3,
        },
        1028: {
          slidesPerView: 4,
        },
      }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.imgPath} className="relative bg-black">
          <Image
            src={item.imgPath}
            alt="Image"
            width={1000}
            className={`h-32 rounded-md object-cover ${
              !item.inStock && "opacity-50"
            }`}
            objectFit="cover"
            onClick={() => {
              if (item.inStock) {
                router.push(item.link);
              }
            }}
            height={1000}
          />

          {/* Item not in stock tag */}
          {!item.inStock && (
            <p className="absolute right-0 top-0 z-20 rounded-sm bg-red-600 px-2 py-0.5 text-xs text-white">
              Out of Stock
            </p>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export { ProductSection, ImageSwiperSection };
