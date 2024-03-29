"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";

import BreadCrumb from "../components/others/BreadCrumb";
import Loading from "../loading";
import EmptyReviews from "./EmptyReviews";
import ReviewStars from "../components/others/ReviewStars";
import UpdateReviewModal from "./UpdateReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import Error from "../error";
import Footer from "../components/others/Footer";

import { Review } from "../../../global";
import { formatDate } from "../utils/helpers";
import { useGetMyReviews } from "../hooks/useReviews";
import { useTheme } from "../contexts/ThemeContext";

const Page = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const [review, setReview] = useState<Review | null>();
  const [reviewId, setReviewId] = useState<number>(0);
  const { data: reviews, isLoading, error, refetch } = useGetMyReviews();
  const {
    isOpen: updateReviewIsOpen,
    onOpen: updateReviewOnOpen,
    onClose: updateReviewOnClose,
    onOpenChange: updateReviewOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: deleteReviewIsOpen,
    onOpen: deleteReviewOnOpen,
    onClose: deleteReviewOnClose,
    onOpenChange: deleteReviewOnOpenChange,
  } = useDisclosure();

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} reset={refetch} />;
  if (!reviews || !reviews.length) return <EmptyReviews />;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5">
        <p className="flex items-center gap-1 text-lg font-semibold text-content1-400">
          Reviews <span className="text-sm">({reviews.length} reviews)</span>
        </p>

        <BreadCrumb curPage="Reviews" />

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:gap-8">
          {reviews.map((review: Review) => {
            const { id, item, itemId, content, date, isEdited, stars } = review;
            const mainItemImgPath =
              item.images?.filter((img) => img.isItemMainImg)[0].path || "";
            const formattedDate = formatDate(date);

            return (
              <Card
                key={id}
                className={`relative mx-auto w-full border-2 border-content1-500 bg-transparent sm:w-11/12 ${
                  bgTheme === "dark" ? "text-content1-100" : "text-black"
                }`}
              >
                <CardHeader className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <p className="text-base capitalize text-content1-500">
                      {item.company}
                    </p>
                    <p className="text-xs">{item.name}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs">{formattedDate}</p>
                    {isEdited && (
                      <p className="text-right text-[12px]">(Edited)</p>
                    )}
                  </div>
                </CardHeader>
                <Divider className="bg-content1-500" />
                <CardBody className="flex flex-row gap-4 text-xs">
                  <Image
                    height={1000}
                    width={1000}
                    alt="Item Image"
                    className="h-32 w-24 rounded-md object-cover"
                    src={mainItemImgPath}
                    onClick={() => router.push(`/items/${itemId}`)}
                  />

                  <div className="flex w-full flex-col gap-2">
                    <ReviewStars starSize="18px" star={+stars} />
                    <p className="text-sm">{content}</p>
                  </div>
                </CardBody>

                <Divider className="bg-content1-500" />

                <CardFooter className="flex justify-end gap-3">
                  <Button
                    size="sm"
                    onPress={() => {
                      setReview(review);
                      updateReviewOnOpen();
                    }}
                    className="border-2 border-content1-600"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onPress={() => {
                      setReviewId(id);
                      deleteReviewOnOpen();
                    }}
                    color="danger"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {updateReviewIsOpen && (
        <UpdateReviewModal
          review={review as Review}
          isOpen={updateReviewIsOpen}
          onClose={updateReviewOnClose}
          onOpenChange={updateReviewOnOpenChange}
        />
      )}

      {deleteReviewIsOpen && (
        <DeleteReviewModal
          reviewId={reviewId}
          isOpen={deleteReviewIsOpen}
          onClose={deleteReviewOnClose}
          onOpenChange={deleteReviewOnOpenChange}
        />
      )}

      <Footer />
    </>
  );
};

export default Page;
