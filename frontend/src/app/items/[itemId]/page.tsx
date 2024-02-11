"use client";

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
import Error from "@/app/error";
import NotFound from "@/app/not-found";

import { useGetSingleItem } from "@/app/hooks/useItems";
import { useTheme } from "@/app/contexts/ThemeContext";
import Footer from "@/app/components/others/Footer";

type PageType = {
  params: { itemId: string };
};

const Page = ({ params }: PageType) => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const {
    data: item,
    isLoading,
    error,
    refetch,
  } = useGetSingleItem(params.itemId);

  if (isLoading) return <Loading />;
  if (!item) return <NotFound />;
  if (error) return <Error error={error} reset={refetch} />;

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
      <div className="md:hidden">
        <CarouselImgs images={images} />
      </div>
      <div className="mx-auto mt-3 flex w-11/12 flex-col gap-1 md:grid md:grid-cols-2">
        <div className="hidden md:block">
          <CarouselImgs images={images} />
        </div>
        <div>
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
      </div>

      <Footer />
    </>
  );
};

export default Page;
