import express from "express";
import { db } from "./db/dbConnect";
import { users } from "./db/schema/userSchema";

const app = express();

app.get("/", async (req, res) => {
  await db.insert(users).values({
    email: "ankur@gmail.com",
    password: "ankur123",
    name: "Ankur",
  });

  res.send("Working");
});

export default app;
