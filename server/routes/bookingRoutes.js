import express from "express";
import {
  createBooking,
  getMyBookings,
  getAgentBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.get("/agent", authMiddleware, getAgentBookings);
router.patch("/:id", authMiddleware, updateBookingStatus);

export default router;
