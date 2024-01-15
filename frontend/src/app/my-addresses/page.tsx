"use client";

import Loading from "../loading";
import EmptyAddresses from "./EmptyAddresses";

import { useGetAddresses } from "../hooks/useAddress";

const Page = () => {
  const { data: addresses, isLoading, error } = useGetAddresses();
  console.log(addresses);

  if (isLoading) return <Loading />;
  if (addresses.length === 0) return <EmptyAddresses />;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
      <div className="flex justify-between">
        <p className="flex items-center gap-1 text-lg font-semibold text-primary">
          {/* Wishlist <span className="text-sm">({wishlist.length} addresses)</span> */}
        </p>
      </div>
    </div>
  );
};

export default Page;
