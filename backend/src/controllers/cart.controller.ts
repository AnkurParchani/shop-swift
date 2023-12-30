import { Request, Response } from "express";
import { User } from "../../global";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Adding item to cart
export const addItemToCart = async (req: CustomRequest, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: "error from addItemToCart, check console",
    });
    console.log(err);
  }
};

// Get all cart items
export const getAllItemsFromCart = async (
  req: CustomRequest,
  res: Response
) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: "error from getAllItemsFromCart, check console",
    });
    console.log(err);
  }
};

// Removing item from cart (one)
export const removeItemFromCart = async (req: CustomRequest, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: "error from removeItemFromCart, check console",
    });
    console.log(err);
  }
};

// Removing item from cart (all)
export const clearCart = async (req: CustomRequest, res: Response) => {
  try {
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: "error from clearCart, check console",
    });
    console.log(err);
  }
};
