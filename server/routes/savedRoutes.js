import express from "express";
import {
  saveProperty,
  unsaveProperty,
  getSavedProperties,
} from "../controllers/savedController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, saveProperty);
router.get("/", isAuthenticated, getSavedProperties);
router.delete("/:propertyId", isAuthenticated, unsaveProperty);

export default router;
