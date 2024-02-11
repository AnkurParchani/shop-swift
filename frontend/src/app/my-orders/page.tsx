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

import Loading from "../loading";
import EmptyOrders from "./EmptyOrders";
import BreadCrumb from "../components/others/BreadCrumb";

import { Order } from "../../../global";
import { formatDate } from "../utils/helpers";
import { useTheme } from "../contexts/ThemeContext";
import { useGetMyOrders } from "../hooks/useOrders";
import Error from "../error";
import Footer from "../components/others/Footer";

const Page = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const { data: orders, isLoading, refetch, error } = useGetMyOrders();

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} reset={refetch} />;
  if (!orders || orders.length === 0) return <EmptyOrders />;

  // Reversing the orders
  const reverseOrders = [...orders].reverse();

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5">
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1 text-lg font-semibold text-content1-400">
            Orders{" "}
            <span className="text-sm">
              ({orders.length} {orders.length > 1 ? "orders" : "order"})
            </span>
          </p>
        </div>

        <BreadCrumb curPage="Orders" />

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:gap-8">
          {reverseOrders.map((order: Order) => {
            const { date, id, orderItems } = order;
            const totalPrice = orderItems.reduce(
              (acc, cur) =>
                (cur.item?.discountedPrice ?? 0) * cur.quantity + acc,
              0,
            );
            const formattedDate = formatDate(date);

            return (
              <Card
                key={id}
                className={`relative border-2 border-content1-500 bg-transparent ${
                  bgTheme === "dark" ? "text-content1-100" : "text-black"
                }`}
              >
                <CardHeader>
                  <div className="flex w-full justify-between">
                    <p className="font-semibold">ORDER_ID: {id}</p>
                    <p>{formattedDate}</p>
                  </div>
                </CardHeader>
                <Divider className="bg-content1-500" />
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
                    <p className="text-default1-300 font-semibold">
                      ₹{totalPrice}
                    </p>
                  </div>
                </CardBody>
                <Divider className="bg-content1-500" />
                <CardFooter className="flex justify-end">
                  <Button
                    size="sm"
                    variant="solid"
                    className="border-2 border-content1-800 bg-content1-200 "
                    onPress={() => router.push(`/my-orders/${id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
