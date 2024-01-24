import { useEffect } from "react";
import { useCheckout } from "../hooks/useCheckout";
import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const { data, isLoading } = useCheckout();

  if (isLoading) return <p>Form is loading</p>;

  return (
    <form>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement />
    </form>
  );
};

export default CheckoutForm;
