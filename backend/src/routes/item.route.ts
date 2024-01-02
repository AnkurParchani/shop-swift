import express from "express";

import {
  createItem,
  getItems,
  getItem,
  deleteItem,
  updateItem,
} from "../controllers/item.controller";
import { checkIsAdmin, protect } from "../controllers/auth.controller";

const router = express();

router
  .route("/")
  .get(getItems)
  .post(protect, checkIsAdmin, createItem)
  .delete(protect, checkIsAdmin, deleteItem);

router.route("/:itemId").get(getItem).patch(protect, checkIsAdmin, updateItem);

export default router;
