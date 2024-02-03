import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Item } from "../../../../global";
import ReviewStars from "../others/ReviewStars";
import { Description } from "../../../../global";

import AddToWishlistBtn from "./AddToWishlistBtn";

const ProductItem = ({ item }: { item: Item }) => {
  const router = useRouter();
  const {
    id,
    discountedPrice,
    company,
    image,
    originalPrice,
    numReviews,
    inStock,
    ratings,
    description,
  } = item;

  const { genericName } = description as Description;
  const discount = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );

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

      <AddToWishlistBtn itemId={id} />

      <CardBody className={`overflow-visible p-0 ${!inStock && "opacity-50"}`}>
        <Image
          shadow="sm"
          radius="lg"
          alt={genericName}
          className="h-52 w-[156px] object-cover"
          src={image || "/images/no-product.png"}
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
        <div className="flex items-center gap-1 text-xs">
          <p>{ratings}</p>
          <ReviewStars star={ratings} />
          <p className="text-gray-400">({numReviews})</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-white">₹{discountedPrice}</p>
          <p className="text-xs text-red-300 line-through">₹{originalPrice}</p>
        </div>
        <p className="text-xs text-green-300">({discount}% OFF)</p>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
