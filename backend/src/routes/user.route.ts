import express from "express";

import { login, signup } from "../controllers/auth.controller";

const router = express.Router();

router.route("/sign-up").post(signup);
router.route("/login").post(login);

export default router;
