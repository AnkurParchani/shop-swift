import { useRouter } from "next/navigation";
import { CartItem, Description, Item } from "../../../global";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { IoIosRemoveCircle } from "react-icons/io";
import { useRemoveFromWishlist } from "../hooks/useWishlist";
import { useGetMyCart } from "../hooks/useCart";
import AddToCartForm from "../my-cart/AddToCartForm";
import { CiShoppingCart } from "react-icons/ci";

const WishlistItemCard = ({ item }: { item: Item }) => {
  const router = useRouter();
  const { data: cart } = useGetMyCart();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const {
    isOpen: addToCartIsOpen,
    onOpen: addToCartOnOpen,
    onClose: addToCartOnClose,
    onOpenChange: addToCartOnOpenChange,
  } = useDisclosure();
  const {
    id,
    discountedPrice,
    extraDetails,
    company,
    originalPrice,
    inStock,
    description,
    images,
  } = item;

  const { genericName } = description as Description;
  const discount = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );
  const imgPath = (images && images[0].path) || "/images/no-product.png";
  const isItemInCart =
    cart &&
    cart.length > 0 &&
    cart.some((cart: CartItem) => cart.item.id === id);

  // To remove from wishlist
  function handleRemoveFromWishlist(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    e.stopPropagation();

    if (removeFromWishlistMutation.isPending) return;
    removeFromWishlistMutation.mutate(id);
  }

  return (
    <>
      <Card
        shadow="sm"
        key={id}
        isPressable={inStock}
        className="relative"
        onClick={() => {
          if (inStock) {
            router.push(`/items/${id}`);
          }
        }}
      >
        {!inStock && (
          <p className="absolute right-0 top-0 z-20 rounded-sm bg-red-600 px-2 py-0.5 text-xs text-white">
            Out of Stock
          </p>
        )}

        <div
          className="absolute right-0.5 top-0.5 z-20 text-2xl text-red-500"
          onClick={handleRemoveFromWishlist}
        >
          <IoIosRemoveCircle />
        </div>

        <CardBody
          className={`overflow-visible p-0 ${!inStock && "opacity-50"}`}
        >
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={genericName}
            className="h-auto w-full object-cover"
            src={imgPath}
          />
        </CardBody>
        <CardFooter
          className={`flex flex-col items-start gap-1 text-small ${
            !inStock && "opacity-50"
          }`}
        >
          <b className="uppercase">{company}</b>
          <p className="text-gray-650 text-left text-xs font-light capitalize">
            {genericName}
          </p>

          <div className="flex items-center gap-1">
            <p className="text-white">₹{discountedPrice}</p>
            <p className="text-xs text-red-300 line-through">
              ₹{originalPrice}
            </p>
          </div>
          <p className="text-xs text-green-300">({discount}% OFF)</p>
        </CardFooter>
        {isItemInCart ? (
          <Button
            className="w-full py-0.5"
            variant="solid"
            color="warning"
            onClick={() => router.push("/my-cart")}
          >
            <CiShoppingCart style={{ fontSize: "25px" }} />
            See my Cart
          </Button>
        ) : (
          <Button
            onPress={addToCartOnOpen}
            className="w-full py-0.5"
            variant="solid"
            color="primary"
          >
            <CiShoppingCart style={{ fontSize: "25px" }} />
            Add to Cart
          </Button>
        )}
      </Card>

      {/* Form for Add to Cart */}
      {addToCartIsOpen && (
        <AddToCartForm
          isOpen={addToCartIsOpen}
          itemDetails={{ discountedPrice, extraDetails, id }}
          onClose={addToCartOnClose}
          onOpenChange={addToCartOnOpenChange}
        />
      )}
    </>
  );
};

export default WishlistItemCard;
