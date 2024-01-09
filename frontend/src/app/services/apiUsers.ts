import { FieldValues } from "react-hook-form";
import newRequest from "../utils/newRequest";
import { handleApiError } from "../utils/handleApiError";

// Login request
export const login = async (data: FieldValues) => {
  try {
    const res = await newRequest.post("/users/login", data, {
      withCredentials: true,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    return handleApiError(err);
  }
};

// Signup Request
export const signup = async (data: FieldValues, userImg: string | null) => {
  try {
    console.log("Logging userimg from signup function ", userImg);
    const res = await newRequest.post("/users/sign-up", data, {
      withCredentials: true,
    });

    // If there is user image
    if (userImg) {
      await newRequest.post(
        "/images/user",
        { path: userImg },
        { withCredentials: true },
      );
    }

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    return handleApiError(err);
  }
};
