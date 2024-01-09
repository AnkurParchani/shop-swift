import { FieldValues } from "react-hook-form";
import { handleApiError } from "../utils/handleApiError";
import newRequest from "../utils/newRequest";

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
export const signup = async (data: FieldValues, userImg: string | null) => {
  try {
    const res = await newRequest.post("/users/sign-up", data, {
      withCredentials: true,
    });

    // If there is user image
    if (res.data.status === "success" && userImg) {
      await newRequest.post(
        "/images/user",
        {
          path: userImg,
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
