import express from "express";
import {
  registerUser,
  loginUser,
  verfication,
  forgotPassword,
  verifyOTP,
  changePassword,
  getUserStats,
  getAgentStats,
  logoutUser,
} from "../controllers/userController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// ======================
// AUTH
// ======================
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);


// ======================
// EMAIL VERIFICATION
// ======================
router.post("/verify/:token", verfication);


// ======================
// USER INFO
// ======================
router.get("/me", authMiddleware, getUserStats);
router.get("/agent-stats", authMiddleware, getAgentStats);


// ======================
// PASSWORD RESET FLOW
// ======================
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", changePassword);

export default router;