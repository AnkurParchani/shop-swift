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
import { ExtraDetails, Item } from "../../../global";
import { useState } from "react";
import { toast } from "react-toastify";

type AddToCartFormType = {
  isOpen: boolean;
  itemDetails: Partial<Item>;
  onOpenChange: () => void;
  onClose: () => void;
};

const AddToCartForm = ({
  isOpen,
  onClose,
  itemDetails,
  onOpenChange,
}: AddToCartFormType) => {
  const addToCartMutation = useAddToCart();

  const { maxOrderQuantity, size, colors } =
    itemDetails.extraDetails as ExtraDetails;
  const sizeArr = size.split(",");
  const mainImgSrc = itemDetails.images?.filter(
    (img) => img.isItemMainImg === true,
  )[0].path;

  const [cartDetails, setCartDetails] = useState({
    isChecked: true,
    size: sizeArr[0],
    price: itemDetails.discountedPrice,
    itemId: itemDetails.id,
    quantity: 1,
    color: (colors && colors[0].color) || undefined,
  });

  const handleAddToCart = () => {
    const { color, size, price, quantity, itemId } = cartDetails;
    if (!size || !price || !quantity || !itemId)
      return toast("Please provide all the details", { type: "warning" });

    if (!color && itemDetails.extraDetails?.colors)
      return toast("Please provide all the details", { type: "warning" });

    addToCartMutation.mutate(cartDetails, {
      onSuccess: () => {
        toast("Item Added To Cart", { type: "success" });
        onClose();
      },
    });
  };

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
              <p className="text-sm font-normal text-green-500">
                Total Amount: ₹
                {itemDetails.discountedPrice! * cartDetails.quantity}
              </p>
            </ModalHeader>
            <ModalBody>
              {mainImgSrc && (
                <Image
                  className="mx-auto h-auto w-24 rounded-md"
                  height={1000}
                  width={1000}
                  src={mainImgSrc}
                  alt="Item Image"
                />
              )}

              {maxOrderQuantity && (
                <InputSelect
                  defaultSelectedKey="1"
                  variant="bordered"
                  size="sm"
                  label="Select Quantity"
                  options={Array.from({ length: maxOrderQuantity }, (_, i) => {
                    return { label: String(i + 1), value: String(i + 1) };
                  })}
                  onChange={(e) =>
                    setCartDetails({
                      ...cartDetails,
                      quantity: +e.target.value,
                      price: +e.target.value * itemDetails.discountedPrice!,
                    })
                  }
                />
              )}

              {size && (
                <InputSelect
                  variant="bordered"
                  size="sm"
                  defaultSelectedKey={cartDetails.size}
                  label="Select Size"
                  options={sizeArr.map((size) => {
                    return { label: size.toUpperCase(), value: size };
                  })}
                  onChange={(e) =>
                    setCartDetails({ ...cartDetails, size: e.target.value })
                  }
                />
              )}

              {colors && (
                <InputSelect
                  variant="bordered"
                  size="sm"
                  label="Select Color"
                  defaultSelectedKey={cartDetails.color}
                  options={colors.map((color) => {
                    return { label: color.color, value: color.color };
                  })}
                  onChange={(e) =>
                    setCartDetails({ ...cartDetails, color: e.target.value })
                  }
                />
              )}

              <Checkbox
                color="warning"
                defaultSelected={true}
                size="sm"
                onChange={(e) =>
                  setCartDetails({
                    ...cartDetails,
                    isChecked: e.target.checked,
                  })
                }
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
