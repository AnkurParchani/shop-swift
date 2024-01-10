import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Item } from "../../../../global";
import ReviewStars from "../others/ReviewStars";

const ProductItem = ({ item }: { item: Item }) => {
  const {
    id,
    name,
    discountedPrice,
    image,
    originalPrice,
    numReviews,
    inStock,
    ratings,
  } = item;
  const discount = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100,
  );

  return (
    <Card
      shadow="sm"
      key={id}
      isPressable={inStock}
      className="relative"
      onPress={() => {
        if (inStock) {
          console.log("item pressed");
        }
      }}
    >
      {!inStock && (
        <p className="absolute right-0 top-0 z-20 rounded-sm bg-red-600 px-2 py-0.5 text-xs text-white">
          Out of Stock
        </p>
      )}
      <CardBody className={`overflow-visible p-0 ${!inStock && "opacity-50"}`}>
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={name}
          className="h-auto w-full object-cover"
          src={image || "/images/no-product.png"}
        />
      </CardBody>
      <CardFooter
        className={`flex flex-col items-start gap-0.5 text-small ${
          !inStock && "opacity-50"
        }`}
      >
        <b>{name}</b>
        <div className="flex items-center gap-1 text-xs">
          <p>{ratings}.0</p>
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
