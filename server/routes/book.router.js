import { isLibrarianOrAdmin, isAuthenticated } from "../middlewares/auth.middleware.js";
import { addBook, deleteBook, getAllBook, updateBook } from "../controllers/book.controller.js";
import express from "express";

const router = express.Router();

router.post("/admin/add-book", isAuthenticated, isLibrarianOrAdmin, addBook);
router.delete(
  "/admin/delete-book/:bookId",
  isAuthenticated,
  isLibrarianOrAdmin,
  deleteBook
);
router.put("/admin/update-book/:bookId", isAuthenticated, isLibrarianOrAdmin, updateBook);
router.get("/get-all-books", getAllBook);

export default router;
