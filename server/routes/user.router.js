import express from "express";
import { getAllUsers, registerNewAdmin } from "../controllers/user.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-all-users", isAuthenticated, isAdmin, getAllUsers);
router.post("/register-new-admin", isAuthenticated, isAdmin, registerNewAdmin);

export default router;