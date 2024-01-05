import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { users } from "../db/schema/user.schema";
import { eq } from "drizzle-orm";
import { User } from "../../global";
import { images } from "../db/schema/img.schema";
import AppError from "../utils/appError";
import { handleApiError } from "../utils/handleServerError";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Signup
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, passwordConfirm, img } = req.body;

    // If all details are not there
    if (!name || !email || !password || !passwordConfirm)
      return next(new AppError(400, "Please provide all the details"));

    // If passwords don't match
    if (password !== passwordConfirm)
      return next(new AppError(400, "Passwords do not match"));

    const encrpytedPassword = await bcrypt.hash(password, 8);

    const [user] = await db
      .insert(users)
      .values({ email, name, password: encrpytedPassword })
      .returning();

    // If image path is also provided
    if (img) {
      await db.insert(images).values({
        path: img,
        isUserImg: true,
        isItemImg: false,
        userId: user.id,
        itemId: null,
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    // Setting cookie and returning response
    res.cookie("token", token);
    res.status(200).json({
      status: "success",
      token,
      user: { ...user, password: undefined },
    });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError(400, "Please provide all the details"));

    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    // If no user found
    const checkCredentials =
      foundUser && (await bcrypt.compare(password, foundUser.password));

    if (!checkCredentials)
      return next(new AppError(400, "Invalid username or password"));

    // Generating token
    const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET!);

    res.cookie("token", token);
    res.status(200).json({
      status: "success",
      message: "Logged in",
      user: { ...foundUser, password: undefined },
      token,
    });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Protect route to check cookies and get user according the the cookie
export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) return next(new AppError(400, "Login first to continue"));

    //   Decoding the jwt token
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      iat: number;
    };

    if (!decode || !decode.userId)
      return next(
        new AppError(400, "Invalid token or token expired, login again")
      );

    //   Getting the user from the decoded Id
    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, decode.userId));

    if (!currentUser || !currentUser.id)
      return next(new AppError(400, "There is no user in this database"));

    req.user = currentUser;
    next();
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Check if the user is Admin or not
export const checkIsAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!(req.user?.email === process.env.ADMIN_EMAIL))
      return next(new AppError(401, "You're not admin"));

    next();
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Deleting the Account
export const deleteAccount = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { confirmation, password } = req.body;
    if (!password || !confirmation)
      return next(new AppError(400, "Please provide all the details"));

    if (!req.user?.id) return next(new AppError(400, "No user Id Provided"));

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.user.id));

    const checkCredentials = await bcrypt.compare(password, user.password);
    if (!checkCredentials)
      return next(new AppError(401, "Invalid password, try again"));

    await db.delete(users).where(eq(users.id, req.user.id));

    res
      .status(200)
      .json({ status: "success", message: "Account has been removed" });
  } catch (err) {
    return handleApiError(err, next);
  }
};
