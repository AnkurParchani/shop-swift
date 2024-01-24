import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../services/apiReviews";

// Getting all reviews of the user
export const useGetMyReviews = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getMyReviews,
    queryKey: ["my-reviews"],
  });

  return { data, isLoading, error };
};
