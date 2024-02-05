import React, { useState } from "react";
import { Review } from "../../../global";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useUpdateReview } from "../hooks/useReviews";
import InputSelect from "../components/events/InputSelect";
import { toast } from "react-toastify";

type UpdateReviewProps = {
  isOpen: boolean;
  review: Review;
  onClose: () => void;
  onOpenChange: () => void;
};

const UpdateReviewModal = ({
  isOpen,
  review,
  onClose,
  onOpenChange,
}: UpdateReviewProps) => {
  const [reviewData, setReviewData] = useState<Review>(review);
  const updateReviewMutation = useUpdateReview();

  function handleUpdateReveiw() {
    updateReviewMutation.mutate(
      { reviewId: reviewData.id, review: reviewData },
      {
        onSuccess: () => {
          toast("Your review has been updated", { type: "success" });
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
              Update Review
            </ModalHeader>
            <ModalBody>
              <InputSelect
                variant="bordered"
                label="Select Star(s)"
                defaultSelectedKey={reviewData.stars}
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
                isDisabled={updateReviewMutation.isPending}
                color="danger"
                variant="solid"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                isLoading={updateReviewMutation.isPending}
                disabled={updateReviewMutation.isPending}
                color="success"
                className="text-white"
                type="submit"
                onClick={handleUpdateReveiw}
              >
                {updateReviewMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdateReviewModal;
