import { useRouter } from "next/navigation";
import EmptyList from "../components/others/EmptyList";

const EmptyReviews = () => {
  const router = useRouter();

  return (
    <div className="relative mx-auto max-w-5xl px-5 py-5">
      <EmptyList
        iconSrc="/icons/empty-review.svg"
        heading="Order products to review them..."
        description="If you've already ordered an item, you can review it from your orders page"
        backButton
        actionButtonTxt="My Orders"
        handleActionFn={() => router.push("/my-orders")}
      />
    </div>
  );
};

export default EmptyReviews;
