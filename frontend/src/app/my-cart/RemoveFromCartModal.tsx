import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRemoveFromCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import { useAddToWishlist } from "../hooks/useWishlist";

type RemoveFromCartModalType = {
  isOpen: boolean;
  cartId: number;
  itemId: number;
  onOpenChange: () => void;
  onClose: () => void;
};

const RemoveFromCartModal = ({
  isOpen,
  onOpenChange,
  onClose,
  cartId,
  itemId,
}: RemoveFromCartModalType) => {
  const removeItemFromCartMutation = useRemoveFromCart();
  const addToWishlistMutation = useAddToWishlist();

  //   Removing from cart and sending to wishlist
  function handleSendToWishlist() {
    removeItemFromCartMutation.mutate(cartId, {
      onSuccess: () => {
        addToWishlistMutation.mutate(itemId, {
          onSuccess: () => {
            onClose();
          },
        });
        toast("Item moved to Wishlist", { type: "info" });
      },
    });
  }

  //   Removing from cart permanently
  function handleRemoveItemFromCart() {
    removeItemFromCartMutation.mutate(cartId, {
      onSuccess: () => {
        toast("Item removed Permanently", { type: "success" });
        onClose();
      },
    });
  }

  return (
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
              Remove this item from your cart?
            </ModalHeader>
            <ModalBody>
              <p>
                Don&apos;t worry, you can send it to your wishlist and retrieve
                it from there anytime
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={handleRemoveItemFromCart}
              >
                Permanently Remove
              </Button>
              <Button
                color="warning"
                variant="solid"
                onPress={handleSendToWishlist}
              >
                Send to Wishlist
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RemoveFromCartModal;
