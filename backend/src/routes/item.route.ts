import express from "express";
import {
  createItem,
  getItems,
  getItem,
  deleteItem,
} from "../controllers/item.controller";
import { checkIsAdmin, protect } from "../controllers/auth.controller";

const router = express();

router
  .route("/")
  .get(getItems)
  .post(protect, checkIsAdmin, createItem)
  .delete(protect, checkIsAdmin, deleteItem);

router.route("/:itemId").get(getItem);

export default router;
