import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
} from "@nextui-org/react";

import InputSelect from "../events/InputSelect";

import { Item } from "../../../../global";

type FilterModalProps = {
  items: Item[];
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
};

const FilterModal = ({
  isOpen,
  onClose,
  onOpenChange,
  items,
}: FilterModalProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories =
    items &&
    items.map(
      (item) => item.category.charAt(0).toUpperCase() + item.category.slice(1),
    );

  const initialFilterOptions = {
    gender: "",
    category: "",
    priceRange: { min: 600, max: 4000 },
  };
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const [sliderKey, setSliderKey] = useState(0);
  const {
    gender,
    category,
    priceRange: { min, max },
  } = filterOptions;

  // Reseting all the filters
  function handleResetFilters() {
    setSliderKey((prev) => prev + 1);
    setFilterOptions(initialFilterOptions);
  }

  // Changing params according to the filter
  function handleSetFilter() {
    console.log(filterOptions);
    // if (!min || !max) return;
    // const prevSearchParams = Object.fromEntries(searchParams);

    // if (gender) prevSearchParams.gender = gender;
    // else delete prevSearchParams.gender;

    // if (category) prevSearchParams.category = category;
    // else delete prevSearchParams.category;

    // setSearchParams({
    //   ...prevSearchParams,
    //   min: min.toString(),
    //   max: max.toString(),
    // });
  }

  return (
    <Modal
      className="bg-[#333]"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-1 text-danger">
          <FaFilter />
          Filter
        </ModalHeader>
        <ModalBody className="flex flex-col gap-3 text-white">
          <InputSelect
            label="Gender"
            key={`gender-${gender}`}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Unisex", value: "unisex" },
            ]}
            variant="bordered"
            defaultSelectedKey={gender}
            placeholder="Select a Gender"
            size="sm"
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, gender: e.target.value })
            }
          />
          <InputSelect
            label="Category"
            key={`category-${category}`}
            options={categories.map((category) => {
              return { label: category, value: category.toLowerCase() };
            })}
            variant="bordered"
            defaultSelectedKey={category}
            placeholder="Select a Category of Item"
            size="sm"
            onChange={(e) =>
              setFilterOptions({ ...filterOptions, category: e.target.value })
            }
          />
          <Slider
            label="Price Range"
            key={sliderKey}
            size="sm"
            step={200}
            minValue={0}
            showTooltip={true}
            maxValue={10000}
            defaultValue={[min, max]}
            formatOptions={{ style: "currency", currency: "INR" }}
            className="max-w-md"
            color="danger"
            // @ts-ignore
            onChange={([min, max]: number[]) => {
              setFilterOptions({ ...filterOptions, priceRange: { min, max } });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={handleResetFilters}
            color="secondary"
            variant="solid"
            radius="sm"
          >
            Reset
          </Button>
          <Button
            onPress={handleSetFilter}
            color="success"
            variant="solid"
            radius="sm"
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
