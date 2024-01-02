import express from "express";
import {
  addAddress,
  deleteAddress,
  getAllAddresses,
  updateAddress,
} from "../controllers/address.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllAddresses).post(addAddress);

router.route("/:addressId").patch(updateAddress).delete(deleteAddress);

export default router;
