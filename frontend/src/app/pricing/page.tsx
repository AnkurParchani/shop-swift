"use client";

import IncompleteDetails from "./IncompleteDetails";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { useGetMyAddresses } from "../hooks/useAddress";
import { useGetMyCart } from "../hooks/useCart";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useCheckout } from "../hooks/useCheckout";

const Page = () => {
  const { data: paymentIntent, isLoading } = useCheckout();
  const { data: cart } = useGetMyCart();
  const { data: address } = useGetMyAddresses();

  if (!cart || !cart.length || !address || !address.length)
    return <IncompleteDetails />;

  if (isLoading) return <p>stripe payment intent loading</p>;

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  const options: StripeElementsOptions = {
    clientSecret: paymentIntent.client_secret,
    appearance: { theme: "stripe" },
  };

  return (
    <div>
      <Elements options={options} stripe={stripePromise}>
        <p>Hello</p>
        <LinkAuthenticationElement />
        <PaymentElement />
      </Elements>
    </div>
  );
};

export default Page;
