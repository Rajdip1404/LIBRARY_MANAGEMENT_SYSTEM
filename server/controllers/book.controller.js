import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import ErrorHandler from "../middlewares/error.middleware.js";


export const addBook = catchAsyncErrors(async (req, res, next) => {
    const {title, author, description, rentalPrice, category, quantity} = req.body;

    if(!title || !author || !description || !rentalPrice || !category || !quantity) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    const book = await Book.create({
        title,
        author,
        description,
        rentalPrice,
        category,
        quantity,
    });

    await book.save();

    res.status(201).json({
        success: true,
        book
    });
});

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    const {bookId} = req.params;

    if (!bookId || typeof bookId !== "string") {
      throw new Error("Invalid book ID");
    }
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    await book.deleteOne();

    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        book
    });
});

export const getAllBook = catchAsyncErrors(async (req, res, next) => {
    const books = await Book.find();
    res.status(200).json({
        success: true,
        books
    });
});