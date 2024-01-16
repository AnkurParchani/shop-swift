import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, getMyCart } from "../services/apiCart";
import { toast } from "react-toastify";

// To get all your cart items
export const useGetMyCart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-cart"],
    queryFn: getMyCart,
  });

  return { data, isLoading, error };
};

// To add item to user's cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
      queryClient.refetchQueries({ queryKey: ["my-cart"] });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};
