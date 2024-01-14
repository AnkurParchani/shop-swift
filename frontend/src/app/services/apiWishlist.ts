import newRequest from "../utils/newRequest";

// Getting all wishlist items
export const getMyWishlist = async () => {
  const res = await newRequest.get("/wishlists");

  return res.data.items;
};

// Adding item to wishlist
export const addToWishlist = async (itemId: number) => {
  const res = await newRequest.post(
    "/wishlists",
    { itemId },
    { withCredentials: true },
  );

  console.log("Logging res, ", res);
};

// Removing item from wishlist
export const removeFromWishlist = async (itemId: number) => {
  const res = await newRequest.delete(`/wishlists/${itemId}`);

  console.log("Removed from wishlist");
};
