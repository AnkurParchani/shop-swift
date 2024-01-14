import { User } from "../../global";
import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { wishlist } from "../db/schema/wishlist.schema";
import { and, eq } from "drizzle-orm";
import AppError from "../utils/appError";
import { handleServerError } from "../utils/handleServerError";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting all wishlist items
export const getWishlistItems = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await db.query.wishlist.findMany({
      where: eq(wishlist.userId, Number(req.user?.id)),
      with: {
        item: true,
      },
    });

    res.status(200).json({ status: "success", items });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Adding item to wishlist
export const addItemToWishlist = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.itemId) return next(new AppError(400, "Provide item Id"));

    // Checking if the item is already in user's wishlist or not
    const checkItemInWishlist = await db
      .select()
      .from(wishlist)
      .where(
        and(
          eq(wishlist.userId, Number(req.user?.id)),
          eq(wishlist.itemId, req.body.itemId)
        )
      );

    if (checkItemInWishlist[0])
      return next(
        new AppError(400, "You have already added this item in your wishlist")
      );

    // Adding the item to the wishlist
    const [item] = await db
      .insert(wishlist)
      .values({ itemId: req.body.itemId, userId: Number(req.user?.id) })
      .returning();

    res.status(200).json({ status: "success", item });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Removing wishlist items (particular)
export const removeItemFromWishlist = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.wishlistItemId)
      return next(new AppError(400, "Provide the wishlist item Id"));

    const itemToRemove = await db
      .delete(wishlist)
      .where(
        and(
          eq(wishlist.userId, Number(req.user?.id)),
          eq(wishlist.itemId, Number(req.params.wishlistItemId))
        )
      )
      .returning();

    if (!itemToRemove[0])
      return next(
        new AppError(404, "There is no item with the wishlist item id")
      );

    res
      .status(200)
      .json({ status: "success", message: "item removed from wishlist" });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Deleting the whole wishlist
export const clearWishlist = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedItems = await db
      .delete(wishlist)
      .where(eq(wishlist.userId, Number(req.user?.id)))
      .returning();

    if (!deletedItems[0])
      return next(new AppError(404, "There are no items in your wishlist"));

    res.status(200).json({
      status: "success",
      message: "Your all wishlist items have been deleted",
    });
  } catch (err) {
    return handleServerError(err, next);
  }
};
