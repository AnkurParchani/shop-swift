"use client";

import Image from "next/image";
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

import { Review } from "../../../global";
import { useGetMyReviews } from "../hooks/useReviews";
import { formatDate } from "../utils/helpers";
import DeleteReviewModal from "./DeleteReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [review, setReview] = useState<Review | null>();
  const [reviewId, setReviewId] = useState<number>(0);
  const { data: reviews, isLoading, error } = useGetMyReviews();
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
  if (!reviews || !reviews.length) return <EmptyReviews />;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5">
        <p className="flex items-center gap-1 text-lg font-semibold text-primary">
          Reviews <span className="text-sm">({reviews.length} reviews)</span>
        </p>

        <BreadCrumb curPage="Reviews" />

        <div className="mt-4 flex flex-col gap-4">
          {reviews.map((review: Review) => {
            const { id, item, itemId, content, date, isEdited, stars } = review;
            const mainItemImgPath =
              item.images?.filter((img) => img.isItemMainImg)[0].path || "";
            const formattedDate = formatDate(date);

            return (
              <Card key={id} className="relative max-w-[400px]">
                <CardHeader className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <p className="text-base capitalize">{item.company}</p>
                    <p className="text-xs text-primary">{item.name}</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs">{formattedDate}</p>
                    {isEdited && (
                      <p className="text-right text-[12px] text-gray-400">
                        (Edited)
                      </p>
                    )}
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-row gap-4 text-xs">
                  <Image
                    height={1000}
                    width={1000}
                    alt="Item Image"
                    className="h-auto w-24 rounded-md"
                    src={mainItemImgPath}
                    onClick={() => router.push(`/items/${itemId}`)}
                  />

                  <div className="flex w-full flex-col gap-2">
                    <ReviewStars starSize="18px" star={+stars} />
                    <p className="text-sm">{content}</p>
                  </div>
                </CardBody>

                <Divider />

                <CardFooter className="flex justify-end gap-3">
                  <Button
                    size="sm"
                    onPress={() => {
                      setReview(review);
                      updateReviewOnOpen();
                    }}
                    color="default"
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
    </>
  );
};

export default Page;
