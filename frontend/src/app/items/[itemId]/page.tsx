"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleItem } from "@/app/services/apiItems";
import Loading from "@/app/loading";
import CarouselImgs from "@/app/components/items/CarouselImgs";
import ReviewSummary from "./ReviewSummary";
import PriceSummary from "./PriceSummary";
import AboutBox from "./AboutBox";
import ReviewContainer from "./ReviewContainer";
import ExtraDetailsTable from "./ExtraDetailsTable";
import SellerInfo from "./SellerInfo";
import ItemConfigurations from "./ItemConfigurations";
import ActionBtn from "./ActionBtn";
import { useGetSingleItem } from "@/app/hooks/useItems";
import { useTheme } from "@/app/contexts/ThemeContext";

type PageType = {
  params: { itemId: string };
};

const Page = ({ params }: PageType) => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const { data: item, isLoading, error } = useGetSingleItem(params.itemId);

  if (isLoading) return <Loading />;
  if (!item) return <p>No item found with this itemID</p>;

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
  } = item;

  return (
    <>
      <CarouselImgs images={images} />
      <div className="mx-auto mt-3 flex w-11/12 flex-col gap-1">
        <b className="text-lg uppercase">{company}</b>
        {category && (
          <p
            className={`-mt-1 text-sm font-medium capitalize  ${
              bgTheme === "dark" ? "text-content1-200" : "text-content1-700"
            }`}
          >
            {category}
          </p>
        )}
        <p className="text-sm text-gray-500">{name}</p>
        <ReviewSummary ratings={ratings} numReviews={numReviews} />
        <PriceSummary
          originalPrice={originalPrice}
          discountedPrice={discountedPrice}
        />

        <ItemConfigurations extraDetails={extraDetails} />

        <ActionBtn
          itemDetails={{ discountedPrice, extraDetails, id: +params.itemId }}
          itemId={params.itemId}
        />

        <AboutBox about={about} />
        <ReviewContainer reviews={reviews} />
        <ExtraDetailsTable
          category={category}
          company={company}
          description={description}
        />

        <SellerInfo sellerLink={extraDetails.visitLink} />
      </div>
    </>
  );
};

export default Page;
