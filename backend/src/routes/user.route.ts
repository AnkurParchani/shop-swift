import express from "express";
import {
  deleteAccount,
  login,
  protect,
  signup,
} from "../controllers/auth.controller";
import { getUser } from "../controllers/user.controller";

const router = express.Router();

router.route("/sign-up").post(signup);
router.route("/login").post(login);

router.route("/delete-me").delete(protect, deleteAccount);
router.route("/me").get(protect, getUser);

export default router;
