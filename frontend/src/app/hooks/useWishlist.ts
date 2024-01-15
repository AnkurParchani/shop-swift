import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
} from "../services/apiWishlist";

// Getting all wishlist items
export const useGetMyWishlist = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: getMyWishlist,
    queryKey: ["my-wishlist"],
  });

  return { data, isLoading, error };
};

// Adding to wishlist
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-wishlist"],
      });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};

// Removing from wishlist
export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-wishlist"],
      });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};
