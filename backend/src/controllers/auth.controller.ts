import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { users } from "../db/schema/userSchema";
import { eq } from "drizzle-orm";

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
