import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { CartItem } from "../../../global";

const PriceSummary = ({ cart }: { cart: CartItem[] }) => {
  const totalMRP = cart.reduce(
    (acc, cur) => cur.item.originalPrice * cur.quantity + acc,
    0,
  );
  const totalDiscount = cart.reduce(
    (acc, cur) =>
      (cur.item.originalPrice - cur.item.discountedPrice) * cur.quantity + acc,
    0,
  );

  const totalAmount = totalMRP - totalDiscount;

  return (
    <Card className="border-l-2 border-r-2 border-secondary bg-transparent">
      <CardHeader>
        <div className="flex w-full justify-between text-sm">
          <p className="font-semibold">Price Details</p>
          <p className=" font-semibold text-yellow-400">
            ({cart.length} {cart.length > 1 ? "Items" : "Item"})
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <p>Total MRP</p>
            <p>₹{totalMRP}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Total Discount</p>
            <p className="text-yellow-400">-₹{totalDiscount}</p>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex w-full justify-between text-base font-semibold text-green-500">
          <p>Total Amount</p>
          <p>₹{totalAmount}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PriceSummary;
