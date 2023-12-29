import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { items } from "../db/schema/item.schema";
import { eq } from "drizzle-orm";

// Getting all the items
export const getItems = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: "success" });
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
    res.status(200).json({ status: "success" });
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
    const [item] = await db
      .insert(items)
      .values({
        ...req.body,
      })
      .returning();

    res.status(200).json({ status: "success", item });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from create item, check console",
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
