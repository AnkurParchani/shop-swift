import { Button, useDisclosure } from "@nextui-org/react";
import { FaSort } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

import SortModal from "../modals/SortModal";
import FilterModal from "../modals/FilterModal";

const FilterSortControls = () => {
  const {
    isOpen: sortIsOpen,
    onOpen: sortOnOpen,
    onClose: sortOnClose,
    onOpenChange: sortOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: filterIsOpen,
    onOpen: filterOnOpen,
    onClose: filterOnClose,
    onOpenChange: filterOnOpenChange,
  } = useDisclosure();

  return (
    <>
      <div className="flex justify-end gap-2">
        <Button
          onPress={sortOnOpen}
          variant="bordered"
          radius="lg"
          color="primary"
          size="sm"
        >
          Sort
          <FaSort />
        </Button>
        <Button
          onPress={filterOnOpen}
          variant="solid"
          radius="lg"
          color="primary"
          size="sm"
        >
          Filter
          <FaFilter />
        </Button>
      </div>

      {sortIsOpen && (
        <SortModal
          isOpen={sortIsOpen}
          onClose={sortOnClose}
          onOpenChange={sortOnOpenChange}
        />
      )}

      {filterIsOpen && (
        <FilterModal
          isOpen={filterIsOpen}
          onClose={filterOnClose}
          onOpenChange={filterOnOpenChange}
        />
      )}
    </>
  );
};

export default FilterSortControls;
