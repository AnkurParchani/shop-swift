import { useRouter } from "next/navigation";
import EmptyList from "../components/others/EmptyList";
import Footer from "../components/others/Footer";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <>
      <EmptyList
        iconSrc="/icons/empty-cart.svg"
        heading="Your Cart is Empty"
        description="Add items from your Wishlist or directly from seperate products"
        backButton
        actionButtonTxt="See my Wishlist"
        handleActionFn={() => router.push("/my-wishlist")}
      />

      <Footer />
    </>
  );
};

export default EmptyCart;
