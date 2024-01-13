import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToWishlist } from "../services/apiWishlist";

export const useAddToWishlist = () => {
  const mutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      toast("Added to Wishlist", { type: "success" });
    },
  });

  return mutation;
};
