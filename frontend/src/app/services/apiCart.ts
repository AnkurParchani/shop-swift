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
export const addToCart = async (data: Partial<CartItem>) => {
  try {
    await newRequest.post("/carts", data, { withCredentials: true });
  } catch (err) {
    return handleApiError(err);
  }
};

// To update a cart item
export const updateCart = async (data: {
  cartId: number;
  data: Partial<CartItem>;
}) => {
  try {
    await newRequest.patch(`/carts/${data.cartId}`, data.data, {
      withCredentials: true,
    });
  } catch (err) {
    return handleApiError(err);
  }
};

// To remove an item from cart
export const removeFromCart = async (cartId: number) => {
  try {
    await newRequest.delete(`carts/${cartId}`);
  } catch (err) {
    return handleApiError(err);
  }
};
