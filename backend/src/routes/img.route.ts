import express from "express";

import {
  addUserImg,
  addItemImage,
  removeUserImg,
  deleteItemImg,
} from "../controllers/img.controller";
import { checkIsAdmin, protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router
  .route("/item")
  .post(checkIsAdmin, addItemImage)
  .delete(checkIsAdmin, deleteItemImg);

router.route("/user").post(addUserImg).delete(removeUserImg);

export default router;
