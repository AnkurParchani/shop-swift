import React from "react";
import { useDeleteReview } from "../hooks/useReviews";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

type DeleteReviewProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  reviewId: number;
  onClose: () => void;
};

const DeleteReviewModal = ({
  isOpen,
  onOpenChange,
  reviewId,
  onClose,
}: DeleteReviewProps) => {
  const deleteReviewMutation = useDeleteReview();

  function handleDeleteReview() {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        toast("Your Review has been deleted", { type: "success" });
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
              Are you sure you want to delete this Review?
            </ModalHeader>
            <ModalBody>
              <p>Note:- You won&apos;t be able to recover this data</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="danger"
                variant="solid"
                onPress={handleDeleteReview}
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

export default DeleteReviewModal;
