import { useQuery } from "@tanstack/react-query";
import { getItems, getSingleItem } from "../services/apiItems";

// Getting all the items
export const useGetAllItems = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  return { isLoading, error, data };
};

// Getting single item
export const useGetSingleItem = (itemId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`item-${itemId}`],
    queryFn: () => getSingleItem(itemId),
  });

  return { data, isLoading, error };
};
