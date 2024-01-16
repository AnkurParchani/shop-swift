import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { addresses } from "../db/schema/address.schema";
import { and, eq } from "drizzle-orm";
import { User } from "../../global";
import AppError from "../utils/appError";
import { handleServerError } from "../utils/handleServerError";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting all the addresses of a particular user
export const getAllAddresses = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const allAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, req.user?.id as number));

    res.status(200).json({ status: "success", addresses: allAddresses });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Adding new Address
export const addAddress = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let address;

    // If this is NOT the default address
    if (!req.body.isDeliveryAddress) {
      [address] = await db
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

      [address] = await db
        .insert(addresses)
        .values({ ...req.body, userId: req.user?.id, isDeliveryAddress: true })
        .returning();
    }

    res.status(200).json({ status: "success", address });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Updating an Address
export const updateAddress = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.addressId)
      return next(new AppError(400, "No address Id provided"));

    const userAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, req.user?.id as number));

    // If this is new deliveryAddress then removing the old delivery one
    if (req.body.isDeliveryAddress) {
      await db
        .update(addresses)
        .set({ isDeliveryAddress: false })
        .where(eq(addresses.userId, req.user?.id as number));
    }

    // Updating the address WHERE "userId=loggedIn User id" AND "addressId= provided address Id"
    const [updatedAddress] = await db
      .update(addresses)
      .set({ ...req.body, userId: req.user?.id })
      .where(
        and(
          eq(addresses.id, Number(req.params.addressId)),
          eq(addresses.userId, req.user?.id as number)
        )
      )
      .returning();

    if (!updatedAddress) return next(new AppError(404, "No address found"));

    res.status(200).json({ status: "success", updatedAddress });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Deleting an Address
export const deleteAddress = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.addressId)
      return next(new AppError(400, "No address Id provided"));

    const [addressToDelete] = await db
      .select()
      .from(addresses)
      .where(
        and(
          eq(addresses.id, Number(req.params.addressId)),
          eq(addresses.userId, req.user?.id as number)
        )
      );

    if (!addressToDelete) return next(new AppError(404, "No address found"));

    if (addressToDelete.isDeliveryAddress) {
      return next(new AppError(400, "You can't delete your default Address"));
    }

    // Deleting the address WHERE "userId=loggedIn User id" AND "addressId= provided address Id"
    await db
      .delete(addresses)
      .where(
        and(
          eq(addresses.id, Number(req.params.addressId)),
          eq(addresses.userId, req.user?.id as number)
        )
      );

    res.status(200).json({ status: "success", message: "Address deleted" });
  } catch (err) {
    return handleServerError(err, next);
  }
};
