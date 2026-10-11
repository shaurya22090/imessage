import express, { application } from "express";
import cors from "cors";

import "dotenv/config";

import fs from "fs";
import path from "path";

import { clerkMiddleware } from "@clerk/express";

import User from "./models/User.js";
import { connectDb } from "./lib/db.js";
import job from "./lib/cron.js";

import clerkwebhook from "./webhooks/clerk.webhook.js";

const app = express();

const PORT = process.env.PORT;
const frontendURL = process.env.Frontend_URL;

const publicDir = path.join(process.cwd(), "public");

app.use(
  "/api/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkwebhook,
);

app.use(clerkMiddleware);
app.use(express.json());
app.use(cors({ origin: frontendURL, Credential: true }));

app.get("/Health", (req, res) => {
  res.status(200).json({ ok: true });
});

// if public directory exists, serve the static files
// this is fro production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log("The server is running on PORT:", PORT);

  if (process.env.NODE_ENV == "production") job.start();
});
