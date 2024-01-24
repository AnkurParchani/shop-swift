import { Review } from "../../../global";
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

// Adding a new Review
export const addReview = async (data: {
  content: string;
  stars: string;
  itemId: number;
}) => {
  try {
    const res = await newRequest.post("/reviews", data, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// To Update a Review
export const updateReview = async (data: {
  reviewId: number;
  review: Review;
}) => {
  try {
    const res = await newRequest.patch(
      `/reviews/${data.reviewId}`,
      data.review,
      {
        withCredentials: true,
      },
    );

    return res.data;
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
