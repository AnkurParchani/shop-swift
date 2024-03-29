import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

// Getting all Ordered items
export const getMyOrders = async () => {
  try {
    const res = await newRequest.get("/orders");

    return res.data.myOrders;
  } catch (err) {
    return handleApiError(err);
  }
};

// Getting single order
export const getSingleOrder = async (orderId: string) => {
  try {
    const res = await newRequest.get(`/orders/${orderId}`);

    return res.data.order;
  } catch (err) {
    return handleApiError(err);
  }
};

// Creating an Order
export const createOrder = async (data: {
  orders: { itemId: number; quantity: number }[];
}) => {
  try {
    const res = await newRequest.post(`/orders`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};
