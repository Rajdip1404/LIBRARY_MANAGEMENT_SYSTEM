import React from "react";
import { useDispatch } from "react-redux";
import { toggleDeleteBookPopup } from "../store/slices/popUp.slice";
import { deleteBook } from "../store/slices/book.slice";

const DeleteBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleDeleteBookPopup());
  };

  const handleDelete = () => {
    dispatch(deleteBook(bookId));
    dispatch(toggleDeleteBookPopup());
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative">
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Delete Book
          </h2>
          <p className="text-gray-700 text-lg">
            Are you sure you want to delete this book? This action cannot be
            undone.
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookPopup;
