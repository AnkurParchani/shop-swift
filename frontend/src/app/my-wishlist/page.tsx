"use client";
import { Button, useDisclosure } from "@nextui-org/react";

import WishlistItemCard from "./WishlistItemCard";
import EmptyWishlist from "./EmptyWishlist";
import Loading from "../loading";
import ClearWishlistModal from "./ClearWishlistModal";
import BreadCrumb from "../components/others/BreadCrumb";
import Error from "../error";
import Footer from "../components/others/Footer";

import { useGetMyWishlist } from "../hooks/useWishlist";
import { WishlistItem } from "../../../global";
import { useRouter } from "next/navigation";
import { useBreadcrumb } from "../contexts/BreadCrumbProvider";

const Page = () => {
  const router = useRouter();
  const { setPrevPages } = useBreadcrumb();
  const { data: wishlist, isLoading, error, refetch } = useGetMyWishlist();
  const {
    isOpen: clearWishlistIsOpen,
    onOpen: clearWishlistOnOpen,
    onOpenChange: clearWishlistOnOpenChange,
  } = useDisclosure();

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} reset={refetch} />;
  if (wishlist.length === 0) return <EmptyWishlist />;

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-5">
        <div className="flex justify-between">
          <p className="flex items-center gap-1 text-lg font-semibold text-content1-400">
            Wishlist <span className="text-sm">({wishlist.length} items)</span>
          </p>

          <div className="flex gap-2">
            <Button
              radius="full"
              size="sm"
              variant="ghost"
              color="danger"
              className="font-bold uppercase"
              onClick={clearWishlistOnOpen}
            >
              Clear
            </Button>
            <Button
              radius="full"
              size="sm"
              variant="solid"
              className="border-2 border-content1-800 bg-content1-200"
              onClick={() => {
                setPrevPages([{ label: "Wishlist", link: "/my-wishlist" }]);
                router.push("/my-cart");
              }}
            >
              My Cart
            </Button>
          </div>
        </div>

        <BreadCrumb curPage="Wishlist" />

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-10 md:grid-cols-4 lg:grid-cols-5">
          {wishlist.map((item: WishlistItem) => (
            <WishlistItemCard key={item.id} item={item.item} />
          ))}
        </div>
      </div>

      {/* Modal for confirmation of clearing whole cart */}
      {clearWishlistIsOpen && (
        <ClearWishlistModal
          isOpen={clearWishlistIsOpen}
          onOpenChange={clearWishlistOnOpenChange}
        />
      )}

      <Footer />
    </>
  );
};

export default Page;
