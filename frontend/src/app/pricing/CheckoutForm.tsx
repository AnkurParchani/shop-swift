import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormEvent } from "react";
import { Button } from "@nextui-org/react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CartItem } from "../../../global";
import { useCreateOrder } from "../hooks/useOrders";

const CheckoutForm = ({ cart }: { cart: CartItem[] }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const createOrderMutation = useCreateOrder();

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

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.error(error);
      toast("Payment failed. Please try again.", { type: "error" });
    } else {
      toast("Payment successful", { type: "success" });
      createOrderMutation.mutate({ orders });
      router.push("/my-orders");
    }
  };

  return (
    <form
      onSubmit={handlePaymentSubmit}
      action=""
      className="flex flex-col gap-3 rounded-md border-x-3 border-primary p-3"
    >
      <LinkAuthenticationElement />
      <PaymentElement />
      <Button className="mt-2" color="primary" type="submit">
        Buy now
      </Button>
    </form>
  );
};

export default CheckoutForm;
