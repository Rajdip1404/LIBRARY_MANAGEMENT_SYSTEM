import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    }
  },
  price: {
    type: Number,
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,  
  },
  borrowDate: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: String,
    enum: ['7', '14', '21', '28'],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    default: null,
  },
  fine: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["borrowed", "requested", "returned"],
    default: "borrowed",
  },
  notified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Borrow = mongoose.model("Borrow", borrowSchema);
export default Borrow;
