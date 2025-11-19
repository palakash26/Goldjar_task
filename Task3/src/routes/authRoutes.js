import express from "express";
import { register, login, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword); // optional
router.post("/reset-password", resetPassword);   // optional

export default router;
