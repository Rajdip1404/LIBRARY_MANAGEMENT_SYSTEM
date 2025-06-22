import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    bookImage: {
      public_id: {
        type: String,
        default: "default-book-image",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dh2w4egzp/image/upload/v1749386337/LIBRARY_MANAGEMENT_SYSTEM_BOOK_IMAGES/wuasail2wqueju3nqh7c.png", // Replace this with your real default image
      },
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    edition: {
      type: String,
      trim: true,
      default: "1st",
    },
    rentalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
      // required: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a compound index for title, publicationYear, and edition to ensure uniqueness
bookSchema.index(
  { title: 1, publicationYear: 1, edition: 1 },
  { unique: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
