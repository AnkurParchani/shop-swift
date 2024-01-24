import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReview, getMyReviews } from "../services/apiReviews";
import { toast } from "react-toastify";

// Getting all reviews of the user
export const useGetMyReviews = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getMyReviews,
    queryKey: ["my-reviews"],
  });

  return { data, isLoading, error };
};

// Deleting the review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError: (err: Error) => {
      toast(err.message, { type: "error" });
    },
  });

  return mutation;
};