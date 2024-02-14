import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { Request, Response, NextFunction } from "express";

import userRoutes from "./routes/user.route";
import itemRoutes from "./routes/item.route";
import addressRoutes from "./routes/address.route";
import reviewRoutes from "./routes/review.route";
import orderRoutes from "./routes/order.route";
import wishlistRoutes from "./routes/wishlist.route";
import cartRoutes from "./routes/cart.route";
import imgRoutes from "./routes/img.route";
import stripeRoutes from "./routes/stripe.route";

import AppError from "./utils/appError";

const app = express();

// Getting env variable
configDotenv({ path: ".env" });

// To access data as JSON format
app.use(express.json());

// To implement CORS
// app.use(
//   cors({
//     origin: "https://shop-swift-tau.vercel.app",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// For reading cookies
app.use(cookieParser());

// Defined Routes
app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/addresses", addressRoutes);
app.use("/reviews", reviewRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/orders", orderRoutes);
app.use("/carts", cartRoutes);
app.use("/images", imgRoutes);
app.use("/stripe", stripeRoutes);

// Undefined Routes
// app.use("*", (req: Request, res: Response, next: NextFunction) => {
//   next(new AppError(404, "No route found with this endpoint"));
// });

// Global error handling
app.use(
  (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    const { statusCode } = err;
    res.status(statusCode || 500).json(err);
    console.error(err);
  }
);

export default app;
