import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { items } from "../db/schema/item.schema";
import { eq } from "drizzle-orm";
import { images } from "../db/schema/img.schema";

// Getting all the items
export const getItems = async (req: Request, res: Response) => {
  try {
    const allItems = await db.select().from(items);

    res.status(200).json({ status: "success", items: allItems });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "error from getItems, check console" });
    console.log(err);
  }
};

// Getting particular item
export const getItem = async (req: Request, res: Response) => {
  try {
    if (!req.params.itemId) throw new Error("Provide valid itemId");

    const [item] = await db
      .select()
      .from(items)
      .where(eq(items.id, Number(req.params.itemId)));

    if (!item) throw new Error("No item found with that item ID");

    res.status(200).json({ status: "success", item });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "error from get item, check console" });
    console.log(err);
  }
};

// Creating an item
export const createItem = async (req: Request, res: Response) => {
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
    // res.status(200).json({ status: "success", item });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from create item, check console",
    });
    console.log(err);
  }
};

// Update as Item
export const updateItem = async (req: Request, res: Response) => {
  try {
    if (!req.params.itemId) throw new Error("Provide valid itemId");

    const [item] = await db
      .select()
      .from(items)
      .where(eq(items.id, Number(req.params.itemId)));

    if (!item) throw new Error("No item found with provided ItemID");

    const [updatedItem] = await db
      .update(items)
      .set({ ...req.body, id: item.id })
      .where(eq(items.id, Number(req.params.itemId)))
      .returning();

    res.status(200).json({ status: "success", updatedItem });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error from updateItem, check console",
    });
    console.log(err);
  }
};

// Deleting an Item
export const deleteItem = async (req: Request, res: Response) => {
  try {
    if (!req.body.itemId) throw new Error("Provide item Id");

    const [item] = await db
      .delete(items)
      .where(eq(items.id, req.body.itemId))
      .returning();

    if (!item) throw new Error("No item found with provided item Id");

    res
      .status(200)
      .json({ status: "success", message: "Item has been deleted" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from deleteItem, check console",
    });
    console.log(err);
  }
};
