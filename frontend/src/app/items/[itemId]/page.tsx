"use client";

import Loading from "@/app/loading";
import { getSingleItem } from "@/app/services/apiItems";
import { useQuery } from "@tanstack/react-query";

type PageType = {
  params: { itemId: string };
};

const Page = ({ params }: PageType) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`item-${params.itemId}`],
    queryFn: () => getSingleItem(params.itemId),
  });

  if (isLoading) return <Loading />;
  console.log(data);
  return <div>page</div>;
};

export default Page;
