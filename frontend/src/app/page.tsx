"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "./services/apiItems";
import Loading from "./loading";
import { Item } from "../../global";

export default function Home() {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  console.log(items);
  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-5 sm:grid-cols-3 sm:gap-10">
      {items.map((item: Item) => {
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
      })}
    </div>
  );
}
