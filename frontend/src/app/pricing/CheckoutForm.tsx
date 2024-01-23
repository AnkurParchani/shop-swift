import { useCheckout } from "../hooks/useCheckout";

const CheckoutForm = () => {
  const checkout = useCheckout();

  if (checkout.isLoading) return <p>Payment intent is loading... wait. </p>;

  console.log("Logging payment intent ", checkout.paymentIntent);
  return (
    <div>
      <p>Payment intent has been loaded</p>
      <p>CheckoutForm</p>
    </div>
  );
};

export default CheckoutForm;
