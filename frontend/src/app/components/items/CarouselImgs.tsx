// Import Swiper React components
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import {
  Autoplay,
  FreeMode,
  Pagination,
  Navigation,
  Thumbs,
} from "swiper/modules";
import SwiperCore from "swiper/core";
import { Image as ImageType } from "../../../../global";

const CarouselImgs = ({ images }: { images: ImageType[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  SwiperCore.use([Autoplay, Thumbs, Navigation, FreeMode]);

  return (
    <div className="flex flex-col gap-4 py-5">
      <Swiper
        className="mx-auto h-auto w-1/2"
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        speed={1500}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <Image
              src={img.path}
              className="rounded-md"
              alt="Item-img"
              height={1000}
              width={1000}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
        spaceBetween={7}
        slidesPerView={images.length}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-3/4"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <Image
              src={img.path}
              alt="Item-img"
              height={1000}
              width={1000}
              className="rounded-sm"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselImgs;
