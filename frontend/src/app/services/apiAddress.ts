import { FieldValues } from "react-hook-form";
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

// To Add a new Address
export const addAddress = async (data: FieldValues) => {
  try {
    const res = await newRequest.post("/addresses", data, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};
