import { Button, useDisclosure } from "@nextui-org/react";
import { FaSort } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

import SortModal from "../modals/SortModal";
import FilterModal from "../modals/FilterModal";
import { Item } from "../../../../global";
import { useTheme } from "@/app/contexts/ThemeContext";

const FilterSortControls = ({ items }: { items: Item[] }) => {
  const { theme } = useTheme();
  const bgColor = theme.split("-")[1];
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
      <div className="flex justify-end gap-2 text-white">
        <Button
          onPress={sortOnOpen}
          variant="bordered"
          radius="lg"
          className={`border-content1-500 ${
            bgColor === "dark" ? "text-white" : "text-black"
          }`}
          size="sm"
        >
          Sort
          <FaSort />
        </Button>
        <Button
          onPress={filterOnOpen}
          variant="solid"
          radius="lg"
          className={`bg-content1-500 text-white`}
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
          items={items}
          isOpen={filterIsOpen}
          onClose={filterOnClose}
          onOpenChange={filterOnOpenChange}
        />
      )}
    </>
  );
};

export default FilterSortControls;
