import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { Button } from "@nextui-org/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CartItem } from "../../../global";
import { useCreateOrder } from "../hooks/useOrders";
import { useTheme } from "../contexts/ThemeContext";

const CheckoutForm = ({ cart }: { cart: CartItem[] }) => {
  const [paymentIsLoading, setPaymentIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const createOrderMutation = useCreateOrder();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];

  const orders = cart.map((cartItem) => {
    const { itemId, quantity, color, size } = cartItem;

    return {
      itemId,
      quantity,
      ...(color && { color }),
      ...(size && { size }),
    };
  });

  const handlePaymentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setPaymentIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.error(error);
      toast("Payment failed. Please try again.", { type: "error" });
    } else {
      createOrderMutation.mutate({ orders });
    }

    setPaymentIsLoading(false);
  };

  return (
    <form
      onSubmit={handlePaymentSubmit}
      className={`flex flex-col gap-3 rounded-md border-x-3 border-content1-500 p-3 ${
        bgTheme !== "dark" && "bg-content1-700 "
      }`}
    >
      <PaymentElement className="rounded-sm" />

      <Button
        disabled={createOrderMutation.isPending || paymentIsLoading}
        className={`mt-2 ${
          bgTheme === "dark" ? "bg-content1-500" : "bg-green-600"
        } text-white`}
        type="submit"
      >
        {createOrderMutation.isPending || paymentIsLoading
          ? "Processing payment..."
          : "Buy now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
