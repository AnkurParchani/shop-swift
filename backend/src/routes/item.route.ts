import express from "express";
import { createItem, getItems, getItem } from "../controllers/item.controller";

const router = express();

router.route("/").get(getItems).post(createItem);
router.route("/:itemId").get(getItem);

export default router;
