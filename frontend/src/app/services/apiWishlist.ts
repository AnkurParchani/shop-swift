import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

// Getting all wishlist items
export const getMyWishlist = async () => {
  try {
    const res = await newRequest.get("/wishlists");

    return res.data.items;
  } catch (err) {
    return handleApiError(err);
  }
};

// Adding item to wishlist
export const addToWishlist = async (itemId: number) => {
  try {
    const res = await newRequest.post(
      "/wishlists",
      { itemId },
      { withCredentials: true },
    );
  } catch (err) {
    return handleApiError(err);
  }
};

// Removing item from wishlist
export const removeFromWishlist = async (itemId: number) => {
  try {
    const res = await newRequest.delete(`/wishlists/${itemId}`);
  } catch (err) {
    return handleApiError(err);
  }
};
