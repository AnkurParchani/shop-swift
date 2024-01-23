"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useGetAllOrders } from "../hooks/useOrders";
import Loading from "../loading";
import EmptyOrders from "./EmptyOrders";
import { Order } from "../../../global";
import { formatDate } from "../utils/helpers";

const Page = () => {
  const router = useRouter();
  const { data: orders, isLoading } = useGetAllOrders();

  if (isLoading) return <Loading />;
  if (!orders || orders.length === 0) return <EmptyOrders />;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
      <p className="flex items-center gap-1 text-lg font-semibold text-primary">
        Orders{" "}
        <span className="text-sm">
          ({orders.length} {orders.length > 1 ? "orders" : "order"})
        </span>
      </p>

      {orders.map((order: Order) => {
        const { date, id, orderItems } = order;
        const totalPrice = orderItems.reduce(
          (acc, cur) => (cur.item?.discountedPrice ?? 0) * cur.quantity + acc,
          0,
        );
        const formattedDate = formatDate(date);

        return (
          <Card key={id} className="relative max-w-[400px] text-sm">
            <CardHeader>
              <div className="flex w-full justify-between">
                <p className="font-semibold">ORDER_ID: {id}</p>
                <p className="text-yellow-400">{formattedDate}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-1">
              <div className="flex justify-between">
                <p>Items Ordered</p>
                <p className="font-semibold">{orderItems.length}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Status</p>
                <p className="text-red-500">Not Delivered</p>
              </div>
              <div className="flex justify-between">
                <p>Payment Status</p>
                <p className="text-green-500">Paid</p>
              </div>
              <div className="flex justify-between">
                <p>Total Amount</p>
                <p className="font-semibold text-primary">₹{totalPrice}</p>
              </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end">
              <Button
                color="primary"
                size="sm"
                variant="solid"
                onPress={() => router.push(`/my-orders/${id}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Page;
