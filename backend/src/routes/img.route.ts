import express from "express";

import {
  addUserImg,
  addItemImage,
  removeUserImg,
  deleteItemImg,
  getUserImg,
  getMainItemImgs,
} from "../controllers/img.controller";
import { checkIsAdmin, protect } from "../controllers/auth.controller";
import multer from "multer";

const router = express.Router();

// Set up the storage engine for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/user").post(addUserImg).delete(protect, removeUserImg);

router.get("/user/:userId", getUserImg);
router.get("/items/main-img", getMainItemImgs);
router.use(protect);
router
  .route("/item")
  .post(
    checkIsAdmin,
    upload.fields([
      { name: "mainImg", maxCount: 1 },
      { name: "extraImg", maxCount: 10 },
    ]),
    addItemImage
  )
  .delete(checkIsAdmin, deleteItemImg);

export default router;
