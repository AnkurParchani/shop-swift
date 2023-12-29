import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { items } from "../db/schema/item.schema";

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
    res.status(500).json({ status: "error", message: "check console" });
    console.log(err);
  }
};

// Getting all the items
export const getItems = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "check console" });
    console.log(err);
  }
};

// Getting particular item
export const getItem = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "check console" });
    console.log(err);
  }
};
