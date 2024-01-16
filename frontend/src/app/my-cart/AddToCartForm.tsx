type AddToCartFormType = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};

const AddToCartForm = ({
  isOpen,
  onClose,
  onOpenChange,
}: AddToCartFormType) => {
  return <div>AddToCartForm</div>;
};

export default AddToCartForm;
