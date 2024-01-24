import React from "react";
import { Review } from "../../../global";

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
  return <div>UpdateReviewModal</div>;
};

export default UpdateReviewModal;
