import express from "express";
import { protect } from "../controllers/auth.controller";
import { createPaymentIntent } from "../controllers/stripe.controller";

const router = express.Router();

router.use(protect);

router.route("/payment-intent").post(createPaymentIntent);

export default router;
