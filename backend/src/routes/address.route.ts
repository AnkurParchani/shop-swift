import express from "express";
import {
  addAddress,
  deleteAddress,
  getAllAddresses,
} from "../controllers/address.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllAddresses).post(addAddress).delete(deleteAddress);

export default router;
