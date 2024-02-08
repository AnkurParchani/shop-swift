import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { CartItem } from "../../../global";
import { useTheme } from "../contexts/ThemeContext";

type CheckoutBtnType = {
  cart: CartItem[];
};

const CheckoutBtn = ({ cart }: CheckoutBtnType) => {
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const router = useRouter();
  const itemsInCart = cart.length;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 flex flex-col gap-3 border-t-2 border-t-content1-400  px-4 py-3 text-center ${
        bgTheme === "dark" ? "bg-background" : "bg-foreground"
      }`}
    >
      <p className="text-sm">
        {itemsInCart} {itemsInCart > 1 ? "items" : "item"} selected for order
      </p>

      <Button
        variant="solid"
        onPress={() => router.push("/my-cart/addresses")}
        className="bg-content1-400 text-white"
      >
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutBtn;
