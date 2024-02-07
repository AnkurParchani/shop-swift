import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";

import ReviewStars from "@/app/components/others/ReviewStars";

import { User } from "../../../../global";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useTheme } from "@/app/contexts/ThemeContext";

type ReviewType = {
  content: string;
  date: string;
  id: number;
  isEdited: boolean;
  stars: string;
  user: User;
};

const ReviewContainer = ({ reviews }: { reviews: ReviewType[] }) => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];

  return (
    <div className="px-1 py-5">
      <h2 className="mb-2 text-lg font-semibold">Reviews</h2>

      {reviews.length === 0 && (
        <p className="-mt-2 mb-2 text-sm text-orange-400">
          (This product has no reviews yet)
        </p>
      )}

      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        speed={3000}
        modules={[Pagination]}
        className="bg-trasnparent rounded-lg border-2 border-content1-300"
      >
        {reviews.map((review) => {
          const { id, content, isEdited, stars, user } = review;
          const { email: userEmail, name: userName, image } = user;

          return (
            <SwiperSlide key={id} className="cursor-pointer">
              <Card
                className={`bg-transparent pb-8 ${
                  bgTheme === "dark" ? "text-foreground" : "text-black"
                }`}
              >
                <CardHeader className="relative flex items-start gap-3">
                  {isEdited && (
                    <p className="absolute right-1.5 top-1.5 text-xs ">
                      (Edited)
                    </p>
                  )}
                  <Image
                    alt={`${userName} image`}
                    height={40}
                    className="rounded-full"
                    radius="sm"
                    src={user?.image?.path || "/images/default-user.jpg"}
                    width={40}
                  />
                  <div className="flex flex-col ">
                    <p className="text-md capitalize">{userName}</p>
                    <p className="text-xs ">{userEmail}</p>
                    <p className="mt-2 text-xs ">
                      <ReviewStars star={+stars} />
                    </p>
                  </div>
                </CardHeader>
                <Divider className="bg-content1-500" />

                <CardBody className="text-sm">
                  <p className="">{content}</p>
                </CardBody>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ReviewContainer;
