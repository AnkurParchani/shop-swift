import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

// To get all the addresses of the user
export const getAllAddresses = async () => {
  try {
    const res = await newRequest.get("/addresses");

    return res.data.addresses;
  } catch (err) {
    return handleApiError(err);
  }
};
