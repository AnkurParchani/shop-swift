import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { addresses } from "../db/schema/address.schema";
import { and, eq } from "drizzle-orm";
import { User } from "../../global";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting all the addresses of a particular user
export const getAllAddresses = async (req: CustomRequest, res: Response) => {
  try {
    const allAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, req.user?.id as number));

    res.status(200).json({ status: "success", addresses: allAddresses });
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong from Get all Addresses, check console");
    console.log(err);
  }
};

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

// Deleting an Address
export const deleteAddress = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.body.addressId) throw new Error("No address Id provided");

    // Deleting the address WHERE "userId=loggedIn User id" AND "addressId= provided address Id"
    const [address] = await db
      .delete(addresses)
      .where(
        and(
          eq(addresses.id, req.body.addressId),
          eq(addresses.userId, req.user?.id as number)
        )
      )
      .returning();

    if (!address) throw new Error("No address found");

    res.status(200).json({ status: "success", message: "Address deleted" });
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong from delete Address, check console");
    console.log(err);
  }
};
