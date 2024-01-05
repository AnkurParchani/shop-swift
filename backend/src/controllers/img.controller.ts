import { NextFunction, Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { images } from "../db/schema/img.schema";
import { and, eq } from "drizzle-orm";
import AppError from "../utils/appError";
import { handleApiError } from "../utils/handleServerError";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Adding an image request (Item)
export const addItemImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.itemId) return next(new AppError(400, "Provide item ID"));

    if (!req.body.path)
      return next(new AppError(400, "Provide the path for the image"));

    const [image] = await db
      .insert(images)
      .values({
        ...req.body,
        isItemImg: true,
        isUserImg: false,
      })
      .returning();

    res.status(200).json({ status: "success", image });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Removing item image (singular OR all)
export const deleteItemImg = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, itemId, imgId } = req.body;
    if (!type) return next(new AppError(400, "Please provide all the details"));

    // If the request is for to delete all the images of the item
    if (type === "all") {
      const [deletedImgs] = await db
        .delete(images)
        .where(eq(images.itemId, itemId))
        .returning();

      if (!deletedImgs)
        return next(new AppError(404, "No images found for this item"));
    }

    // If the request if for to delete only single image
    if (type === "one") {
      if (!imgId) return next(new AppError(400, "Provide Image Id"));

      const [deletedImg] = await db
        .delete(images)
        .where(and(eq(images.itemId, itemId), eq(images.id, imgId)))
        .returning();

      if (!deletedImg)
        return next(new AppError(404, "No Image found to delete"));
    }

    res.status(200).json({ status: "success", message: "Image deleted" });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Adding Image request (User)
export const addUserImg = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let image;
    if (!req.body.path)
      return next(new AppError(400, "Provide the path for the image"));

    // Checking if there is already User Img
    const checkAlreadyImg = await db
      .select()
      .from(images)
      .where(eq(images.userId, Number(req.user?.id)));

    if (checkAlreadyImg[0]) {
      // Means we have to update the Image
      image = await db
        .update(images)
        .set({ path: req.body.path })
        .where(eq(images.userId, Number(req.user?.id)))
        .returning();
    } else {
      // Create new Image
      image = await db
        .insert(images)
        .values({
          ...req.body,
          isItemImg: false,
          isUserImg: true,
          userId: req.user?.id,
        })
        .returning();
    }

    res.status(200).json({ status: "success", image: image[0] });
  } catch (err) {
    return handleApiError(err, next);
  }
};

// Removing User Image
export const removeUserImg = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const [image] = await db
      .delete(images)
      .where(eq(images.userId, Number(req.user?.id)))
      .returning();

    if (!image)
      return next(new AppError(400, "There is no user img to delete"));

    res
      .status(200)
      .json({ status: "success", message: "Image has been removed" });
  } catch (err) {
    return handleApiError(err, next);
  }
};
