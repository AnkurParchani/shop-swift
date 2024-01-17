import { useRouter } from "next/navigation";
import EmptyList from "../components/others/EmptyList";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <EmptyList
      iconSrc="/icons/empty-cart.svg"
      heading="Your Cart is Empty"
      description="Add items from your Wishlist or directly from seperate products"
      backButton
      actionButtonTxt="See my Wishlist"
      handleActionFn={() => router.push("/my-wishlist")}
    />
  );
};

export default EmptyCart;
