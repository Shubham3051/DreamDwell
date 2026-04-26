import express from "express";
import { getMessages, getChatList } from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Get list of users the current user has chatted with
router.get("/list", isAuthenticated, getChatList);

// 🔹 Get messages between current user and target user
router.get("/:userId", isAuthenticated, getMessages);

export default router;