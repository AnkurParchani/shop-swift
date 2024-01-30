import { useQuery } from "@tanstack/react-query";
import {
  getFilteredItems,
  getItems,
  getSingleItem,
} from "../services/apiItems";

// Getting all the filtered items
export const useGetAllFilteredItems = (searchParams: URLSearchParams) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["filtered-items"],
    queryFn: () => getFilteredItems(searchParams),
  });

  return { isLoading, error, data, refetch };
};

// Getting all the items (non-filtered)
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
