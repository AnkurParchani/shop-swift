import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { items } from "../db/schema/item.schema";
import { eq } from "drizzle-orm";
import { images } from "../db/schema/img.schema";
import { handleApiError } from "../utils/handleServerError";
import AppError from "../utils/appError";

// Getting all the items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allItems = await db.query.items.findMany({
      with: {
        images: { where: eq(images.isItemMainImg, true) },
        reviews: true,
      },
    });

    const itemsToSend = allItems.map((item) => {
      const { images, reviews, ...restOfThem } = item;
      const imgPath = images.map((img) => img.path)[0] || undefined;
      const rating =
        reviews.reduce((acc, cur) => +cur.stars + acc, 0) || undefined;

      return {
        ...restOfThem,
        image: imgPath,
        numReviews: reviews.length,
        ratings: (rating && rating / reviews.length) || 1,
      };
    });

    res.status(200).json({ status: "success", items: itemsToSend });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Getting particular item
export const getItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.itemId)
      return next(new AppError(400, "Provide valid itemId"));

    const [item] = await db
      .select()
      .from(items)
      .where(eq(items.id, Number(req.params.itemId)));

    if (!item)
      return next(new AppError(400, "No item found with that item ID"));

    res.status(200).json({ status: "success", item });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Creating an item
export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //  1). Creating the item
    const [item] = await db
      .insert(items)
      .values({
        ...req.body,
      })
      .returning();

    res.status(200).json({ status: "success", item });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Update as Item
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.itemId)
      return next(new AppError(400, "Provide valid itemId"));

    const [item] = await db
      .select()
      .from(items)
      .where(eq(items.id, Number(req.params.itemId)));

    if (!item)
      return next(new AppError(400, "No item found with provided ItemID"));

    const [updatedItem] = await db
      .update(items)
      .set({ ...req.body, id: item.id })
      .where(eq(items.id, Number(req.params.itemId)))
      .returning();

    res.status(200).json({ status: "success", updatedItem });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Deleting an Item
export const deleteItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.itemId) return next(new AppError(400, "Provide item Id"));

    const [item] = await db
      .delete(items)
      .where(eq(items.id, Number(req.params.itemId)))
      .returning();

    if (!item)
      return next(new AppError(404, "No item found with provided item Id"));

    res
      .status(200)
      .json({ status: "success", message: "Item has been deleted" });
  } catch (err) {
    return handleApiError(err, next);
  }
};
