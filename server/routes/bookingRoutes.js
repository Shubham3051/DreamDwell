import express from "express";
import {
  createBooking,
  getMyBookings,
  getAgentBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createBooking);
router.get("/my", isAuthenticated, getMyBookings);
router.get("/agent", isAuthenticated, getAgentBookings);
router.patch("/:id", isAuthenticated, updateBookingStatus);

export default router;
