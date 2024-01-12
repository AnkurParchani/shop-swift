import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

// Getting all the items
export const getItems = async () => {
  try {
    const res = await newRequest.get("/items");
    if (res.data.status === "success") {
      return res.data.items;
    }
  } catch (err) {
    return handleApiError(err);
  }
};

// Getting particular item
export const getSingleItem = async (itemId: string) => {
  try {
    const res = await newRequest.get(`/items/${itemId}`);

    if (res.data.status === "success") {
      return res.data.item;
    }
  } catch (err) {
    return handleApiError(err);
  }
};
