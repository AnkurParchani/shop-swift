import Stripe from "stripe";
import { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
import { handleServerError } from "../utils/handleServerError";
import { db } from "../db/dbConnect";
import { and, eq } from "drizzle-orm";
import { addresses } from "../db/schema/address.schema";
import { User } from "../../global";
import AppError from "../utils/appError";

configDotenv({ path: ".env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

export const createPaymentIntent = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user)
      return next(new AppError(400, "Please login before doing payment"));

    if (!req.body.totalAmount)
      return next(new AppError(400, "There is no total Amount"));

    const totalAmount = req.body.totalAmount;

    const address = await db.query.addresses.findFirst({
      where: and(
        eq(addresses.userId, req.user.id),
        eq(addresses.isDeliveryAddress, true)
      ),
    });

    if (!address)
      return next(new AppError(400, "There is no default Address of the user"));

    const intent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "inr",
      description: "Payment Intent",
      shipping: {
        name: req.user.name,
        address: {
          line1: address.flatNumber || "",
          line2: address.street || "",
          city: address.city || "",
          country: address.country || "",
          state: address.state || "",
        },
      },
    });

    res
      .status(200)
      .json({ status: "success", clientSecret: intent.client_secret });
  } catch (err) {
    return handleServerError(err, next);
  }
};
