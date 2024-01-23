import Stripe from "stripe";
import { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
import { handleServerError } from "../utils/handleServerError";

configDotenv({ path: ".env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: 20,
      currency: "usd",
      description: "payment intent",
    });

    return res.status(200).json({ status: "success", intent });
  } catch (err) {
    return handleServerError(err, next);
  }
};
