import { useQuery } from "@tanstack/react-query";
import { getItems, getSingleItem } from "../services/apiItems";

// Getting all the items
export const useGetAllItems = (searchParams: URLSearchParams) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["items"],
    queryFn: () => getItems(searchParams),
  });

  return { isLoading, error, data, refetch };
};

// Getting single item
export const useGetSingleItem = (itemId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`item-${itemId}`],
    queryFn: () => getSingleItem(itemId),
  });

  return { data, isLoading, error };
};
