"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  useDisclosure,
} from "@nextui-org/react";

import Loading from "@/app/loading";
import BreadCrumb from "@/app/components/others/BreadCrumb";
import EmptyOrders from "../EmptyOrders";
import AddressBox from "@/app/components/others/AddressBox";

import { Order, Review } from "../../../../global";
import { formatDate } from "@/app/utils/helpers";
import { useGetSingleOrder } from "@/app/hooks/useOrders";
import { useGetMyReviews } from "@/app/hooks/useReviews";
import AddReviewModal from "@/app/my-reviews/AddReviewModal";
import { useState } from "react";

type UseGetSingleOrderResult = {
  data: Order;
  isLoading: boolean;
};

const Page = ({ params }: { params: { orderId: string } }) => {
  const router = useRouter();
  const [reviewItemId, setReviewItemId] = useState(0);
  const { data: reviews } = useGetMyReviews();
  const { data: order, isLoading } = useGetSingleOrder(
    params.orderId,
  ) as UseGetSingleOrderResult;
  const {
    isOpen: addReviewIsOpen,
    onOpen: addReviewOnOpen,
    onClose: addReviewOnClose,
    onOpenChange: addReviewOnOpenChange,
  } = useDisclosure();

  if (isLoading) return <Loading />;
  if (!order) return <EmptyOrders />;

  const formattedDate = formatDate(order.date);

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-medium">
            <p className="text-base font-semibold text-primary">
              ORDER_ID: {order.id}
            </p>
            <p>{formattedDate}</p>
          </div>

          <BreadCrumb curPage={`order_${order.id}`} />
        </div>

        <div className="flex flex-col gap-3">
          {order.orderItems.map((orderItem) => {
            const { color, id, itemId, item, size, quantity } = orderItem;
            const totalPrice = (item?.discountedPrice ?? 0) * quantity;
            const mainItemImgPath =
              item?.images?.filter((img) => img.isItemMainImg)[0].path || "";
            const isReviewed = reviews.find(
              (review: Review) => review.itemId === itemId,
            );

            return (
              <Card key={id}>
                <CardBody className="flex flex-row gap-4 text-xs">
                  <Image
                    height={1000}
                    width={1000}
                    alt="Item Image"
                    className="h-auto w-24 rounded-md"
                    src={mainItemImgPath}
                    onClick={() => router.push(`/items/${itemId}`)}
                  />

                  <div className="flex w-full flex-col gap-1 capitalize">
                    <p className="font-semibold uppercase">{item?.company}</p>
                    <p className="text-primary">{item?.name}</p>
                    <p>Model no. {item?.description.modelNumber}</p>
                    {color && <p>Color: {color}</p>}
                    {size && <p>Size: {size}</p>}

                    <div className="ml-auto mt-auto flex flex-col gap-0.5 text-right">
                      <p className="text-yellow-400">Quantity: {quantity}</p>
                      <p className="text-green-500">
                        Total amount: {totalPrice}
                      </p>
                    </div>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex justify-end">
                  {isReviewed ? (
                    <Button onPress={() => router.push("/my-reviews")}>
                      Reviewed
                    </Button>
                  ) : (
                    <Button
                      onPress={() => {
                        addReviewOnOpen();
                        setReviewItemId(itemId);
                      }}
                      color="primary"
                    >
                      Review
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div>
            <p className="mb-2 font-medium uppercase text-yellow-400">
              Delivered to:
            </p>
            <AddressBox address={order.address} />
          </div>

          <div className="mt-3">
            <p className="mb-2 font-medium uppercase text-yellow-400">
              Updates Sent to:
            </p>
            <Card className="flex flex-col gap-2 px-3 py-2">
              <p className="flex items-center gap-2">
                <FaPhoneAlt style={{ fontSize: "18px" }} />
                <span>{order.address.phoneNumber}</span>
              </p>
              <p className="flex items-center gap-2">
                <MdEmail style={{ fontSize: "18px" }} />
                <span>{order.user.email}</span>
              </p>
            </Card>
          </div>
        </div>
      </div>

      {addReviewIsOpen && (
        <AddReviewModal
          isOpen={addReviewIsOpen}
          onClose={addReviewOnClose}
          onOpenChange={addReviewOnOpenChange}
          itemId={reviewItemId}
        />
      )}
    </>
  );
};

export default Page;
