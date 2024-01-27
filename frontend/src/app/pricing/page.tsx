"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";

import IncompleteDetails from "./IncompleteDetails";
import BreadCrumb from "../components/others/BreadCrumb";
import CheckoutForm from "./CheckoutForm";
import newRequest from "../utils/newRequest";
import ItemsSummary from "./ItemsSummary";

import { CartItem } from "../../../global";
import { useGetMyCart } from "../hooks/useCart";
import { useGetMyAddresses } from "../hooks/useAddress";
import { handleApiError } from "../utils/handleApiError";
import { useBreadcrumb } from "../components/others/BreadCrumbProvider";

const Page = () => {
  const { data: cart } = useGetMyCart();
  const { data: address } = useGetMyAddresses();
  const { setPrevPages } = useBreadcrumb();
  const [clientSecret, setClientSecret] = useState("");
  const [checkoutIsLoading, setCheckoutIsLoading] = useState(true);

  const checkoutCart =
    cart && cart.filter((cartItem: CartItem) => cartItem.isChecked === true);
  const totalAmount =
    checkoutCart &&
    checkoutCart.reduce((acc: number, cur: CartItem) => cur.price + acc, 0);

  useEffect(() => {
    // Fetch the client secret from your server using Axios
    async function checkout() {
      try {
        if (!totalAmount) return;

        const res = await newRequest.post("/stripe/payment-intent", {
          totalAmount,
        });

        if (res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
          setCheckoutIsLoading(false);
        }
      } catch (err) {
        return handleApiError(err);
      }
    }

    checkout();
  }, [totalAmount]);

  // Setting the breadcrumb previous pages
  useEffect(() => {
    setPrevPages([
      { label: "Cart", link: "/my-cart" },
      { label: "Addresses", link: "/my-cart/addresses" },
    ]);
  }, [setPrevPages]);

  if (!cart || !cart.length || !address || !address.length)
    return <IncompleteDetails />;

  if (checkoutIsLoading) return <p>Client secret loading...</p>;

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  const options: StripeElementsOptions = {
    appearance: { theme: "night" },
    clientSecret,
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-5">
      <BreadCrumb curPage="Pricing" size="sm" />

      <ItemsSummary totalAmount={totalAmount} cart={checkoutCart} />

      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm cart={checkoutCart} />
      </Elements>
    </div>
  );
};

export default Page;
