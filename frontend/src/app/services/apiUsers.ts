import { FieldValues } from "react-hook-form";
import newRequest from "../utils/newRequest";
import axios from "axios";

export const login = async (data: FieldValues) => {
  try {
    const res = await newRequest.post("/users/login", data);

    console.log(res.data);
  } catch (err) {
    console.log("Error from axios login", err);
  }
};
