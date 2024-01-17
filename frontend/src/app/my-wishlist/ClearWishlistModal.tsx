import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useClearFullWishlist } from "../hooks/useWishlist";

type ClearWishlistModalType = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const ClearWishlistModal = ({
  isOpen,
  onOpenChange,
}: ClearWishlistModalType) => {
  const clearWishlistMutation = useClearFullWishlist();

  function handleClearWishlist() {
    clearWishlistMutation.mutate();
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
  );
};

export default ClearWishlistModal;
