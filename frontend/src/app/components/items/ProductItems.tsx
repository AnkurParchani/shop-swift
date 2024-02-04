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
      <h1 className="text-xl font-semibold text-primary">{heading}</h1>

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
  items: { imgPath: string; link: string }[];
  delay?: number;
}) {
  const router = useRouter();
  SwiperCore.use([Autoplay, FreeMode]);

  return (
    <Swiper
      className="w-full "
      centeredSlides={true}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: delay || 4000,
        disableOnInteraction: false,
      }}
      speed={2000}
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

export { ProductSection, ImageSwiperSection };
