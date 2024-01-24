import { useQuery } from "@tanstack/react-query";
import { getMyOrders, getSingleOrder } from "../services/apiOrders";

// Getting all orders of the user
export const useGetMyOrders = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: getMyOrders,
    queryKey: ["my-orders"],
  });

  return { data, isLoading, error };
};

// Getting single items of a particular order
export const useGetSingleOrder = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getSingleOrder(id),
    queryKey: [`order-${id}`],
  });

  return { data, isLoading, error };
};
