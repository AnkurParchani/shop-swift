import { useState, useEffect } from "react";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import {
  useAddToWishlist,
  useGetMyWishlist,
  useRemoveFromWishlist,
} from "@/app/hooks/useWishlist";
import { WishlistItem } from "../../../../global";

const AddToWishlistBtn = ({ itemId }: { itemId: number }) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { data: wishlist } = useGetMyWishlist();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const isItemInWishlist =
    wishlist && wishlist.some((item: WishlistItem) => item.itemId === itemId);

  // Check if itemId is in the wishlist
  useEffect(() => {
    if (wishlist) {
      setIsAdded(isItemInWishlist);
    }
  }, [isItemInWishlist, wishlist]);

  // Handling the request according to the click
  function handleToggleItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();

    isItemInWishlist
      ? removeFromWishlistMutation.mutate(itemId, {
          onSuccess: () => setIsAdded(false),
        })
      : addToWishlistMutation.mutate(itemId, {
          onSuccess: () => setIsAdded(true),
        });
  }

  return (
    <div
      className="absolute right-0.5 top-0.5 z-20 text-2xl text-pink-600"
      onClick={handleToggleItem}
    >
      {isAdded ? <IoMdHeart /> : <CiHeart />}
    </div>
  );
};

export default AddToWishlistBtn;
