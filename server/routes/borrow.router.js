import express from "express";
import {
  borrowedBooks,
  recordBorrowedBooks,
  getBorrowedBooksForAdmin,
  returnBorrowedBooks,
} from "../controllers/borrow.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/record-borrowed-books/:bookId", isAuthenticated, isAdmin, recordBorrowedBooks);
router.get("/my-borrowed-books", isAuthenticated, borrowedBooks);
router.get("/borrowed-books-by-users", isAuthenticated, isAdmin, getBorrowedBooksForAdmin);
router.put("/return-borrowed-books/:bookId", isAuthenticated, isAdmin, returnBorrowedBooks);

export default router;