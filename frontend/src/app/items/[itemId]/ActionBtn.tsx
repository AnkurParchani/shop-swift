import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { useAddToWishlist, useGetMyWishlist } from "@/app/hooks/useWishlist";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa6";
import { WishlistItem } from "../../../../global";

const ActionBtn = ({ itemId }: { itemId: string }) => {
  const router = useRouter();
  const { data: wishlist } = useGetMyWishlist();
  const addToWishlistMutation = useAddToWishlist();
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Checking if the item is already in the user's wishlist
  const isItemInWishlist =
    wishlist && wishlist.some((item: WishlistItem) => item.itemId === +itemId);

  // If item is then do setIsAdded(true)
  useEffect(() => {
    if (wishlist) setIsAdded(isItemInWishlist);
  }, [wishlist, isItemInWishlist]);

  function handleAddToWishlist() {
    addToWishlistMutation.mutate(+itemId, {
      onSuccess: () => setIsAdded(true),
    });
  }

  // JSX for add to cart and add to wishlist btn
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button color="primary" variant="solid">
        <CiShoppingCart style={{ fontSize: "25px" }} />
        Add to Cart
      </Button>

      {/* If the item is added then show button for "See my Wishlist" otherwise show "Add to Wishlist" */}
      {!isAdded ? (
        <Button
          onClick={handleAddToWishlist}
          color="primary"
          variant="flat"
          disabled={addToWishlistMutation.isPending}
        >
          <CiHeart style={{ fontSize: "25px" }} />
          {addToWishlistMutation.isPending ? "Adding..." : "Add to Wishlist"}
        </Button>
      ) : (
        <Button
          onClick={() => router.push("/my-wishlist")}
          color="primary"
          variant="bordered"
        >
          <FaHeart style={{ fontSize: "25px" }} />
          See my Wishlist
        </Button>
      )}
    </div>
  );
};

export default ActionBtn;
