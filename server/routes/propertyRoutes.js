import express from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  updatePropertyStatus,
  getMyProperties,
} from "../controllers/propertyController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", authMiddleware, updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

// admin / workflow
router.patch("/status/:id", authMiddleware, updatePropertyStatus);

// user dashboard
router.get("/user/my", authMiddleware, getMyProperties);

export default router;

// const router = require("express").Router();
// const Property = require("../models/Property");

// // Create Property
// router.post("/", async (req, res) => {
//   const property = new Property(req.body);
//   await property.save();
//   res.json(property);
// });

// // Get All
// router.get("/", async (req, res) => {
//   const properties = await Property.find();
//   res.json(properties);
// });

// module.exports = router;