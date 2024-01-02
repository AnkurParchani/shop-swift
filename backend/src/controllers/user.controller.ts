import bcrypt from "bcrypt";
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

// Updating the user
export const updateMe = async (req: CustomRequest, res: Response) => {
  try {
    if (req.body.password)
      throw new Error("This route is not for updating password");

    const [user] = await db
      .update(users)
      .set({ ...req.body })
      .where(eq(users.id, Number(req.user?.id)))
      .returning();

    res.status(200).json({ status: "success", updatedUser: user });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "error from updateMe, check console" });
    console.log(err);
  }
};

// Update Password
export const updatePassword = async (req: CustomRequest, res: Response) => {
  try {
    if (
      !req.body.newPassword ||
      !req.body.passwordConfirm ||
      !req.body.oldPassword
    )
      throw new Error("Please provide all the details");

    // Getting the user
    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(req.user?.id)));

    if (!currentUser) throw new Error("No usere found with user ID");

    // Checking the old password
    const checkCredentials = await bcrypt.compare(
      req.body.oldPassword,
      currentUser.password
    );

    if (!checkCredentials) throw new Error("Invalid password, try again");

    // Checking if both the new passwords match
    if (req.body.newPassword !== req.body.passwordConfirm)
      throw new Error("Password and Confirm Password don't match");

    // Setting up the new password
    const newPassword = await bcrypt.hash(req.body.newPassword, 8);

    const [updatedUser] = await db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.id, Number(req.user?.id)))
      .returning();

    res.status(200).json({ status: "success", updatedUser });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from updatePassword, check console",
    });
    console.log(err);
  }
};
