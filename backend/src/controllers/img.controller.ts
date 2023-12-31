import { Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { images } from "../db/schema/img.schema";
import { eq } from "drizzle-orm";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Adding an image request (Item)
export const addItemImage = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.body.itemId) throw new Error("Provide item ID");

    if (!req.body.path) throw new Error("Provide the path for the image");

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
    res.status(500).json({
      status: "error",
      message: "Error from addItemImage, check console",
    });

    console.log(err);
  }
};

// Adding Image request (User)
export const addUserImg = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.body.path) throw new Error("Provide the path for the image");
    let image;

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
    res.status(500).json({
      status: "error",
      message: "Error from addUserImage, check console",
    });

    console.log(err);
  }
};

// Removing User Image
export const removeUserImg = async (req: CustomRequest, res: Response) => {
  try {
    const [image] = await db
      .delete(images)
      .where(eq(images.userId, Number(req.user?.id)))
      .returning();

    if (!image) throw new Error("There is no user img to delete");

    res
      .status(200)
      .json({ status: "success", message: "Image has been removed" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from removeUserImg, check console",
    });
    console.log(err);
  }
};
