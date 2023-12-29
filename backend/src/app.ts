import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

import userRoutes from "./routes/user.route";
import itemRoutes from "./routes/item.route";

const app = express();

// Getting env variable
configDotenv({ path: ".env" });

// To access data as JSON format
app.use(express.json());

// To implement CORS
app.use(cors());

// For reading cookies
app.use(cookieParser());

// Routes
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

export default app;
