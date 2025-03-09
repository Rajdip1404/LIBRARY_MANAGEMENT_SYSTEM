import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
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
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);





export default Book;