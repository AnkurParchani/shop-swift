import { Request, Response } from "express";
import { db } from "../db/dbConnect";
import { order_items, orders } from "../db/schema/order.schema";
import { User } from "../../global";
import { and, eq } from "drizzle-orm";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

type OrderItem = {
  itemId: number;
  quantity: number;
  color?: string;
};

// Create Order Request
export const createOrder = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.body.orders || !req.user?.id)
      throw new Error("Provide the order details");

    //  Getting all the orders
    const ordersFromClient: OrderItem[] = req.body.orders;

    // Creating the main order (parent)
    const [mainOrder] = await db
      .insert(orders)
      .values({ userId: req.user.id })
      .returning();

    // Inserting the seperate order item (child)
    const promises = ordersFromClient.map(async (order) => {
      const orderItemValues = {
        orderId: mainOrder.id,
        itemId: order.itemId,
        quantity: order.quantity,
        color: order.color || undefined,
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
    res.status(500).json({
      status: "error",
      message: "error from createOrder, check console",
    });

    console.log(err);
  }
};

// Get my Orders
export const getMyOrders = async (req: CustomRequest, res: Response) => {
  try {
    const myOrders = await db.query.orders.findMany({
      where: eq(orders.userId, Number(req.user?.id)),
      with: {
        orderItems: true,
      },
    });

    res.status(200).json({ status: "success", myOrders });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from getMyOrders, check console",
    });
    console.log(err);
  }
};

// Get single order
export const getSingleOrder = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.params.orderId) throw new Error("Provide the order Id");

    const order = await db.query.orders.findFirst({
      where: and(
        eq(orders.userId, Number(req.user?.id)),
        eq(orders.id, Number(req.params.orderId))
      ),
      with: {
        orderItems: true,
      },
    });

    if (!order) throw new Error("No order found with the given ID");

    res.status(200).json({ status: "success", order });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from getSingleOrder, check console",
    });
    console.log(err);
  }
};

// No routes for DELETE and UPDATE order.
////////////////////////////////////////
