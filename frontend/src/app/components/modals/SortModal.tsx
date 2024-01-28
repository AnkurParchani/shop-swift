import { MouseEventHandler } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";

// Sort Modal
function SortModal({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSortClick(sortOption: string) {
    if (sortOption === "none") {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ sort: sortOption });
    }

    onClose();
  }

  return (
    <Modal
      className="bg-[#333]"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="text-danger">Sort According to:</ModalHeader>
        <ModalBody>
          <SortModalBtn onClick={() => handleSortClick("price-high")}>
            Price: High to low
          </SortModalBtn>
          <SortModalBtn onClick={() => handleSortClick("price-low")}>
            Price: Low to high
          </SortModalBtn>
          <SortModalBtn onClick={() => handleSortClick("discount-high")}>
            Discount: High to low
          </SortModalBtn>
          <SortModalBtn onClick={() => handleSortClick("discount-low")}>
            Discount: Low to high
          </SortModalBtn>
          <SortModalBtn onClick={() => handleSortClick("none")}>
            None
          </SortModalBtn>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SortModal;

// Sort Modal Button
function SortModalBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick:
    | MouseEventHandler<HTMLButtonElement>
    | ((sortOption: string) => void);
}) {
  return (
    <Button
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      className="border-2 bg-transparent"
      radius="sm"
    >
      {children}
    </Button>
  );
}
