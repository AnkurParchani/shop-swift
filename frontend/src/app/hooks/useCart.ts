import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  getMyCart,
  removeFromCart,
  updateCart,
} from "../services/apiCart";

// To get all your cart items
export const useGetMyCart = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["my-cart"],
    queryFn: getMyCart,
  });

  return { data, isLoading, error, refetch };
};

// To add item to user's cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Invalidate "my-cart" and "my-wishlist"
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
      queryClient.invalidateQueries({ queryKey: ["my-wishlist"] });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};

// To update a particular cart item
export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};
