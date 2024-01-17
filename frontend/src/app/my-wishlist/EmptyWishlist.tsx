import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import EmptyList from "../components/others/EmptyList";

const EmptyWishlist = () => {
  const router = useRouter();
  return (
    <div className="relative mx-auto max-w-5xl px-5 py-5">
      <div className="absolute right-3 top-3">
        <Button
          radius="full"
          size="sm"
          variant="solid"
          color="secondary"
          className="font-semibold"
          onClick={() => router.push("/my-cart")}
        >
          My Cart
        </Button>
      </div>

      <EmptyList
        iconSrc="/icons/empty-wishlist.svg"
        heading="Your Wishlist is empty"
        description="Add items that you like to your wishlist. Review them anytime and easily move them to the bag."
        backButton
        actionButtonTxt="Keep Shopping"
        handleActionFn={() => router.push("/")}
      />
    </div>
  );
};

export default EmptyWishlist;
