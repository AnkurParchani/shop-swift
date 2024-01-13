import newRequest from "../utils/newRequest";

export const addToWishlist = async (itemId: number) => {
  const res = await newRequest.post(
    "/wishlists",
    { itemId },
    { withCredentials: true },
  );

  console.log("Logging res, ", res);
};
