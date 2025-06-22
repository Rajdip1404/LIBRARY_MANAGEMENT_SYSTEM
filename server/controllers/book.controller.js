// import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
// import User from "../models/user.model.js";
// import Book from "../models/book.model.js";
// import ErrorHandler from "../middlewares/error.middleware.js";


// export const addBook = catchAsyncErrors(async (req, res, next) => {
//     const {title, author, description, rentalPrice, category, quantity} = req.body;

//     if(!title || !author || !description || !rentalPrice || !category || !quantity) {
//         return next(new ErrorHandler("Please enter all fields", 400));
//     }

//     const book = await Book.create({
//         title,
//         author,
//         description,
//         rentalPrice,
//         category,
//         quantity,
//     });

//     await book.save();

//     res.status(201).json({
//         success: true,
//         book
//     });
// });

// export const deleteBook = catchAsyncErrors(async (req, res, next) => {
//     const {bookId} = req.params;

//     if (!bookId || typeof bookId !== "string") {
//       throw new Error("Invalid book ID");
//     }
//     const book = await Book.findById(bookId);
//     if (!book) {
//       throw new Error("Book not found");
//     }

//     await book.deleteOne();

//     res.status(200).json({
//         success: true,
//         message: "Book deleted successfully",
//         book
//     });
// });

// export const getAllBook = catchAsyncErrors(async (req, res, next) => {
//     const books = await Book.find();
//     res.status(200).json({
//         success: true,
//         books
//     });
// });

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import mongoose from "mongoose";

// export const addBook = catchAsyncErrors(async (req, res, next) => {
//     const {
//         title, 
//         author, 
//         description, 
//         rentalPrice, 
//         category, 
//         quantity, 
//         publicationYear, 
//         edition
//     } = req.body;

//     // Validate required fields
//     if(!title || !author || !description || !rentalPrice || !category || 
//        !quantity || !publicationYear) {
//         return next(new ErrorHandler("Please enter all fields", 400));
//     }

//     try {
//         // Check if a book with the same title, publication year and edition already exists
//         const existingBook = await Book.findOne({ 
//             title, 
//             publicationYear, 
//             edition 
//         });

//         if (existingBook) {
//             // If book exists, increase its quantity
//             existingBook.quantity += parseInt(quantity);
//             await existingBook.save();

//             return res.status(200).json({
//                 success: true,
//                 message: "Book quantity updated successfully",
//                 book: existingBook
//             });
//         }

//         // Create new book if it doesn't exist
//         const book = await Book.create({
//             title,
//             author,
//             description,
//             rentalPrice,
//             category,
//             quantity,
//             publicationYear,
//             edition
//         });

//         await book.save();

//         res.status(201).json({
//             success: true,
//             message: "Book added successfully",
//             book
//         });
//     } catch (error) {
//         // Handle possible MongoDB duplicate key error (in case of race condition)
//         if (error.code === 11000) {
//             // Retry with update instead
//             const filter = { 
//                 title, 
//                 publicationYear, 
//                 edition 
//             };
            
//             const update = { 
//                 $inc: { quantity: parseInt(quantity) } 
//             };
            
//             const updatedBook = await Book.findOneAndUpdate(
//                 filter,
//                 update,
//                 { new: true }
//             );

//             return res.status(200).json({
//                 success: true,
//                 message: "Book quantity updated successfully",
//                 book: updatedBook
//             });
//         }
        
//         return next(new ErrorHandler(error.message, 400));
//     }
// });

import cloudinary from "cloudinary";

export const addBook = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    author,
    description,
    rentalPrice,
    category,
    quantity,
    publicationYear,
    edition,
  } = req.body;


  if (
    !title ||
    !author ||
    !description ||
    !rentalPrice ||
    !category ||
    !quantity ||
    !publicationYear
  ) {
    return next(new ErrorHandler("Please enter all required fields", 400));
  }

  try {
    // Check if book already exists (same title + year + edition)
    const existingBook = await Book.findOne({
      title,
      publicationYear,
      edition,
    });

    if (existingBook) {
      existingBook.quantity += parseInt(quantity);
      await existingBook.save();

      return res.status(200).json({
        success: true,
        message: "Book quantity updated successfully",
        book: existingBook,
      });
    }

    // Check for valid image (optional)
    let bookImage = {
      public_id: "default-book-image",
      url: "https://res.cloudinary.com/dh2w4egzp/image/upload/v1749386337/LIBRARY_MANAGEMENT_SYSTEM_BOOK_IMAGES/wuasail2wqueju3nqh7c.png", 
    };

    if (req.files && req.files.image) {
      const image = req.files.image;

      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedFormats.includes(image.mimetype)) {
        return next(new ErrorHandler("Please upload a valid image file", 400));
      }

      const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
          folder: "LIBRARY_MANAGEMENT_SYSTEM_BOOK_IMAGES",
        }
      );

      if (cloudinaryResponse.error) {
        console.error("Cloudinary upload error:", cloudinaryResponse.error);
        return next(new ErrorHandler("Failed to upload image", 500));
      }

      bookImage = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    // Create new book
    const newBook = await Book.create({
      title,
      author,
      description,
      rentalPrice,
      category,
      quantity,
      publicationYear,
      edition,
      bookImage,
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    // If race condition causes duplicate key error
    if (error.code === 11000) {
      const updatedBook = await Book.findOneAndUpdate(
        { title, publicationYear, edition },
        { $inc: { quantity: parseInt(quantity) } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Book quantity updated successfully",
        book: updatedBook,
      });
    }

    return next(new ErrorHandler(error.message, 400));
  }
});


export const updateBook = catchAsyncErrors(async (req, res, next) => {
    const { bookId } = req.params;
    const {
        title, 
        author, 
        description, 
        rentalPrice, 
        category, 
        quantity, 
        publicationYear, 
        edition
    } = req.body;

    if (!bookId) {
        return next(new ErrorHandler("Book ID is required", 400));
    }

    try {
        // Check if update would create a duplicate
        if (title && publicationYear && edition) {
            const duplicateBook = await Book.findOne({
                _id: { $ne: bookId }, // Exclude current book
                title,
                publicationYear,
                edition
            });

            if (duplicateBook) {
                return next(new ErrorHandler("A book with this title, publication year and edition already exists", 400));
            }
        }

        // Update the book
        const book = await Book.findByIdAndUpdate(
            bookId,
            {
                title,
                author,
                description,
                rentalPrice,
                category,
                quantity,
                publicationYear,
                edition
            },
            { new: true, runValidators: true }
        );

        if (!book) {
            return next(new ErrorHandler("Book not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    const { bookId } = req.params;

    if (!bookId || typeof bookId !== "string") {
      return next(new ErrorHandler("Invalid book ID", 400));
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      return next(new ErrorHandler("Book not found", 404));
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

export const getBookByFilters = catchAsyncErrors(async (req, res, next) => {
    const { title, author, category, publicationYear, edition } = req.query;
    
    const filter = {};
    
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (publicationYear) filter.publicationYear = publicationYear;
    if (edition) filter.edition = { $regex: edition, $options: 'i' };
    
    const books = await Book.find(filter);
    
    res.status(200).json({
        success: true,
        count: books.length,
        books
    });
});