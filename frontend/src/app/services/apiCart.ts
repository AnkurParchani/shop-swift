import { CartItem } from "../../../global";
import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

// To get all your cart items
export const getMyCart = async () => {
  try {
    const res = await newRequest("/carts");

    return res.data.items;
  } catch (err) {
    return handleApiError(err);
  }
};

// To add item to user's cart
export const addToCart = async (data: CartItem) => {
  try {
    await newRequest.post("/carts", data, { withCredentials: true });
  } catch (err) {
    return handleApiError(err);
  }
};
