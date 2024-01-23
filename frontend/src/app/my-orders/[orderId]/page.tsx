"use client";
import { useGetSingleOrder } from "@/app/hooks/useOrders";

const Page = ({ params }: { params: { orderId: string } }) => {
  const { data: order } = useGetSingleOrder(params.orderId);

  console.log(order);
  return <div>You have reached seperate order id</div>;
};

export default Page;
