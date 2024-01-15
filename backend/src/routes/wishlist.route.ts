import express from "express";
import {
  addItemToWishlist,
  getWishlistItems,
  clearWishlist,
  removeItemFromWishlist,
} from "../controllers/wishlist.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.route("/").get(getWishlistItems).post(addItemToWishlist);

router.delete("/delete-all", clearWishlist);
router.delete("/:wishlistItemId", removeItemFromWishlist);

export default router;
