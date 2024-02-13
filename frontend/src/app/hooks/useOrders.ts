import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "../services/apiOrders";
import { toast } from "react-toastify";

// Getting all orders of the user
export const useGetMyOrders = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: getMyOrders,
    queryKey: ["my-orders"],
  });

  return { data, isLoading, error, refetch };
};

// Getting single items of a particular order
export const useGetSingleOrder = (id: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: () => getSingleOrder(id),
    queryKey: [`order-${id}`],
  });

  return { data, isLoading, error, refetch };
};

// Creating an Order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.refetchQueries({ queryKey: ["my-orders"] });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};
