import express from "express";
import { protect } from "../controllers/auth.controller";
import { getPaymentIntent } from "../controllers/stripe.controller";

const router = express.Router();

router.use(protect);

router.route("/payment-intent").get(getPaymentIntent);

export default router;
