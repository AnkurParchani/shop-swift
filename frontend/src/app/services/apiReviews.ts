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
