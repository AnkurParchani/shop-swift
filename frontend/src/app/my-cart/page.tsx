"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";

import Image from "next/image";
import EmptyCart from "./EmptyCart";
import Loading from "../loading";

import { CartItem } from "../../../global";
import { useGetMyCart, useUpdateCart } from "../hooks/useCart";
import RemoveFromCartModal from "./RemoveFromCartModal";

const Page = () => {
  const { data: cart, isLoading, error } = useGetMyCart();
  const {
    isOpen: removeFromCartIsOpen,
    onOpen: removeFromCartOnOpen,
    onClose: removeFromCartOnClose,
    onOpenChange: removeFromCartOnOpenChange,
  } = useDisclosure();
  const [cartId, setCartId] = useState<number>(0);
  const updateCartMutation = useUpdateCart();

  if (isLoading) return <Loading />;

  if (cart.length === 0) return <EmptyCart />;

  const sortedCart = cart.sort((a: CartItem, b: CartItem) =>
    a.isChecked === b.isChecked ? 0 : a.isChecked ? -1 : 1,
  );

  // To mutate isChecked of cart item
  function handleToggleFromCheckout(
    e: React.ChangeEvent<HTMLInputElement>,
    cart: CartItem,
  ) {
    if (updateCartMutation.isPending) return;

    updateCartMutation.mutate({
      cartId: cart.id,
      data: { ...cart, isChecked: e.target.checked },
    });
  }

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-5">
        {sortedCart.map((cart: CartItem) => {
          const discount = Math.round(
            ((cart.item.originalPrice - cart.item.discountedPrice) /
              cart.item.originalPrice) *
              100,
          );
          const itemImgSrc = cart.item.images?.filter(
            (img) => img.isItemMainImg === true,
          )[0].path;

          return (
            <Card key={cart.id} className="relative">
              <div className="absolute left-2 top-1 z-20 scale-125">
                <input
                  type="checkbox"
                  onChange={(e) => handleToggleFromCheckout(e, cart)}
                  className="accent-yellow-500"
                  defaultChecked={cart.isChecked}
                />
              </div>

              <div
                onClick={() => {
                  setCartId(cart.id);
                  removeFromCartOnOpen();
                }}
                className="absolute right-1.5 top-1.5 z-20 rounded-full bg-red-500 p-0.5 text-sm"
              >
                <RxCross2 />
              </div>

              <CardBody
                className={`flex flex-row gap-3 ${
                  !cart.isChecked && "opacity-30"
                }`}
              >
                {itemImgSrc && (
                  <Image
                    alt="Item image"
                    height={1000}
                    src={itemImgSrc}
                    className="h-28 w-auto rounded-md"
                    width={1000}
                  />
                )}

                <div className="flex flex-col gap-0.5">
                  <p className="text-md font-semibold capitalize">
                    {cart.item.company}
                  </p>
                  <p className="text-xs text-default-500">{cart.item.name}</p>
                  <p className="mt-1 flex flex-col gap-1 text-xs">
                    <span>Quantity: {cart.quantity}</span>
                    {cart.size && (
                      <span className="capitalize">Size: {cart.size}</span>
                    )}
                    {cart.color && (
                      <span className="capitalize">Color: {cart.color}</span>
                    )}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-sm">
                    <span className="text-green-400">₹{cart.price}</span>
                    <span className="text-xs text-red-400 line-through">
                      ₹{cart.item.originalPrice * cart.quantity}
                    </span>
                    <span className="text-start text-xs text-primary">
                      ({discount}% OFF)
                    </span>
                  </p>
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <p>This is footer</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Confirmation modal for remove from cart */}
      {removeFromCartIsOpen && (
        <RemoveFromCartModal
          cartId={cartId}
          onClose={removeFromCartOnClose}
          isOpen={removeFromCartIsOpen}
          onOpenChange={removeFromCartOnOpenChange}
        />
      )}
    </>
  );
};

export default Page;
