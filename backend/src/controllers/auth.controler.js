import e from "express";

export async function checkAuth(req, res, next) {
  const user = req.user;

  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.status(200).json(req.user);
}
