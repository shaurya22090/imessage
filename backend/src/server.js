import express from "express";
import cors from "cors";

import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";

import User from "./models/User.js";
import { connectDb } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;
const frontendURL = process.env.Frontend_URL;

app.use(clerkMiddleware);
app.use(express.json());
app.use(cors({ origin: frontendURL, Credential: true }));

app.get("/Health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  connectDb();
  console.log("The server is running on PORT:", PORT);
});
