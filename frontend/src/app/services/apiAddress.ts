import { FieldValues } from "react-hook-form";
import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";
import { Address } from "../../../global";

// To get all the addresses of the user
export const getMyAddresses = async () => {
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

// To Update an Address
export const updateAddress = async (data: {
  addressId: number;
  address: Address;
}) => {
  try {
    const res = await newRequest.patch(
      `/addresses/${data.addressId}`,
      data.address,
      {
        withCredentials: true,
      },
    );

    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};

// To Delete an Address
export const deleteAddress = async (addressId: number) => {
  try {
    const res = await newRequest.delete(`/addresses/${addressId}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return handleApiError(err);
  }
};
