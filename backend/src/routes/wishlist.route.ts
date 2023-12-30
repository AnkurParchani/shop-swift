import express from "express";
import {
  addItemToWishlist,
  getWishlistItems,
  removeFullWishlist,
  removeItemFromWishlist,
} from "../controllers/wishlist.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.route("/").get(getWishlistItems).post(addItemToWishlist);

router.route("/delete-all").delete(removeFullWishlist);
router.route("/:wishlistId").delete(removeItemFromWishlist);

export default router;
