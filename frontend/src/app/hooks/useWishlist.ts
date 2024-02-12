import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addToWishlist,
  clearFullWishlist,
  getMyWishlist,
  removeFromWishlist,
} from "../services/apiWishlist";
import { useRouter } from "next/navigation";

// Getting all wishlist items
export const useGetMyWishlist = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: getMyWishlist,
    queryKey: ["my-wishlist"],
  });

  return { data, isLoading, error, refetch };
};

// Adding to wishlist
export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-wishlist"],
      });
    },
    onError: (err: Error) => {
      console.log();
      if (err.message === "Login first to continue") {
        router.push("/login");
      } else {
        toast(err.message, { type: "error" });
      }
    },
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

// To clear all the items from the wishlist
export const useClearFullWishlist = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: clearFullWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-wishlist"],
      });

      toast("Wishlist Cleared", { type: "success" });
    },
    onError: (err: Error) => toast(err.message, { type: "error" }),
  });

  return mutation;
};
