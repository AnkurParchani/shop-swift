import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { users } from "../db/schema/user.schema";
import { eq } from "drizzle-orm";
import { User } from "../../global";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // If all details are not there
    if (!name || !email || !password || !passwordConfirm)
      throw new Error("Provide all the details");

    // If passwords don't match
    if (password !== passwordConfirm) throw new Error("Passwords do not match");

    const encrpytedPassword = await bcrypt.hash(password, 8);

    const [user] = await db
      .insert(users)
      .values({ email, name, password: encrpytedPassword })
      .returning();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    // Setting cookie and returning response
    res.cookie("token", token);
    res.status(200).json({ status: "success", user });
  } catch (err) {
    console.log("Error from signup", err);
    return res.status(500).json({ err: "error", message: "check console" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("Provide all the details");

    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    // If no user found
    const checkCredentials =
      foundUser && (await bcrypt.compare(password, foundUser.password));

    if (!checkCredentials) throw new Error("Invalid username or password");

    // Generating token
    const token = jwt.sign({ userId: foundUser.id }, process.env.JWT_SECRET!);

    res.cookie("token", token);
    res.status(200).json({ status: "success", message: "Logged in" });
  } catch (err) {
    console.log("Error from login", err);
    res.status(500).json({ err: "error", message: "check console" });
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

    if (!token) throw new Error("Login first to continue");

    //   Decoding the jwt token
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      iat: number;
    };

    if (!decode || !decode.userId)
      throw new Error("Invalid token or token expired, login again");

    //   Getting the user from the decoded Id
    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, decode.userId));

    if (!currentUser) throw new Error("There is no user in this database");

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(500).send("Error from authController protect, check console");
    console.log(err);
  }
};

// Deleting the Account
export const deleteAccount = async (req: CustomRequest, res: Response) => {
  try {
    const { confirmation, password } = req.body;
    if (!password || !confirmation)
      throw new Error("Please provide everything");

    if (!req.user?.id) throw new Error("No user id provided");

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.user.id));

    const checkCredentials = await bcrypt.compare(password, user.password);
    if (!checkCredentials) throw new Error("Invalid password, try again");

    await db.delete(users).where(eq(users.id, req.user.id));

    res
      .status(200)
      .json({ status: "success", message: "Account has been removed" });
  } catch (err) {
    res.status(500).send("Error from delete Account, check console");
    console.log(err);
  }
};
