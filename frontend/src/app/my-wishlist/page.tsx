"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import WishlistItemCard from "./WishlistItemCard";
import EmptyWishlist from "./EmptyWishlist";
import Loading from "../loading";

import { useClearFullWishlist, useGetMyWishlist } from "../hooks/useWishlist";
import { WishlistItem } from "../../../global";

const Page = () => {
  const { data: wishlist, isLoading, error } = useGetMyWishlist();
  const clearWishlistMutation = useClearFullWishlist();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoading) return <Loading />;
  if (wishlist.length === 0) return <EmptyWishlist />;

  function handleClearWishlist() {
    clearWishlistMutation.mutate();
  }

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
        <div className="flex justify-between">
          <p className="flex items-center gap-1 text-lg font-semibold text-primary">
            Wishlist <span className="text-sm">({wishlist.length} items)</span>
          </p>

          <Button
            radius="full"
            size="sm"
            variant="ghost"
            color="danger"
            className="font-bold uppercase"
            onClick={onOpen}
          >
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-10">
          {wishlist.map((item: WishlistItem) => (
            <WishlistItemCard key={item.id} item={item.item} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          body: "py-2",
          base: "bg-gray-900 dark:bg-gray-900 text-[#a8b0d3]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to clear your whole Wishlist?
              </ModalHeader>
              <ModalBody>
                <p>You won&apos;t be able to retrieve back this data</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  variant="solid"
                  onPress={() => {
                    handleClearWishlist();
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Page;
