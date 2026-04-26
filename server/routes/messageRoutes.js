import express from "express";
import { getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:user1/:user2", getMessages);

export default router;