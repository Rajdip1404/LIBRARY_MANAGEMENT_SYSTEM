import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import Borrow from "../models/borrow.model.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import calculateFine from "../utils/fineCalculator.js";

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const { borrowedBooks } = req.user;

  res.status(200).json({
    success: true,
    borrowedBooks,
  });
});

// export const requestBorrowBook = catchAsyncErrors(async (req, res, next) => {
//   const { bookId } = req.params;
//   const { email } = req.body;

//   const book = await Book.findById(bookId);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book not found",
//     });
//   }

//   const user = await User.findOne({
//     email,
//     accountVerified: true,
//     role: "User",
//   });

//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   if (book.quantity === 0) {
//     return next(new ErrorHandler("Book is not available", 400));
//   }

//   const isAlreadyBorrowed = await user.borrowedBooks.find(
//     (borrow) =>
//       borrow.bookId &&
//       borrow.bookId.toString() === bookId &&
//       borrow.returned === false
//   );

//   if (isAlreadyBorrowed) {
//     return next(new ErrorHandler("Book is already borrowed", 400));
//   }

//   book.quantity -= 1;
//   book.availability = book.quantity > 0 ? true : false;
//   await book.save();

//   const borrow = await Borrow.create({
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     },
//     book: book._id,
//     price: book.rentalPrice,
//     dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     status: "requested",
//   });

//   await borrow.save();

//   res.status(201).json({
//     success: true,
//     message: "Requested to borrow book successfully",
//     borrow,
//   });
// });

export const requestBorrowBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email, duration } = req.body;

  const book = await Book.findById(bookId);
  if (!book) return next(new ErrorHandler("Book not found", 404));

  const user = await User.findOne({
    email,
    accountVerified: true,
    role: "User",
  });
  if (!user) return next(new ErrorHandler("User not found", 404));

  if (book.quantity === 0)
    return next(new ErrorHandler("Book is not available", 400));

  const isAnyDueDateCrossed = user.borrowedBooks.some(
    (borrow) =>
      borrow.dueDate &&
      borrow.dueDate.getTime() < new Date().getTime() &&
      !borrow.returned
  );
  if (isAnyDueDateCrossed)
    return next(
      new ErrorHandler(
        "Please clear the previous due books before requesting a new book",
        400
      )
    );

  const isAlreadyBorrowed = user.borrowedBooks.find(
    (borrow) => borrow.book?.toString() === bookId && !borrow.returned
  );
  if (isAlreadyBorrowed)
    return next(new ErrorHandler("Book is already borrowed", 400));

  // Validate duration
  const validDurations = ["7", "14", "21", "28"];
  if (!validDurations.includes(duration)) {
    return next(new ErrorHandler("Invalid duration", 400));
  }

  const price = book.rentalPrice?.get(duration);
  if (price === undefined) {
    return next(
      new ErrorHandler("Rental price not defined for this duration", 400)
    );
  }

  const dueDate = new Date(
    Date.now() + parseInt(duration) * 24 * 60 * 60 * 1000
  );

  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();

  const borrow = await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: book._id,
    duration,
    price,
    dueDate,
    status: "requested",
  });

  res.status(201).json({
    success: true,
    message: "Requested to borrow book successfully",
    borrow,
  });
});




export const confirmBorrowRequest = catchAsyncErrors(async (req, res, next) => {
  const { borrowId } = req.params;

  const borrowRecord = await Borrow.findById(borrowId);
  if (!borrowRecord)
    return next(new ErrorHandler("Borrow request not found", 404));
  if (borrowRecord.status === "borrowed")
    return next(new ErrorHandler("Already borrowed", 400));
  if (borrowRecord.status === "returned")
    return next(new ErrorHandler("Already returned", 400));

  const durationDays = parseInt(borrowRecord.duration || "7");
  const borrowDate = new Date();
  const dueDate = new Date(
    borrowDate.getTime() + durationDays * 24 * 60 * 60 * 1000
  );

  borrowRecord.borrowDate = borrowDate;
  borrowRecord.dueDate = dueDate;
  borrowRecord.status = "borrowed";
  await borrowRecord.save();

  const user = await User.findById(borrowRecord.user.id);
  const book = await Book.findById(borrowRecord.book);

  user.borrowedBooks.push({
    bookId: book._id,
    returned: false,
    bookTitle: book.title,
    borrowDate,
    dueDate,
  });
  await user.save();

  res.status(200).json({
    success: true,
    message: "Book borrowed to user successfully",
    borrow: borrowRecord,
  });
});

// export const recordBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
//   const { bookId } = req.params;
//   const { email } = req.body;

//   const book = await Book.findById(bookId);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book not found",
//     });
//   }

//   const user = await User.findOne({
//     email,
//     accountVerified: true,
//     role: "User",
//   });

//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   if (book.quantity === 0) {
//     return next(new ErrorHandler("Book is not available", 400));
//   }

//   const isAlreadyBorrowed = await user.borrowedBooks.find(
//     (borrow) =>
//       borrow.bookId &&
//       borrow.bookId.toString() === bookId &&
//       borrow.returned === false
//   );

//   if (isAlreadyBorrowed) {
//     return next(new ErrorHandler("Book is already borrowed", 400));
//   }

//   book.quantity -= 1;
//   book.availability = book.quantity > 0 ? true : false;
//   await book.save();

//   user.borrowedBooks.push({
//     bookId: book._id,
//     returned: false,
//     bookTitle: book.title,
//     borrowDate: new Date(),
//     dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   });
//   await user.save();

//   const borrow = await Borrow.create({
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     },
//     book: book._id,
//     price: book.rentalPrice,
//     borrowDate: new Date(),
//     dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   });

//   await borrow.save();

//   res.status(201).json({
//     success: true,
//     message: "Book borrowed successfully",
//     borrow,
//   });
// });

export const recordBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email, duration } = req.body;

  
  const book = await Book.findById(bookId);
  if (!book) return next(new ErrorHandler("Book not found", 404));
  console.log(book);

  const user = await User.findOne({
    email,
    accountVerified: true,
    role: "User",
  });
  if (!user) return next(new ErrorHandler("User not found", 404));

  if (book.quantity === 0)
    return next(new ErrorHandler("Book is not available", 400));

  const isAlreadyBorrowed = user.borrowedBooks.find(
    (borrow) => borrow.bookId?.toString() === bookId && !borrow.returned
  );
  if (isAlreadyBorrowed)
    return next(new ErrorHandler("Book is already borrowed", 400));

  const validDurations = ["7", "14", "21", "28"];
  if (!validDurations.includes(duration)) {
    return next(new ErrorHandler("Invalid duration", 400));
  }

  const price = book.rentalPrice?.get(duration);
  if (price === undefined) {
    return next(
      new ErrorHandler("Rental price not defined for this duration", 400)
    );
  }

  const borrowDate = new Date();
  const dueDate = new Date(
    borrowDate.getTime() + parseInt(duration) * 24 * 60 * 60 * 1000
  );

  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();

  user.borrowedBooks.push({
    bookId: book._id,
    returned: false,
    bookTitle: book.title,
    borrowDate,
    dueDate,
  });
  await user.save();

  const borrow = await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: book._id,
    duration,
    price,
    borrowDate,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    borrow,
  });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const borrowedBooks = await Borrow.find();
    res.status(200).json({
      success: true,
      borrowedBooks,
    });
  }
);

export const returnBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter email", 400));
  }

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  const user = await User.findOne({
    email,
    accountVerified: true,
    role: "User",
  });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const borrowedBook = user.borrowedBooks.find(
    (borrow) =>
      borrow.bookId &&
      borrow.bookId.toString() === bookId &&
      borrow.returned === false
  );

  console.log(borrowedBook);

  if (!borrowedBook) {
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
    returnDate: null,
  });

  if (!borrow) {
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
