import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { items } from "../db/schema/item.schema";
import { eq } from "drizzle-orm";
import { images } from "../db/schema/img.schema";
import AppError from "../utils/appError";
import { handleApiError } from "../utils/handleServerError";

// Getting all the items
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allItems = await db.select().from(items);

    res.status(200).json({ status: "success", items: allItems });
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

    // 2). Creating requests for images
    if (req.body.images && Array.isArray(req.body.images)) {
      const promises = req.body.images.map((img: string) => {
        return db.insert(images).values({
          isUserImg: false,
          isItemImg: true,
          path: img,
          userId: null,
          itemId: item.id,
        });
      });

      await Promise.all(promises);
    }

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
