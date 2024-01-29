import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

// Getting all the items
export const getItems = async (searchParams: URLSearchParams) => {
  try {
    const queryParams = [];
    if (searchParams.has("sort")) {
      const sort = searchParams.get("sort");
      queryParams.push(`sort=${sort}`);
    }

    let queryPath = "/items";
    if (queryParams.length > 0) {
      queryPath += "?" + queryParams.join("&");
    }

    const res = await newRequest.get(queryPath);
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
