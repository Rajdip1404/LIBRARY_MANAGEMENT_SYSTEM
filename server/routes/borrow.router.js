import express from "express";
import {
  borrowedBooks,
  requestBorrowBook,
  confirmBorrowRequest,
  recordBorrowedBooks,
  getBorrowedBooksForAdmin,
  returnBorrowedBooks,
} from "../controllers/borrow.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isLibrarianOrAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/record-borrowed-books/:bookId", isAuthenticated, isLibrarianOrAdmin, recordBorrowedBooks);
router.post("/request-borrow-book/:bookId", isAuthenticated, requestBorrowBook);
router.put("/confirm-borrow-request/:borrowId", isAuthenticated, isLibrarianOrAdmin, confirmBorrowRequest);
router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);
router.get("/borrowed-books-by-users", isAuthenticated, isLibrarianOrAdmin, getBorrowedBooksForAdmin);
router.put("/return-borrowed-books/:bookId", isAuthenticated, isLibrarianOrAdmin, returnBorrowedBooks);

export default router;