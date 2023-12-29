import express from "express";
import { addAddress, deleteAddress } from "../controllers/address.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.route("/").post(addAddress).delete(deleteAddress);

export default router;
