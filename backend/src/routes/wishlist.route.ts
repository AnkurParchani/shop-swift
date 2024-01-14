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

router.delete("/:wishlistItemId", removeItemFromWishlist);
router.route("/delete-all").delete(clearWishlist);

export default router;
