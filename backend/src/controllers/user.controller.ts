import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { eq } from "drizzle-orm";
import { users } from "../db/schema/user.schema";
import AppError from "../utils/appError";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting the current logged in user
export const getUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) return next(new AppError(404, "There is no user"));

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
    console.log(err);
    return next(new AppError(500, "Something went wrong, try again later"));
  }
};

// Updating the user
export const updateMe = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.password)
      return next(new AppError(400, "This route is not for updating password"));

    const [user] = await db
      .update(users)
      .set({ ...req.body })
      .where(eq(users.id, Number(req.user?.id)))
      .returning();

    res.status(200).json({ status: "success", updatedUser: user });
  } catch (err) {
    console.log(err);
    return next(new AppError(500, "Something went wrong, try again later"));
  }
};

// Update Password
export const updatePassword = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.body.newPassword ||
      !req.body.passwordConfirm ||
      !req.body.oldPassword
    )
      return next(new AppError(400, "Please provide all the details"));

    // Getting the user
    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(req.user?.id)));

    if (!currentUser)
      return next(new AppError(404, "No usere found with user ID"));

    // Checking the old password
    const checkCredentials = await bcrypt.compare(
      req.body.oldPassword,
      currentUser.password
    );

    if (!checkCredentials)
      return next(new AppError(401, "Invalid password, try again"));

    // Checking if both the new passwords match
    if (req.body.newPassword !== req.body.passwordConfirm)
      return next(
        new AppError(401, "Password and Confirm Password don't match")
      );

    // Setting up the new password
    const newPassword = await bcrypt.hash(req.body.newPassword, 8);

    const [updatedUser] = await db
      .update(users)
      .set({ password: newPassword })
      .where(eq(users.id, Number(req.user?.id)))
      .returning();

    res.status(200).json({ status: "success", updatedUser });
  } catch (err) {
    console.log(err);
    return next(new AppError(500, "Something went wrong, try again later"));
  }
};
