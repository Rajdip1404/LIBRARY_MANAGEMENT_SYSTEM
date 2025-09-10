import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../layout/Header";
import { BookA } from "lucide-react";
import { toggleReadBookPopup } from "../store/slices/popup.slice";
import ReadBookPopup from "../popups/ReadBookPopup";
import {calculateFine} from "../utils/fineCalculator.js";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    if (!book) {
      console.error("Book not found");
      return;
    }
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  // useEffect(() => {
  //   console.log(userBorrowedBooks);
  // }, []);

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    const formattedDateTime = `${formattedDate} | ${formattedTime}`;
    return formattedDateTime;
  };

  const [filter, setFilter] = useState("returned");
  const returnedBooks = userBorrowedBooks?.filter(
    (book) => book.returned === true
  );
  const nonReturnedBooks = userBorrowedBooks?.filter(
    (book) => book.returned === false
  );

  const booksToDisplay =
    filter === "returned" ? returnedBooks : nonReturnedBooks;

  return (
    <>
      <main className="relative flex-1">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center px-6 py-4 mt-2">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            My Borrowed Books
          </h2>
        </header>
        <header className="flex flex-col gap-3 sm:flex-row md:items-center px-6 py-2">
          <button
            className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg px-4 py-2 bg-black text-center border-2 font-semibold w-full sm:w-72 transition-colors duration-300 ${
              filter === "returned"
                ? "bg-black text-white border-black"
                : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
            } hover:cursor-pointer hover:shadow-lg`}
            onClick={() => setFilter("returned")}
          >
            Returned Books
          </button>
          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg px-4 py-2 bg-black text-center border-2 font-semibold w-full sm:w-72 transition-colors duration-300 ${
              filter === "nonReturned"
                ? "bg-black text-white border-black"
                : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
            } hover:cursor-pointer hover:shadow-lg`}
            onClick={() => setFilter("nonReturned")}
          >
            Non-Returned Books
          </button>
        </header>

        <div className="w-full overflow-x-auto max-h-[80vh] overflow-y-auto rounded-md">
          {booksToDisplay && booksToDisplay.length > 0 ? (
            <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
              <table className="min-w-full border-collapse p-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Book Title</th>
                    <th className="px-4 py-2 text-left"> Date & Time</th>
                    <th className="px-4 py-2 text-left">Due Date</th>
                    <th className="px-4 py-2 text-left">Returned</th>
                    <th className="px-4 py-2 text-left">View</th>
                    {filter === "nonReturned" && (
                      <th className="px-4 py-2 text-left">Fine</th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {booksToDisplay.map((book, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 transition-colors duration-300 ${
                        (index + 1) % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{book.bookTitle}</td>
                      <td className="px-4 py-2">
                        {formatDate(book.borrowDate)}
                      </td>
                      <td className="px-4 py-2">{formatDate(book.dueDate)}</td>
                      <td className="px-4 py-2">
                        {book.returned ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 flex justify-centertext-center gap-2">
                        <BookA
                          onClick={() => openReadPopup(book.bookId)}
                          className="text-blue-500 hover:underline"
                        />
                        View
                      </td>
                      {filter === "nonReturned" && (
                        <td className="px-4 py-2 text-red-600 font-semibold">
                          ₹ {calculateFine(book.dueDate)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : filter === "returned" ? (
            <h3 className="text-4xl mt-40 font-bold text-center">
              No returned books found
            </h3>
          ) : (
            <h3 className="text-4xl mt-40 font-bold text-center">
              No borrowed books found
            </h3>
          )}
        </div>
      </main>
      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  );
};

export default MyBorrowedBooks;
