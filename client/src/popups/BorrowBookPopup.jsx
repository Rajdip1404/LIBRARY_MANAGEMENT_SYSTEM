import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestBorrowBook } from "../store/slices/borrow.slice";
import { toggleBorrowBookPopup } from "../store/slices/popUp.slice";

const BorrowBookPopup = ({ book, email }) => {
  const dispatch = useDispatch();

  const [duration, setDuration] = useState("7");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const rental = book?.rentalPrice;
    const calculatedPrice = rental?.get?.(duration) || rental?.[duration] || 0;
    setPrice(calculatedPrice);
  }, [duration, book]);

  const handleBorrow = (e) => {
    e.preventDefault();
    dispatch(requestBorrowBook(book._id, email, duration));
    dispatch(toggleBorrowBookPopup());
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-white text-lg font-bold">Borrow Book</h2>
          <button
            onClick={() => dispatch(toggleBorrowBookPopup())}
            className="text-white text-lg font-bold"
          >
            &times;
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book?.title}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Rental Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
              required
            >
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="21">21 Days</option>
              <option value="28">28 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Rental Price
            </label>
            <p className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              ₹ {price}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4 p-4 border-t border-gray-200">
          <button
            onClick={() => {
              dispatch(toggleBorrowBookPopup());
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleBorrow}
            className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
          >
            Request to Borrow
          </button>
        </div>
      </div>
    </div>
  );
};

export default BorrowBookPopup;
