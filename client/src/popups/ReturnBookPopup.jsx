import React from "react";
import { useDispatch } from "react-redux";
import { returnBorrowedBook } from "../store/slices/borrow.slice";
import { toggleReturnBookPopup } from "../store/slices/popup.slice";

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();
  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBorrowedBook(email, bookId));
    dispatch(toggleReturnBookPopup());
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Return Book</h3>
          <form onSubmit={handleReturnBook}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                User's Email
              </label>
              <input
                type="email"
                defaultValue={email}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                placeholder="Enter User Email"
                required={true}
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                type="button"
                onClick={() => dispatch(toggleReturnBookPopup())}
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPopup;
