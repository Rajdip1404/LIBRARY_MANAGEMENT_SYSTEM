import React from "react";
import { useDispatch } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popup.slice";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-11/12 sm:w-3/4 lg:w-2/3 bg-white rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">View Book Info</h2>
          <button
            onClick={() => dispatch(toggleReadBookPopup())}
            className="text-white text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Top Section with Image + Basic Info */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Book Image */}
            <div className="flex justify-center md:w-2/5">
              <img
                src={book.bookImage?.url || book.image?.url}
                alt={book.title}
                className="w-60 h-60 p-2 object-fit border rounded shadow"
              />
            </div>

            {/* Text Info */}
            <div className="md:w-2/3 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Title
                </label>
                <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2">
                  {book.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Author
                  </label>
                  <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2 truncate overflow-hidden whitespace-nowrap">
                    {book.author}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Category
                  </label>
                  <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2">
                    {book.category}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Edition
                  </label>
                  <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2">
                    {book.edition}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Publication Year
                  </label>
                  <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2">
                    {book.publicationYear}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded px-4 py-2 whitespace-pre-wrap">
              {book.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={() => dispatch(toggleReadBookPopup())}
            className="px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-300 hover:text-black transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
