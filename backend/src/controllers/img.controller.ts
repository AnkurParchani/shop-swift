import { NextFunction, Request, Response } from "express";
import { ImgFile, User } from "../../global";
import { db } from "../db/dbConnect";
import { images } from "../db/schema/img.schema";
import { and, eq } from "drizzle-orm";
import { handleServerError } from "../utils/handleServerError";

import AppError from "../utils/appError";
import { uploadItemImgToSupabase } from "../utils/helpers";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Get user img
export const getUserImg = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.userId)
      return next(new AppError(400, "Please provide user id first"));

    const [img] = await db
      .select()
      .from(images)
      .where(eq(images.userId, +req.params.userId));

    res.status(200).json({ status: "success", img });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Get main item images
export const getMainItemImgs = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const mainImages = await db
      .select()
      .from(images)
      .where(eq(images.isItemMainImg, true));

    const imgsToSend = mainImages.map((img) => {
      const { itemId, path } = img;
      return { itemId, path };
    });

    res.status(200).json({ status: "success", mainImages: imgsToSend });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Adding an image request (Item)
export const addItemImage = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.itemId) return next(new AppError(400, "Provide item ID"));

    // @ts-ignore
    const { mainImg, extraImg } = req.files;

    // If there is main image for the item
    if (mainImg) {
      const data = await uploadItemImgToSupabase(
        "items",
        mainImg[0],
        req.body.itemId
      );

      await db.insert(images).values({
        isItemExtraImg: false,
        isItemMainImg: true,
        isUserImg: false,
        path: `https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/${data.path}`,
        userId: null,
        itemId: req.body.itemId,
      });
    }

    // If there are extra images for the item
    if (extraImg) {
      for (const img of extraImg) {
        const data = await uploadItemImgToSupabase(
          "items",
          img,
          req.body.itemId
        );

        await db.insert(images).values({
          isItemExtraImg: true,
          isItemMainImg: false,
          isUserImg: false,
          path: `https://plgvwkkuqxvmjvnjiybq.supabase.co/storage/v1/object/public/items/${data.path}`,
          userId: null,
          itemId: req.body.itemId,
        });
      }
    }

    res.status(200).json({ status: "success", message: "Images uploaded" });
  } catch (err) {
    return handleServerError(err, next);
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
    return handleServerError(err, next);
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
      .where(eq(images.userId, Number(req.user?.id) || req.body.userId));

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
          userId: req.user?.id || req.body.userId,
        })
        .returning();
    }

    res.status(200).json({ status: "success", image: image[0] });
  } catch (err) {
    return handleServerError(err, next);
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
    return handleServerError(err, next);
  }
};
