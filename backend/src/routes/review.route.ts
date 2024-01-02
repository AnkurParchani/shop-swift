import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controllers/review.controller";
import { protect } from "../controllers/auth.controller";

const router = express();

router.use(protect);
router.route("/").get(getReviews).post(createReview);

router.route("/:reviewId").delete(deleteReview).patch(updateReview);

export default router;
