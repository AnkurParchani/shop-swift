import { User } from "../../global";
import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { wishlist } from "../db/schema/wishlist.schema";
import { and, eq } from "drizzle-orm";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Adding item to wishlist
export const addItemToWishlist = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.body.itemId) throw new Error("Provide item Id");

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
      throw new Error("You have already added this item in your wishlist");

    // Adding the item to the wishlist
    const [item] = await db
      .insert(wishlist)
      .values({ itemId: req.body.itemId, userId: Number(req.user?.id) })
      .returning();

    res.status(200).json({ status: "success", item });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from addItemToWishlist, check console",
    });

    console.log(err);
  }
};

// Getting all wishlist items
export const getWishlistItems = async (req: CustomRequest, res: Response) => {
  try {
    const items = await db.query.wishlist.findMany({
      where: eq(wishlist.userId, Number(req.user?.id)),
      with: {
        item: true,
      },
    });

    res.status(200).json({ status: "success", items });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from getWishlistItems, check console",
    });

    console.log(err);
  }
};

// Removing wishlist items (particular)
export const removeItemFromWishlist = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.params.wishlistId) throw new Error("Provide the wishlist item Id");

    const itemToDelete = await db
      .delete(wishlist)
      .where(
        and(
          eq(wishlist.userId, Number(req.user?.id)),
          eq(wishlist.id, Number(req.params.wishlistId))
        )
      )
      .returning();

    if (!itemToDelete[0])
      throw new Error("There is no item with the wishlist item id");

    res.status(200).json({ status: "success", message: "item deleted" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from removeItemFromWishlist, check console",
    });

    console.log(err);
  }
};

// Deleting the whole wishlist
export const clearWishlist = async (req: CustomRequest, res: Response) => {
  try {
    const deletedItems = await db
      .delete(wishlist)
      .where(eq(wishlist.userId, Number(req.user?.id)))
      .returning();

    if (!deletedItems[0])
      throw new Error("There are no items in your wishlist");

    res.status(200).json({
      status: "success",
      message: "Your all wishlist items have been deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from clearWishlist, check console",
    });

    console.log(err);
  }
};
