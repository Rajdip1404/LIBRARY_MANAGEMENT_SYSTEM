import express from "express";
import { register, verifyEmail, login, logout, getUser, forgotPassword, resetPassword, updatePassword } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/get-user", isAuthenticated ,getUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);
router.put("/update-password", isAuthenticated, updatePassword);



export default router;