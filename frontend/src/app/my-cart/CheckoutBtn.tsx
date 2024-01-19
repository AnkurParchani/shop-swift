import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { CartItem } from "../../../global";

type CheckoutBtnType = {
  cart: CartItem[];
};

const CheckoutBtn = ({ cart }: CheckoutBtnType) => {
  const router = useRouter();
  const itemsInCart = cart.length;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex flex-col gap-3 border-t-2 border-t-secondary bg-[#1b1b1b] px-4 py-3 text-center">
      <p className="text-sm">
        {itemsInCart} {itemsInCart > 1 ? "items" : "item"} selected for order
      </p>

      <Button
        variant="solid"
        onPress={() => router.push("/my-cart/addresses")}
        color="secondary"
      >
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutBtn;
