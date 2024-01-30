import express from "express";

import {
  createItem,
  getFilteredItems,
  getItem,
  deleteItem,
  updateItem,
  getAllItems,
} from "../controllers/item.controller";
import { checkIsAdmin, protect } from "../controllers/auth.controller";

const router = express();

router.route("/").get(getFilteredItems).post(protect, checkIsAdmin, createItem);
router.route("/all-items").get(getAllItems);

router
  .route("/:itemId")
  .get(getItem)
  .patch(protect, checkIsAdmin, updateItem)
  .delete(protect, checkIsAdmin, deleteItem);

export default router;
