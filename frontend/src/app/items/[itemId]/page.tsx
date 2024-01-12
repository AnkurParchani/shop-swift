"use client";

import { useQuery } from "@tanstack/react-query";
import { getSingleItem } from "@/app/services/apiItems";
import Loading from "@/app/loading";
import CarouselImgs from "@/app/components/items/CarouselImgs";

type PageType = {
  params: { itemId: string };
};

const Page = ({ params }: PageType) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`item-${params.itemId}`],
    queryFn: () => getSingleItem(params.itemId),
  });

  if (isLoading) return <Loading />;

  const { images, reviews } = data;

  console.log(data);
  return (
    <div>
      <CarouselImgs images={images} />
    </div>
  );
};

export default Page;
