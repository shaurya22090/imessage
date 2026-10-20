import e from "express";
import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export async function protectRoute(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "UNauthorised" });
      return;
    }

    const clerkId = await User.findOne({ clerkId: userId });

    if (!clerkId) {
      res.status(404).json({ message: "User profile is not synced yet" });
      return;
    }

    req.user = clerkId;

    next();
  } catch (error) {
    console.error("Error in auth Middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
