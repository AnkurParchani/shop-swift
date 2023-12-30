import express from "express";
import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "../controllers/order.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.route("/").post(createOrder).get(getMyOrders);

router.route("/:orderId").get(getSingleOrder);

export default router;
