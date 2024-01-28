"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import SortModal from "../modals/SortModal";

const FilterSortControls = () => {
  const {
    isOpen: sortIsOpen,
    onOpen: sortOnOpen,
    onClose: sortOnClose,
    onOpenChange: sortOnOpenChange,
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
        </Button>
        <Button size="sm">Filter</Button>
      </div>

      {sortIsOpen && (
        <SortModal
          isOpen={sortIsOpen}
          onClose={sortOnClose}
          onOpenChange={sortOnOpenChange}
        />
      )}
    </>
  );
};

export default FilterSortControls;
