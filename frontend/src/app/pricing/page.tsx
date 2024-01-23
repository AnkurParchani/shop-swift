"use client";

import IncompleteDetails from "./IncompleteDetails";
import { Elements } from "@stripe/react-stripe-js";

import { useGetMyAddresses } from "../hooks/useAddress";
import { useGetMyCart } from "../hooks/useCart";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

const Page = () => {
  const { data: cart } = useGetMyCart();
  const { data: address } = useGetMyAddresses();

  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
  console.log(
    "Logging the publishable key ",
    process.env.STRIPE_PUBLISHABLE_KEY,
  );

  if (!cart || !cart.length || !address || !address.length)
    return <IncompleteDetails />;

  const options: StripeElementsOptions = {
    clientSecret: "",
    appearance: { theme: "stripe" },
  };

  return (
    <div>
      <Elements options={options} stripe={stripePromise}>
        <p>Hello</p>
      </Elements>
    </div>
  );
};

export default Page;
