import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { items } from "../db/schema/item.schema";
import { and, asc, desc, eq } from "drizzle-orm";
import { images } from "../db/schema/img.schema";
import { handleServerError } from "../utils/handleServerError";
import AppError from "../utils/appError";

// Getting all the items (filtered)
export const getFilteredItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const highPriceFirst = req.query.sort === "price-high";
    const highRatingsFirst = req.query.sort === "ratings-high";
    const lowRatingsFirst = req.query.sort === "ratings-low";

    const { gender, category, min, max } = req.query;

    let allItems = await db.query.items.findMany({
      with: {
        images: { where: eq(images.isItemMainImg, true) },
        reviews: true,
      },

      where: and(
        gender
          ? eq(items.forGender, gender as "male" | "female" | "unisex")
          : undefined,
        category ? eq(items.category, category.toString()) : undefined
      ),

      // Sorting according to the price
      orderBy: [
        highPriceFirst
          ? desc(items.discountedPrice)
          : asc(items.discountedPrice),
      ],
    });

    // Sorting according to the reviews
    if (highRatingsFirst || lowRatingsFirst) {
      allItems = allItems.sort((cur, next) => {
        const curRatings = cur.reviews.reduce(
          (acc, cur) => +cur.stars + acc,
          0
        );
        const nextRatings = next.reviews.reduce(
          (acc, cur) => +cur.stars + acc,
          0
        );

        return highRatingsFirst
          ? nextRatings - curRatings
          : curRatings - nextRatings;
      });
    }

    // Refactoring the items to send
    const itemsToSend = allItems.map((item) => {
      const { images, reviews, ...restOfThem } = item;
      const imgPath =
        images.filter((img) => img.isItemMainImg)[0].path || undefined;
      const rating =
        reviews.reduce((acc, cur) => +cur.stars + acc, 0) || undefined;

      return {
        ...restOfThem,
        image: imgPath,
        numReviews: reviews.length,
        ratings: (rating && rating / reviews.length)?.toFixed(1) || "1.0",
      };
    });

    // The Response
    res.status(200).json({ status: "success", items: itemsToSend });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Getting all the items (non-filtered)
export const getAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let allItems = await db.query.items.findMany({
      with: {
        images: { where: eq(images.isItemMainImg, true) },
        reviews: true,
      },
    });

    // Refactoring the items to send
    const itemsToSend = allItems.map((item) => {
      const { images, reviews, ...restOfThem } = item;
      const imgPath =
        images.filter((img) => img.isItemMainImg)[0].path || undefined;
      const rating =
        reviews.reduce((acc, cur) => +cur.stars + acc, 0) || undefined;

      return {
        ...restOfThem,
        image: imgPath,
        numReviews: reviews.length,
        ratings: (rating && rating / reviews.length)?.toFixed(1) || "1.0",
      };
    });

    // The Response
    res.status(200).json({ status: "success", items: itemsToSend });
  } catch (err) {
    return handleServerError(err, next);
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

    const item = await db.query.items.findFirst({
      where: eq(items.id, +req.params.itemId),
      with: {
        images: true,
        reviews: {
          with: {
            user: {
              with: {
                image: true,
              },
            },
          },
        },
      },
    });

    if (!item)
      return next(new AppError(404, "No item found with that item ID"));

    const rating =
      item.reviews.reduce((acc, cur) => +cur.stars + acc, 0) || undefined;

    const itemToSend = {
      ...item,
      numReviews: item.reviews.length,
      ratings: (rating && rating / item.reviews.length)?.toFixed(1) || "1.0",
    };

    res.status(200).json({ status: "success", item: itemToSend });
  } catch (err) {
    return handleServerError(err, next);
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
    return handleServerError(err, next);
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
    return handleServerError(err, next);
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
    return handleServerError(err, next);
  }
};
