import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import ReviewStars from "../others/ReviewStars";
import AddToWishlistBtn from "./AddToWishlistBtn";

import { Item } from "../../../../global";
import { useTheme } from "@/app/contexts/ThemeContext";
import { Description } from "../../../../global";

const ProductItem = ({ item }: { item: Item }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const bgTheme = theme.split("-")[1];
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
      className={`relative  ${
        bgTheme === "dark"
          ? "bg-backround border border-content1-200 text-white"
          : "border border-content1-200 bg-gray-100 text-black"
      }`}
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

      {inStock && <AddToWishlistBtn itemId={id} />}

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
        <p
          className={`${
            bgTheme === "dark" ? "text-gray-400" : "text-gray-900"
          } text-left text-xs font-light capitalize`}
        >
          {genericName}
        </p>
        <div className="flex items-center gap-1 text-xs">
          <p>{ratings}</p>
          <ReviewStars star={ratings} />
          <p className="text-gray-400">({numReviews})</p>
        </div>
        <div className="flex items-center gap-1">
          <p>₹{discountedPrice}</p>
          <p className="text-xs text-red-300 line-through">₹{originalPrice}</p>
        </div>
        <p
          className={`text-xs ${
            bgTheme === "dark" ? "text-green-300" : "text-green-700"
          }`}
        >
          ({discount}% OFF)
        </p>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
