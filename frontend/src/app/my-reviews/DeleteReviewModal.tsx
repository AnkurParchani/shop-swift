import React from "react";

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
  return <div>DeleteReviewModal</div>;
};

export default DeleteReviewModal;
