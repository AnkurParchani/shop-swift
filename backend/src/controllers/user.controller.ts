import { Request, Response } from "express";
import { User } from "../../global";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting the current logged in user
export const getUser = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) throw new Error("There is no user");

    // Get the addresses of the user

    res.status(200).json({ status: "success", user: req.user });
  } catch (err) {
    res.status(500).send("Error from delete Account, check console");
    console.log(err);
  }
};
