import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Item } from "../../../../global";

const ProductItem = ({ item }: { item: Item }) => {
  const { id, name, discountedPrice } = item;

  return (
    <Card
      shadow="sm"
      key={id}
      isPressable
      onPress={() => console.log("item pressed")}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={name}
          className="h-auto w-full object-cover"
          src={name}
        />
      </CardBody>
      <CardFooter className="flex justify-between gap-1 text-small">
        <b>{name}</b>
        <p className="text-default-500">{discountedPrice}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
