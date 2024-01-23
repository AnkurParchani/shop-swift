import { PaymentIntent } from "@stripe/stripe-js";
import { useState } from "react";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null,
  );

  useQuery({
    queryFn: async () => {
      const intent = (await newRequest(
        "/stripe/payment-intent",
      )) as PaymentIntent;

      setPaymentIntent(intent);
      setIsLoading(false);
    },
    queryKey: ["payment-intent"],
  });

  return { isLoading, paymentIntent };
};
