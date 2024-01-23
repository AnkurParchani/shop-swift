import { useRouter } from "next/navigation";
import EmptyList from "../components/others/EmptyList";

const EmptyOrders = () => {
  const router = useRouter();

  return (
    <div className="relative mx-auto max-w-5xl px-5 py-5">
      <EmptyList
        iconSrc="/icons/empty-order.svg"
        heading="No Orders Yet"
        description="It seems like you haven't placed any orders yet. Checkout from your cart to place your first order."
        backButton
        actionButtonTxt="My Cart"
        handleActionFn={() => router.push("/my-cart")}
      />
    </div>
  );
};

export default EmptyOrders;
