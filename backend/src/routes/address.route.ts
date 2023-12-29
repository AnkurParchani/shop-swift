import express from "express";
import { addAddress } from "../controllers/address.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.route("/").post(protect, addAddress);

export default router;
