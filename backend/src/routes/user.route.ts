import express from "express";
import { Request, Response } from "express";
import {
  deleteAccount,
  login,
  protect,
  signup,
} from "../controllers/auth.controller";

const router = express.Router();

router.route("/sign-up").post(signup);
router.route("/login").post(login);

router.route("/delete-me").delete(protect, deleteAccount);

export default router;
