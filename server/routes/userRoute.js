import express from 'express';  

import { loginUser, registerUser, verfication, logoutUser, forgotPassword, verifyOTP, changePassword, getUserStats } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { userSchema, validateUser } from '../validators/userValidate.js';

const router = express.Router();

router.post("/register",validateUser(userSchema), registerUser);
router.post("/verify", verfication);
router.post("/login", loginUser);
router.post("/logout",isAuthenticated, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", verifyOTP);
router.post("/change-password/:email", changePassword);
router.get("/stats", isAuthenticated, getUserStats);

export default router;