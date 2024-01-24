import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

// Getting all user's reviews
export const getMyReviews = async () => {
  try {
    const res = await newRequest.get("/reviews");

    return res.data.reviews;
  } catch (err) {
    return handleApiError(err);
  }
};

// Deleting a reveiw
export const deleteReview = async (reviewId: number) => {
  try {
    const res = await newRequest.delete(`/reviews/${reviewId}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};
