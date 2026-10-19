import e from "express";
import {
  getConversationsForSidebar,
  getMessages,
  getUsresForSidebar,
  sendMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = e.Router();

router.use(protectRoute);

router.get("/users", getUsresForSidebar);
router.get("/conversations", getConversationsForSidebar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media"), sendMessages);

export default router;
