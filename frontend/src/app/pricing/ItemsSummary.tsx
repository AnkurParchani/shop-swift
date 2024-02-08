import React from "react";
import { CartItem } from "../../../global";
import { Card, CardBody } from "@nextui-org/react";
import { useTheme } from "../contexts/ThemeContext";

const ItemsSummary = ({
  cart,
  totalAmount,
}: {
  cart: CartItem[];
  totalAmount: number;
}) => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];

  return (
    <Card
      className={`border border-content1-500 bg-transparent ${
        bgTheme === "dark" ? "text-foreground" : "text-black"
      }`}
    >
      <CardBody className="flex flex-col gap-2 text-sm">
        <p>Total Items: {cart.length}</p>
        <p className="text-green-500">Total Amount: ₹{totalAmount}</p>
      </CardBody>
    </Card>
  );
};

export default ItemsSummary;
