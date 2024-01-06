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
