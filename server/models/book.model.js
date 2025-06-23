import mongoose from "mongoose";

const categoryEnum = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Science Fiction",
  "Technology",
  "Education",
  "History",
  "Biography",
  "Autobiography",
  "Fantasy",
  "Romance",
  "Horror",
  "Mystery",
  "Crime",
  "Self Improvement",
  "Novel",
  "Children",
];

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
    // rentalPrice: {
    //   type: Number,
    //   required: true,
    // },
    rentalPrice: {
      type: Map,
      of: Number,
      required: true,
      default: {
        7: 100,
        14: 180,
        21: 250,
        28: 300,
      },
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
      enum: categoryEnum,
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

export const bookCategories = categoryEnum;

export default Book;
