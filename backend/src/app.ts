import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

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

export default app;
