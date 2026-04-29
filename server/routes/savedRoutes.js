import express from "express";
import {
  saveProperty,
  unsaveProperty,
  getSavedProperties,
} from "../controllers/savedController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveProperty);
router.get("/", authMiddleware, getSavedProperties);
router.delete("/:propertyId", authMiddleware, unsaveProperty);

export default router;
