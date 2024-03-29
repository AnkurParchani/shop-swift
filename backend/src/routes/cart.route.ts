import express from "express";
import {
  addItemToCart,
  clearCart,
  getAllItemsFromCart,
  removeItemFromCart,
  updateCartItem,
} from "../controllers/cart.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.route("/").get(getAllItemsFromCart).post(addItemToCart);

router.route("/delete-all").delete(clearCart);
router.route("/:cartId").patch(updateCartItem).delete(removeItemFromCart);

export default router;
