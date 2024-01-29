import { useSearchParams } from "react-router-dom";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

const FilterModal = ({ isOpen, onClose, onOpenChange }: FilterModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return <div>FilterModal</div>;
};

export default FilterModal;
