import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { addresses } from "../db/schema/address.schema";
import { eq } from "drizzle-orm";
import { User } from "../../global";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Adding new Address
export const addAddress = async (req: CustomRequest, res: Response) => {
  try {
    let address;

    // If this is NOT the default address
    if (!req.body.isDeliveryAddress) {
      address = await db
        .insert(addresses)
        .values({ ...req.body, userId: req.user?.id, isDeliveryAddress: false })
        .returning();
    }

    // If this is the NEW default address
    else {
      await db
        .update(addresses)
        .set({ isDeliveryAddress: false })
        .where(eq(addresses.userId, req.user?.id as number));

      address = await db
        .insert(addresses)
        .values({ ...req.body, userId: req.user?.id, isDeliveryAddress: true })
        .returning();
    }

    res.status(200).json({ status: "success", address });
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong from add Address, check console");
    console.log(err);
  }
};
