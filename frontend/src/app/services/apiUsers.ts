import { FieldValues } from "react-hook-form";
import newRequest from "../utils/newRequest";

// Login request for frontend
export const login = async (data: FieldValues) => {
  try {
    const res = await newRequest.post("/users/login", data);

    if (res.data.status === "success") {
      return true;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.log("Error from axios login", err);
  }
};
