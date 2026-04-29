import express from "express";
import { getMessages, getChatList } from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Get list of users the current user has chatted with
router.get("/list", authMiddleware, getChatList);

// 🔹 Get messages between current user and target user
router.get("/:userId", authMiddleware, getMessages);

export default router;