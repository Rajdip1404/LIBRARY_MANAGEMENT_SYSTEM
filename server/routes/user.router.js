import express from "express";
import { getAllUsers, registerNewAdmin, registerNewLibrarian } from "../controllers/user.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-all-users", isAuthenticated, isAdmin, getAllUsers);
router.post("/register-new-admin", isAuthenticated, isAdmin, registerNewAdmin);
router.post("/register-new-librarian", isAuthenticated, isAdmin, registerNewLibrarian);

export default router;