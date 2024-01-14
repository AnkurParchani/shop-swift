"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyWishlist } from "../services/apiWishlist";
import Loading from "../loading";
import EmptyWishlist from "./EmptyWishlist";
import { useGetMyWishlist } from "../hooks/useWishlist";
import { WishlistItem } from "../../../global";

const Page = () => {
  const { data: wishlist, isLoading, error } = useGetMyWishlist();

  if (isLoading) return <Loading />;
  if (wishlist.length === 0) return <EmptyWishlist />;

  return (
    <div>
      {wishlist.map((item: WishlistItem) => {
        return <p key={item.id}>This is a wishlist item</p>;
      })}
    </div>
  );
};

export default Page;
