import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import InputSelect from "../components/events/InputSelect";
import { useAddReview } from "../hooks/useReviews";
import { toast } from "react-toastify";

type AddReviewType = {
  isOpen: boolean;
  itemId: number;
  onClose: () => void;
  onOpenChange: () => void;
};

const AddReviewModal = ({
  isOpen,
  onClose,
  onOpenChange,
  itemId,
}: AddReviewType) => {
  const [reviewData, setReviewData] = useState({ stars: "1", content: "" });
  const addReviewMutation = useAddReview();

  function handleAddReview() {
    addReviewMutation.mutate(
      { ...reviewData, itemId },
      {
        onSuccess: () => {
          toast("Review Added", { type: "success" });
          onClose();
        },
      },
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      classNames={{
        base: "bg-[#1b1b1b] dark:bg-[#1b1b1b] text-white",
        body: "text-white",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Review
            </ModalHeader>
            <ModalBody>
              <InputSelect
                variant="bordered"
                label="Select star(s)"
                defaultSelectedKey={"1"}
                placeholder="Select your Review Stars"
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
                onChange={(e) =>
                  setReviewData({ ...reviewData, stars: e.target.value })
                }
              />

              <Textarea
                label="Review"
                placeholder="Your review"
                defaultValue={reviewData.content}
                onChange={(e) =>
                  setReviewData({ ...reviewData, content: e.target.value })
                }
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={addReviewMutation.isPending}
                color="danger"
                variant="solid"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                isLoading={addReviewMutation.isPending}
                disabled={addReviewMutation.isPending}
                color="success"
                className="text-white"
                type="submit"
                onClick={handleAddReview}
              >
                {addReviewMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddReviewModal;
