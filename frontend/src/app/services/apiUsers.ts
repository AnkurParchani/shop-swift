import { FieldValues } from "react-hook-form";
import { handleApiError } from "../utils/handleApiError";

import newRequest from "../utils/newRequest";

// Getting the currently logged in user
export const getLoggedInUser = async () => {
  try {
    const res = await newRequest.get("/users/me");

    if (res.data?.user) {
      return res.data.user;
    }
  } catch (err) {
    return handleApiError(err);
  }
};

// Login request
export const login = async (data: FieldValues) => {
  try {
    const res = await newRequest.post("/users/login", data, {
      withCredentials: true,
    });

    if (res.data.status === "success") {
      const imgRes = await newRequest.get(`/images/user/${res.data.user.id}`);

      if (imgRes.data.img?.path) {
        return { ...res.data, img: imgRes.data.img.path };
      } else {
        return res.data;
      }
    }
  } catch (err) {
    return handleApiError(err);
  }
};

// Signup Request
export const signup = async (data: {
  data: FieldValues;
  userImg: string | null;
}) => {
  try {
    const res = await newRequest.post("/users/sign-up", data.data, {
      withCredentials: true,
    });

    // If there is user image
    if (res.data.status === "success" && data.userImg) {
      await newRequest.post(
        "/images/user",
        {
          path: data.userImg,
          userId: res.data.user.id,
        },
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

// Update password
export const updatePassword = async (data: {
  oldPassword: string;
  passwordConfirm: string;
  newPassword: string;
}) => {
  try {
    const res = await newRequest.patch("/users/update-password", data, {
      withCredentials: true,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    return handleApiError(err);
  }
};

// Delete Account request
export const deleteAccount = async (data: {
  confirmation: boolean;
  password: string;
}) => {
  try {
    const res = await newRequest.delete("/users/delete-me", {
      data,
      withCredentials: true,
    });

    if (res.data.status === "success") {
      return res.data;
    }
  } catch (err) {
    return handleApiError(err);
  }
};
