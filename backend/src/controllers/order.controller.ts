import { NextFunction, Request, Response } from "express";
import { db } from "../db/dbConnect";
import { order_items, orders } from "../db/schema/order.schema";
import { User } from "../../global";
import { and, eq } from "drizzle-orm";
import AppError from "../utils/appError";
import { handleServerError } from "../utils/handleServerError";
import { addresses } from "../db/schema/address.schema";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

type OrderItem = {
  itemId: number;
  quantity: number;
  color?: string;
  size: string;
};

// Create Order Request
export const createOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.orders || !req.user?.id)
      return next(new AppError(400, "Provide the order details"));

    // Getting the defualt address of the user and throwing error if it doesn't exist
    const defaultAddress = await db.query.addresses.findFirst({
      where: and(
        eq(addresses.userId, req.user.id),
        eq(addresses.isDeliveryAddress, true)
      ),
    });

    if (!defaultAddress?.id)
      return next(
        new AppError(
          400,
          "You must have a default address before ordering anything"
        )
      );

    //  Getting all the orders
    const ordersFromClient: OrderItem[] = req.body.orders;

    // Creating the main order (parent)
    const [mainOrder] = await db
      .insert(orders)
      .values({ userId: req.user.id, addressId: defaultAddress.id })
      .returning();

    // Inserting the seperate order item (child)
    const promises = ordersFromClient.map(async (order) => {
      const orderItemValues = {
        orderId: mainOrder.id,
        itemId: order.itemId,
        quantity: order.quantity,
        color: order.color || undefined,
        size: order.size,
      };

      return db.insert(order_items).values(orderItemValues).returning();
    });

    const seperateOrder_item = await Promise.all(promises);

    res.status(200).json({
      status: "success",
      order: mainOrder,
      orderItems: seperateOrder_item,
    });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Get my Orders
export const getMyOrders = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const myOrders = await db.query.orders.findMany({
      where: eq(orders.userId, Number(req.user?.id)),
      with: {
        orderItems: {
          with: {
            item: true,
          },
        },
      },
    });

    res.status(200).json({ status: "success", myOrders });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Get single order
export const getSingleOrder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.orderId)
      return next(new AppError(400, "Provide the order Id"));

    const order = await db.query.orders.findFirst({
      where: and(
        eq(orders.userId, Number(req.user?.id)),
        eq(orders.id, Number(req.params.orderId))
      ),
      with: {
        orderItems: {
          with: {
            item: true,
          },
        },
        address: true,
      },
    });

    if (!order)
      return next(new AppError(404, "No order found with the given ID"));

    res.status(200).json({ status: "success", order });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// No routes will be made for DELETE and UPDATE order.
////////////////////////////////////////
