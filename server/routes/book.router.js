import { isAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import { addBook, deleteBook, getAllBook } from "../controllers/book.controller.js";
import express from "express";

const router = express.Router();

router.post("/admin/add-book", isAuthenticated, isAdmin ,addBook);
router.delete("/admin/delete-book/:bookId", isAuthenticated, isAdmin ,deleteBook);
router.get("/get-all-books", isAuthenticated, getAllBook);

export default router;
