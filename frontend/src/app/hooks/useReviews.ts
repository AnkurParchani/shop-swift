import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReview,
  deleteReview,
  getMyReviews,
  updateReview,
} from "../services/apiReviews";
import { toast } from "react-toastify";

// Getting all reviews of the user
export const useGetMyReviews = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: getMyReviews,
    queryKey: ["my-reviews"],
  });

  return { data, isLoading, error, refetch };
};

// Adding a new Review
export const useAddReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError(err: Error) {
      toast(err.message, { type: "error" });
    },
  });

  return mutation;
};

// To update an address of the user
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
    },
    onError(err: Error) {
      toast(err.message, { type: "error" });
    },
  });

  return mutation;
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
