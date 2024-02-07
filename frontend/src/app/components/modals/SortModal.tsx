import { MouseEventHandler } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { FaSort } from "react-icons/fa";

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
  const currentSort = searchParams.get("sort");

  // Changing the sort query paramter
  function handleSortClick(sortOption: string) {
    const prevSearchParams = Object.fromEntries(searchParams);

    if (sortOption === "none") {
      searchParams.delete("sort");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...prevSearchParams, sort: sortOption });
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
        <ModalHeader className="text-content1-700 flex items-center gap-1">
          <FaSort />
          Sort
        </ModalHeader>
        <ModalBody>
          <SortModalBtn
            currentlySelected={currentSort === "price-high"}
            onClick={() => handleSortClick("price-high")}
          >
            Price: High to low
          </SortModalBtn>

          <SortModalBtn
            currentlySelected={currentSort === "price-low"}
            onClick={() => handleSortClick("price-low")}
          >
            Price: Low to high
          </SortModalBtn>

          <SortModalBtn
            currentlySelected={currentSort === "ratings-high"}
            onClick={() => handleSortClick("ratings-high")}
          >
            Ratings: High to low
          </SortModalBtn>

          <SortModalBtn
            currentlySelected={currentSort === "ratings-low"}
            onClick={() => handleSortClick("ratings-low")}
          >
            Ratings: Low to high
          </SortModalBtn>

          <SortModalBtn
            currentlySelected={currentSort === null}
            onClick={() => handleSortClick("none")}
          >
            None
          </SortModalBtn>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

// Sort Modal Button
function SortModalBtn({
  children,
  onClick,
  currentlySelected,
}: {
  children: React.ReactNode;
  onClick:
    | MouseEventHandler<HTMLButtonElement>
    | ((sortOption: string) => void);

  currentlySelected: boolean;
}) {
  return (
    <Button
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      className={`border-2 bg-transparent ${
        currentlySelected ? "text-danger" : "text-white"
      }`}
      radius="sm"
    >
      {children}
    </Button>
  );
}

export default SortModal;
