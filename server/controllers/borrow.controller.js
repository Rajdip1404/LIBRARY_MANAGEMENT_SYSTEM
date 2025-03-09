import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import Borrow from "../models/borrow.model.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import calculateFine from "../utils/fineCalculator.js";


export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const {borrowedBooks} = req.user;

    res.status(200).json({
        success: true,
        borrowedBooks
    });
});

export const recordBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const {bookId} = req.params;
    const {email} = req.body;
    
    const book = await Book.findById(bookId);
    if(!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }
    
    const user = await User.findOne({email, accountVerified: true, role: "User"});
    
    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if(book.quantity === 0) {
        return next(new ErrorHandler("Book is not available", 400));
    }

    const isAlreadyBorrowed = await user.borrowedBooks.find(
        (borrow) => borrow.bookId && borrow.bookId.toString() === bookId && borrow.returned === false
    )

    if(isAlreadyBorrowed) {
        return next(new ErrorHandler("Book is already borrowed", 400));
    }
    
    book.quantity -= 1;
    book.availability = book.quantity > 0 ? true : false;
    await book.save();

    user.borrowedBooks.push({
      bookId: book._id,
      returned: false,
      bookTitle: book.title,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    await user.save();
    
    const borrow = await Borrow.create({
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        book: book._id,
        price: book.rentalPrice,
        borrowDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    
    await borrow.save();
    
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        borrow
    });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(async (req, res, next) => {
    const borrowedBooks = await Borrow.find();
    console.log(typeof borrowedBooks);
    res.status(200).json({
        success: true,
        borrowedBooks
    });
});

export const returnBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const {bookId} = req.params;
    const {email} = req.body;
    console.log(typeof bookId);
    
    if(!email) {
        return next(new ErrorHandler("Please enter email", 400));
    }
    
    
    const book = await Book.findById(bookId);
    if(!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }
    
    const user = await User.findOne({email, accountVerified: true, role: "User"});
    
    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const borrowedBook = user.borrowedBooks.find(
      (borrow) =>
        borrow.bookId && borrow.bookId.toString() === bookId && borrow.returned === false
    );

    console.log(borrowedBook);

    if(!borrowedBook) {
        return next(new ErrorHandler("Book is not borrowed", 400));
    }

    borrowedBook.returned = true;
    await user.save();

    book.quantity += 1;
    book.availability = book.quantity > 0 ? true : false;
    await book.save();

    const borrow = await Borrow.findOne({
        book: book._id,
        "user.email": email,
        returnDate: null
    });

    if(!borrow) {
        return next(new ErrorHandler("Borrow not found", 404));
    }

    borrow.returnDate = new Date();
    const fine = calculateFine(borrow.dueDate);
    borrow.fine = fine;
    borrow.status = "returned";

    await borrow.save();

    res.status(200).json({
      success: true,
      message:
        fine !== 0
          ? `Book returned successfully with fine. Total charges are ${book.rentalPrice} and fine is ${fine}`
          : `Book returned successfully. Total charges are ${book.rentalPrice}`,
      borrow,
    });
});