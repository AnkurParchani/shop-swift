"use client";

import { useGetMyCart } from "../hooks/useCart";
import Loading from "../loading";

const Page = () => {
  const { data, isLoading, error } = useGetMyCart();

  if (isLoading) return <Loading />;
  console.log("Logging data ", data);

  return <div>Cart Page</div>;
};

export default Page;
