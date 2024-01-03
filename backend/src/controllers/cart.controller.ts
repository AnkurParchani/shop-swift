import { NextFunction, Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { cart } from "../db/schema/cart.schema";
import { and, eq } from "drizzle-orm";
import AppError from "../utils/appError";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Adding item to cart
export const addItemToCart = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.itemId)
      return next(new AppError(400, "Provide the itemId of the item"));

    // Checking if the item is already in user's wishlist or not
    const checkItemInCart = await db
      .select()
      .from(cart)
      .where(
        and(
          eq(cart.userId, Number(req.user?.id)),
          eq(cart.itemId, req.body.itemId)
        )
      );

    if (checkItemInCart[0])
      return next(
        new AppError(400, "You have already added this item in your wishlist")
      );

    // Adding item to the cart
    const [item] = await db
      .insert(cart)
      .values({ itemId: req.body.itemId, userId: req.user?.id, ...req.body })
      .returning();

    res.status(200).json({ status: "success", item });
  } catch (err) {
    console.log(err);
    return next(new AppError(500, "Something went wrong, try again later"));
  }
};

// Get all cart items
export const getAllItemsFromCart = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemsInCart = await db.query.cart.findMany({
      where: eq(cart.userId, Number(req.user?.id)),
      with: {
        item: true,
      },
    });

    res.status(200).json({ status: "success", items: itemsInCart });
  } catch (err) {
    console.log(err);
    return next(new AppError(500, "Something went wrong, try again later"));
  }
};

// Removing item from cart (one)
export const removeItemFromCart = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.cartId)
      return next(new AppError(400, "Please provide the cartId"));

    const itemToRemove = await db
      .delete(cart)
      .where(
        and(
          eq(cart.userId, Number(req.user?.id)),
          eq(cart.id, Number(req.params.cartId))
        )
      )
      .returning();

    if (!itemToRemove[0])
      return next(new AppError(404, "There is no item with the cart id"));

    res
      .status(200)
      .json({ status: "success", message: "item removed from cart" });
  } catch (err) {
    console.log(err);
    return next(new AppError(500, "Something went wrong, try again later"));
  }
};

// Removing item from cart (all)
export const clearCart = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemsInCart = await db
      .delete(cart)
      .where(eq(cart.itemId, Number(req.user?.id)))
      .returning();

    if (!itemsInCart[0])
      return next(new AppError(400, "You have no items in your cart"));

    res
      .status(200)
      .json({ status: "success", message: "Your cart is now empty" });
  } catch (err) {
    console.log(err);
    return next(new AppError(500, "Something went wrong, try again later"));
  }
};
