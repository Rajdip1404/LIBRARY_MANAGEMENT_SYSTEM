import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

// export const addBook = catchAsyncErrors(async (req, res, next) => {
//   const {
//     title,
//     author,
//     description,
//     rentalPrice,
//     category,
//     quantity,
//     publicationYear,
//     edition,
//   } = req.body;


//   if (
//     !title ||
//     !author ||
//     !description ||
//     !rentalPrice ||
//     !category ||
//     !quantity ||
//     !publicationYear
//   ) {
//     return next(new ErrorHandler("Please enter all required fields", 400));
//   }

//   try {
//     // Check if book already exists (same title + year + edition)
//     const existingBook = await Book.findOne({
//       title,
//       publicationYear,
//       edition,
//     });

//     if (existingBook) {
//       existingBook.quantity += parseInt(quantity);
//       await existingBook.save();

//       return res.status(200).json({
//         success: true,
//         message: "Book quantity updated successfully",
//         book: existingBook,
//       });
//     }

//     // Check for valid image (optional)
//     let bookImage = {
//       public_id: "default-book-image",
//       url: "https://res.cloudinary.com/dh2w4egzp/image/upload/v1749386337/LIBRARY_MANAGEMENT_SYSTEM_BOOK_IMAGES/wuasail2wqueju3nqh7c.png", 
//     };

//     if (req.files && req.files.image) {
//       const image = req.files.image;

//       const allowedFormats = [
//         "image/jpeg",
//         "image/png",
//         "image/jpg",
//         "image/webp",
//       ];
//       if (!allowedFormats.includes(image.mimetype)) {
//         return next(new ErrorHandler("Please upload a valid image file", 400));
//       }

//       const cloudinaryResponse = await cloudinary.uploader.upload(
//         image.tempFilePath,
//         {
//           folder: "LIBRARY_MANAGEMENT_SYSTEM_BOOK_IMAGES",
//         }
//       );

//       if (cloudinaryResponse.error) {
//         console.error("Cloudinary upload error:", cloudinaryResponse.error);
//         return next(new ErrorHandler("Failed to upload image", 500));
//       }

//       bookImage = {
//         public_id: cloudinaryResponse.public_id,
//         url: cloudinaryResponse.secure_url,
//       };
//     }

//     // Create new book
//     const newBook = await Book.create({
//       title,
//       author,
//       description,
//       rentalPrice,
//       category,
//       quantity,
//       publicationYear,
//       edition,
//       bookImage,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Book added successfully",
//       book: newBook,
//     });
//   } catch (error) {
//     // If race condition causes duplicate key error
//     if (error.code === 11000) {
//       const updatedBook = await Book.findOneAndUpdate(
//         { title, publicationYear, edition },
//         { $inc: { quantity: parseInt(quantity) } },
//         { new: true }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Book quantity updated successfully",
//         book: updatedBook,
//       });
//     }

//     return next(new ErrorHandler(error.message, 400));
//   }
// });

export const addBook = catchAsyncErrors(async (req, res, next) => {
  let {
    title,
    author,
    description,
    rentalPrice,
    category,
    quantity,
    publicationYear,
    edition,
  } = req.body;

  console.log(req.body);

  // ✅ Parse rentalPrice (since it's sent as a JSON string via FormData)
  try {
    rentalPrice = JSON.parse(rentalPrice);
  } catch (err) {
    return next(new ErrorHandler("Invalid rentalPrice format", 400));
  }

  // ✅ Basic field validation
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

  // ✅ Validate rentalPrice object keys
  const validDurations = ["7", "14", "21", "28"];
  const missingDurations = validDurations.filter((d) => !(d in rentalPrice));
  if (missingDurations.length > 0) {
    return next(
      new ErrorHandler(
        `Rental prices missing for durations: ${missingDurations.join(", ")}`,
        400
      )
    );
  }

  try {
    // ✅ Check if book already exists (by title + year + edition)
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

    // ✅ Handle image (if present)
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

    // ✅ Create the book
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
    // ✅ Handle race-condition duplicate key error
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

// export const updateBook = catchAsyncErrors(async (req, res, next) => {
//     const { bookId } = req.params;
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

//     if (!bookId) {
//         return next(new ErrorHandler("Book ID is required", 400));
//     }

//     try {
//         // Check if update would create a duplicate
//         if (title && publicationYear && edition) {
//             const duplicateBook = await Book.findOne({
//                 _id: { $ne: bookId }, // Exclude current book
//                 title,
//                 publicationYear,
//                 edition
//             });

//             if (duplicateBook) {
//                 return next(new ErrorHandler("A book with this title, publication year and edition already exists", 400));
//             }
//         }

//         // Update the book
//         const book = await Book.findByIdAndUpdate(
//             bookId,
//             {
//                 title,
//                 author,
//                 description,
//                 rentalPrice,
//                 category,
//                 quantity,
//                 publicationYear,
//                 edition
//             },
//             { new: true, runValidators: true }
//         );

//         if (!book) {
//             return next(new ErrorHandler("Book not found", 404));
//         }

//         res.status(200).json({
//             success: true,
//             message: "Book updated successfully",
//             book
//         });
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 400));
//     }
// });

export const updateBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;

  if (!bookId) {
    return next(new ErrorHandler("Book ID is required", 400));
  }

  const updateData = { ...req.body };

  // Parse rentalPrice if sent as JSON string from FormData
  if (updateData.rentalPrice) {
    try {
      updateData.rentalPrice =
        typeof updateData.rentalPrice === "string"
          ? JSON.parse(updateData.rentalPrice)
          : updateData.rentalPrice;

      const validDurations = ["7", "14", "21", "28"];
      const missingDurations = validDurations.filter(
        (d) => !(d in updateData.rentalPrice)
      );

      if (missingDurations.length > 0) {
        return next(
          new ErrorHandler(
            `Rental prices missing for durations: ${missingDurations.join(
              ", "
            )}`,
            400
          )
        );
      }
    } catch (error) {
      return next(new ErrorHandler("Invalid rentalPrice format", 400));
    }
  }

  // Check for duplicate (same title + year + edition, different _id)
  if (updateData.title && updateData.publicationYear && updateData.edition) {
    const duplicateBook = await Book.findOne({
      _id: { $ne: bookId },
      title: updateData.title,
      publicationYear: updateData.publicationYear,
      edition: updateData.edition,
    });

    if (duplicateBook) {
      return next(
        new ErrorHandler(
          "A book with this title, publication year and edition already exists",
          400
        )
      );
    }
  }

  // Handle image update
  // console.log(req.body);
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

    // Fetch existing book to delete old image if needed
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      return next(new ErrorHandler("Book not found", 404));
    }

    // Delete old image from Cloudinary
    if (
      existingBook.bookImage &&
      existingBook.bookImage.public_id &&
      existingBook.bookImage.public_id !== "default-book-image"
    ) {
      await cloudinary.uploader.destroy(existingBook.bookImage.public_id);
    }

    // Upload new image
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

    updateData.bookImage = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  // Perform update
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return next(new ErrorHandler("Book not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
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