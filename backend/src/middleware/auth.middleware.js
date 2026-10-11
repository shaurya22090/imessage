import e from "express";
import { getAuth } from "@clerk/express";
import User from "../models/User";

export async function protectRoute(req, res, next) {
  try {
    const { userID } = getAuth(req);

    if (!userID) {
      res.status(401).json({ message: "UNauthorised" });
      return;
    }

    const clerkId = await User.findOne({ clerkId: userID });

    if (!clerkId) {
      res.status(404).json({ message: "User profile is not synced yet" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in auth Middleware", error);
    req.status(500).json({ message: "Internal Server Error" });
  }
}
