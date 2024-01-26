import React from "react";
import { CartItem } from "../../../global";
import { Card, CardBody } from "@nextui-org/react";

const ItemsSummary = ({
  cart,
  totalAmount,
}: {
  cart: CartItem[];
  totalAmount: number;
}) => {
  return (
    <Card>
      <CardBody className="flex flex-col gap-2 text-sm">
        <p>Total Items: {cart.length}</p>
        <p className="text-green-500">Total Amount: ₹{totalAmount}</p>
      </CardBody>
    </Card>
  );
};

export default ItemsSummary;
