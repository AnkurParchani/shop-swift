import { PaymentIntent } from "@stripe/stripe-js";
import { useState } from "react";
import newRequest from "../utils/newRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCheckout = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["payment-intent"],
    queryFn: async () => {
      try {
        const res = await newRequest.get("/stripe/payment-intent", {
          withCredentials: true,
        });

        return res.data.intent;
      } catch (err) {
        toast("Error from useCheckout mutation");
      }
    },
  });

  return { data, isLoading };
};
