import express from "express";
import {
  borrowedBooks,
  recordBorrowedBooks,
  getBorrowedBooksForAdmin,
  returnBorrowedBooks,
} from "../controllers/borrow.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isLibrarianOrAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/record-borrowed-books/:bookId", isAuthenticated, isLibrarianOrAdmin, recordBorrowedBooks);
router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);
router.get("/borrowed-books-by-users", isAuthenticated, isLibrarianOrAdmin, getBorrowedBooksForAdmin);
router.put("/return-borrowed-books/:bookId", isAuthenticated, isLibrarianOrAdmin, returnBorrowedBooks);

export default router;