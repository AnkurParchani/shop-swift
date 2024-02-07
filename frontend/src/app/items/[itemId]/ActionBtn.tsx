import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { useAddToWishlist, useGetMyWishlist } from "@/app/hooks/useWishlist";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa6";
import { CartItem, ExtraDetails, Item, WishlistItem } from "../../../../global";
import { useGetMyCart } from "@/app/hooks/useCart";
import AddToCartForm from "@/app/my-cart/AddToCartForm";
import { useTheme } from "@/app/contexts/ThemeContext";

type ActionBtnType = {
  itemId: string;
  itemDetails: Partial<Item>;
};

const ActionBtn = ({ itemId, itemDetails }: ActionBtnType) => {
  const router = useRouter();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
  const [isAddedInWishlist, setIsAddedInWishlist] = useState<boolean>(false);
  const [isAddedInCart, setIsAddedInCart] = useState<boolean>(false);
  const { data: wishlist } = useGetMyWishlist();
  const { data: cart } = useGetMyCart();
  const addToWishlistMutation = useAddToWishlist();
  const {
    isOpen: addToCartIsOpen,
    onOpen: addToCartOnOpen,
    onClose: addToCartOnClose,
    onOpenChange: addToCartOnOpenChange,
  } = useDisclosure();

  // Checking if the item is already in the user's wishlist
  const isItemInWishlist =
    wishlist && wishlist.some((item: WishlistItem) => item.itemId === +itemId);

  // Checking if the item is already in user's cart
  const isItemInCart =
    cart && cart.some((cart: CartItem) => cart.itemId === +itemId);

  // If item is in wishlist then do setIsAddedInWishlist(true)
  useEffect(() => {
    if (wishlist) setIsAddedInWishlist(isItemInWishlist);
  }, [wishlist, isItemInWishlist]);

  // If item is in cart then do setIsItemInCart(true)
  useEffect(() => {
    if (cart) setIsAddedInCart(isItemInCart);
  }, [cart, isItemInCart]);

  // Handler function to add item in wishlist
  function handleAddToWishlist() {
    addToWishlistMutation.mutate(+itemId, {
      onSuccess: () => setIsAddedInWishlist(true),
    });
  }

  // JSX for add to cart and add to wishlist btn
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {/* If the item is added in cart the show button for "See my Cart" otherwise show "Add to Cart" */}
        {!isAddedInCart ? (
          <Button
            onPress={addToCartOnOpen}
            className="bg-content1-500 text-white"
            variant="solid"
          >
            <CiShoppingCart style={{ fontSize: "25px" }} />
            Add to Cart
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/my-cart")}
            color="warning"
            variant="solid"
          >
            <CiShoppingCart style={{ fontSize: "25px" }} />
            See my Cart
          </Button>
        )}

        {/* If the item is added then show button for "See my Wishlist" otherwise show "Add to Wishlist" */}
        {!isAddedInWishlist ? (
          <Button
            onClick={handleAddToWishlist}
            className={`border border-content1-400 bg-transparent ${
              bgTheme === "dark" ? "text-foreground" : "text-background"
            }`}
            variant="flat"
            disabled={addToWishlistMutation.isPending}
          >
            <CiHeart style={{ fontSize: "25px" }} />
            {addToWishlistMutation.isPending ? "Adding..." : "Add to Wishlist"}
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/my-wishlist")}
            className="border border-pink-500 bg-transparent text-pink-500"
            variant="bordered"
          >
            <FaHeart style={{ fontSize: "25px" }} />
            See my Wishlist
          </Button>
        )}
      </div>

      {/* Form for Add to Cart */}
      {addToCartIsOpen && (
        <AddToCartForm
          isOpen={addToCartIsOpen}
          itemDetails={itemDetails}
          onClose={addToCartOnClose}
          onOpenChange={addToCartOnOpenChange}
        />
      )}
    </>
  );
};

export default ActionBtn;
