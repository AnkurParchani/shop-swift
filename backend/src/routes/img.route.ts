import express from "express";

import {
  addUserImg,
  addItemImage,
  removeUserImg,
  deleteItemImg,
  getUserImg,
} from "../controllers/img.controller";
import { checkIsAdmin, protect } from "../controllers/auth.controller";

const router = express.Router();

router.route("/user").post(addUserImg).delete(protect, removeUserImg);

router.get("/user/:userId", getUserImg);

router.use(protect);
router
  .route("/item")
  .post(checkIsAdmin, addItemImage)
  .delete(checkIsAdmin, deleteItemImg);

export default router;
