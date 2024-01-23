"use client";
import { useGetSingleOrder } from "@/app/hooks/useOrders";
import EmptyOrders from "../EmptyOrders";
import { Button, Card } from "@nextui-org/react";
import { Order } from "../../../../global";
import Loading from "@/app/loading";
import { formatDate } from "@/app/utils/helpers";
import AddressBox from "@/app/components/others/AddressBox";
import BreadCrumb from "@/app/components/others/BreadCrumb";

type UseGetSingleOrderResult = {
  data: Order;
  isLoading: boolean;
};

const Page = ({ params }: { params: { orderId: string } }) => {
  const { data: order, isLoading } = useGetSingleOrder(
    params.orderId,
  ) as UseGetSingleOrderResult;

  if (isLoading) return <Loading />;
  if (!order) return <EmptyOrders />;

  const formattedDate = formatDate(order.date);

  console.log(order);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-medium">
          <p className="text-base font-semibold text-primary">
            ORDER_ID: {order.id}
          </p>
          <p>{formattedDate}</p>
        </div>

        <BreadCrumb curPage={`order-${order.id}`} />
      </div>

      <div>
        {/* {order.orderItems.map(item => {
            
            return <Card>

            </Card>
        })} */}
      </div>

      <div>
        <p className="mb-2 font-medium uppercase text-yellow-400">
          Delivered to:
        </p>
        <AddressBox address={order.address} />
      </div>
    </div>
  );
};

export default Page;
