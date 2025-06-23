import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { recordBorrowedBooks } from "../store/slices/borrow.slice";
import { toggleRecordBookPopup } from "../store/slices/popUp.slice";

const RecordBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState("7");

  const recordHandler = (e) => {
    e.preventDefault();
    dispatch(recordBorrowedBooks(bookId, email, duration));
    dispatch(toggleRecordBookPopup());
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Record Book</h3>
          <form onSubmit={recordHandler}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                User's Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                placeholder="Enter User Email"
                required
              />
            </div>

            {/* Duration Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Select Borrow Duration (in days)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                required
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="21">21 days</option>
                <option value="28">28 days</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={() => dispatch(toggleRecordBookPopup())}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecordBookPopup;
