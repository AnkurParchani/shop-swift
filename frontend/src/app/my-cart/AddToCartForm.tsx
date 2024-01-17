import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAddToCart } from "../hooks/useCart";
import InputSelect from "../components/events/InputSelect";
import Image from "next/image";

type AddToCartFormType = {
  isOpen: boolean;
  imgSrc: string;
  onOpenChange: () => void;
  onClose: () => void;
};

const AddToCartForm = ({
  isOpen,
  imgSrc,
  onClose,
  onOpenChange,
}: AddToCartFormType) => {
  const addToCartMutation = useAddToCart();

  const handleAddToCart = () => {};

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      classNames={{
        base: "bg-[#1b1b1b] dark:bg-[#1b1b1b] text-white",
        body: "text-white",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add To Cart
            </ModalHeader>
            <ModalBody>
              {imgSrc && (
                <Image
                  className="mx-auto h-auto w-24 rounded-md"
                  height={1000}
                  width={1000}
                  src={imgSrc}
                  alt="Item Image"
                />
              )}
              <InputSelect
                variant="bordered"
                size="sm"
                label="Select Quantity"
                options={[
                  { label: 1, value: 1 },
                  { label: 2, value: 2 },
                  { label: 3, value: 3 },
                ]}
              />

              <InputSelect
                variant="bordered"
                size="sm"
                label="Select Size"
                options={[
                  { label: 1, value: 1 },
                  { label: 2, value: 2 },
                  { label: 3, value: 3 },
                ]}
              />

              <InputSelect
                variant="bordered"
                size="sm"
                label="Select Color"
                options={[
                  { label: 1, value: 1 },
                  { label: 2, value: 2 },
                  { label: 3, value: 3 },
                ]}
              />

              <Checkbox
                // onChange={(e) =>
                //   setAddressData({
                //     ...addressData,
                //     isDeliveryAddress: e.target.checked,
                //   })
                // }
                color="warning"
                defaultSelected={true}
              >
                <span className="text-sm text-yellow-500">
                  Include in Total
                </span>
              </Checkbox>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={addToCartMutation.isPending}
                color="danger"
                variant="solid"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                isLoading={addToCartMutation.isPending}
                disabled={addToCartMutation.isPending}
                color="success"
                className="text-white"
                type="submit"
                onClick={handleAddToCart}
              >
                {addToCartMutation.isPending ? "Adding..." : "Add"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddToCartForm;
