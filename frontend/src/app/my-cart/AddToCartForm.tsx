import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useAddToCart, useUpdateCart } from "../hooks/useCart";
import InputSelect from "../components/events/InputSelect";
import Image from "next/image";
import { CartItem, ExtraDetails, Item } from "../../../global";
import { useState } from "react";
import { toast } from "react-toastify";

type AddToCartFormType = {
  isOpen: boolean;
  selectedCartItem?: CartItem;
  itemDetails: Partial<Item>;
  onOpenChange: () => void;
  onClose: () => void;
};

const AddToCartForm = ({
  isOpen,
  onClose,
  itemDetails,
  selectedCartItem,
  onOpenChange,
}: AddToCartFormType) => {
  const addToCartMutation = useAddToCart();
  const updateCartMutation = useUpdateCart();

  const { maxOrderQuantity, size, colors } =
    itemDetails.extraDetails as ExtraDetails;
  const sizeArr = size.split(",");
  const mainImgSrc = itemDetails.images?.filter(
    (img) => img.isItemMainImg === true,
  )[0].path;

  const [cartDetails, setCartDetails] = useState({
    itemId: itemDetails.id,
    isChecked: selectedCartItem?.isChecked,
    size: selectedCartItem?.size || sizeArr[0],
    price: selectedCartItem?.price || itemDetails.discountedPrice,
    quantity: selectedCartItem?.quantity || 1,
    color: selectedCartItem?.color || (colors && colors[0].color) || undefined,
  });

  const handleAddToCart = () => {
    const { color, size, price, quantity, itemId } = cartDetails;
    if (!size || !price || !quantity || !itemId)
      return toast("Please provide all the details", { type: "warning" });

    if (!color && itemDetails.extraDetails?.colors)
      return toast("Please provide all the details", { type: "warning" });

    if (selectedCartItem) {
      updateCartMutation.mutate(
        { cartId: selectedCartItem.id, data: cartDetails },
        {
          onSuccess: () => {
            toast("Cart Item Updated", { type: "success" });
            onClose();
          },
        },
      );
    } else {
      addToCartMutation.mutate(cartDetails, {
        onSuccess: () => {
          toast("Item Added To Cart", { type: "success" });
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      classNames={{
        body: "py-2",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {selectedCartItem ? "Update Cart Item" : "Add To Cart"}
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
                  defaultSelectedKey={String(cartDetails.quantity)}
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

              {!selectedCartItem && (
                <Checkbox
                  color="warning"
                  defaultSelected={
                    cartDetails.isChecked ? cartDetails.isChecked : true
                  }
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
              )}
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
