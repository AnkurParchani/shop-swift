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
    if (searchParams.has("gender")) {
      const gender = searchParams.get("gender");
      queryParams.push(`gender=${gender}`);
    }
    if (searchParams.has("category")) {
      const category = searchParams.get("category");
      queryParams.push(`category=${category}`);
    }
    if (searchParams.has("min")) {
      const min = searchParams.get("min");
      queryParams.push(`min=${min}`);
    }
    if (searchParams.has("max")) {
      const max = searchParams.get("max");
      queryParams.push(`max=${max}`);
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
