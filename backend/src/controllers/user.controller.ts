import { Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/user.schema";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting the current logged in user
export const getUser = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) throw new Error("There is no user");

    const user = await db.query.users.findFirst({
      where: eq(users.id, req.user.id),
      with: {
        addresses: true,
        reviews: true,
        image: true,
        wishlist: true,
        orders: {
          with: {
            orderItems: true,
          },
        },
      },
    });

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(500).send("Error from delete Account, check console");
    console.log(err);
  }
};
