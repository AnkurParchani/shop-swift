import { useRouter } from "next/navigation";
import { Description, Item } from "../../../global";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { IoIosRemoveCircle } from "react-icons/io";
import { useRemoveFromWishlist } from "../hooks/useWishlist";

const WishlistItemCard = ({ item }: { item: Item }) => {
  const router = useRouter();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const {
    id,
    discountedPrice,
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

  // To remove from wishlist
  function handleRemoveFromWishlist(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    e.stopPropagation();

    if (removeFromWishlistMutation.isPending) return;
    removeFromWishlistMutation.mutate(id);
  }

  return (
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

      <CardBody className={`overflow-visible p-0 ${!inStock && "opacity-50"}`}>
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
          <p className="text-xs text-red-300 line-through">₹{originalPrice}</p>
        </div>
        <p className="text-xs text-green-300">({discount}% OFF)</p>
      </CardFooter>
      <Button className="w-full py-0.5" variant="solid" color="primary">
        Add to Cart
      </Button>
    </Card>
  );
};

export default WishlistItemCard;
