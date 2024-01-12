"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleItem } from "@/app/services/apiItems";
import Loading from "@/app/loading";
import CarouselImgs from "@/app/components/items/CarouselImgs";
import ReviewSummary from "./ReviewSummary";
import PriceSummary from "./PriceSummary";
import AboutBox from "./AboutBox";
import ReviewContainer from "./ReviewContainer";

type PageType = {
  params: { itemId: string };
};

const Page = ({ params }: PageType) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`item-${params.itemId}`],
    queryFn: () => getSingleItem(params.itemId),
  });

  if (isLoading) return <Loading />;

  const {
    images,
    reviews,
    company,
    category,
    name,
    originalPrice,
    discountedPrice,
    description,
    extraDetails,
    about,
    ratings,
    numReviews,
  } = data;

  console.log(data);

  return (
    <>
      <CarouselImgs images={images} />
      <div className="mx-auto mt-3 flex w-11/12 flex-col gap-1">
        <b className="text-lg uppercase">{company}</b>
        {category && (
          <p className="-mt-1 text-sm font-medium capitalize text-gray-300">
            {category}
          </p>
        )}
        <p className="text-sm text-gray-500">{name}</p>
        <ReviewSummary ratings={ratings} numReviews={numReviews} />
        <PriceSummary
          originalPrice={originalPrice}
          discountedPrice={discountedPrice}
        />

        <AboutBox about={about} />
        <ReviewContainer reviews={reviews} />
      </div>
    </>
  );
};

export default Page;
