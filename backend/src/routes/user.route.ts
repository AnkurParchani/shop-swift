import express from "express";
import {
  deleteAccount,
  login,
  protect,
  signup,
} from "../controllers/auth.controller";
import {
  getUser,
  updateMe,
  updatePassword,
} from "../controllers/user.controller";

const router = express.Router();

router.route("/sign-up").post(signup);
router.route("/login").post(login);

router.use(protect);
router.route("/me").get(getUser);
router.route("/update-me").patch(updateMe);
router.route("/update-password").patch(updatePassword);
router.route("/delete-me").delete(deleteAccount);

export default router;
