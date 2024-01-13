import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";

import ReviewStars from "@/app/components/others/ReviewStars";

import { User } from "../../../../global";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

type ReviewType = {
  content: string;
  date: string;
  id: number;
  isEdited: boolean;
  stars: string;
  user: User;
};

const ReviewContainer = ({ reviews }: { reviews: ReviewType[] }) => {
  return (
    <div className="px-1 py-5">
      <h2 className="mb-2 text-lg font-semibold text-white">Reviews</h2>

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
        className="bg-trasnparent rounded-lg border-3 border-gray-600"
      >
        {reviews.map((review) => {
          const { id, content, isEdited, stars, date, user } = review;
          const { email: userEmail, name: userName, image } = user;

          return (
            <SwiperSlide key={id} className="cursor-pointer">
              <Card className="bg-transparent pb-8">
                <CardHeader className="flex items-start gap-3">
                  <Image
                    alt={`${userName} image`}
                    height={40}
                    className="rounded-full"
                    radius="sm"
                    src={user?.image?.path || "/images/default-user.jpg"}
                    width={40}
                  />
                  <div className="flex flex-col ">
                    <p className="text-md capitalize text-gray-200">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                    <p className="mt-2 text-xs text-default-500">
                      <ReviewStars star={+stars} />
                    </p>
                  </div>
                </CardHeader>
                <Divider />

                <CardBody className="text-sm text-gray-300">
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
