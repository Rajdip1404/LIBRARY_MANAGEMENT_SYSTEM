// 📁 Catalog.jsx
import React, { useEffect, useState } from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleReadBookPopup,
  toggleReturnBookPopup,
} from "../store/slices/popup.slice.js";
import { fetchAllBooks, resetBookSlice } from "../store/slices/book.slice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
  confirmBorrowBook,
} from "../store/slices/borrow.slice";
import ReturnBookPopup from "../popups/ReturnBookPopup.jsx";
import Header from "../layout/Header.jsx";
import { toast } from "react-toastify";
import { EyeIcon } from "lucide-react";
import ReadBookPopup from "../popups/ReadBookPopup.jsx";

const Catalog = () => {
  const dispatch = useDispatch();

  const { returnBookPopup, readBookPopup } = useSelector(
    (state) => state.popup
  );
  const {
    loading: borrowLoading,
    error,
    allBorrowedBooks,
    message,
  } = useSelector((state) => state.borrow);
  const { loading: bookLoading, books } = useSelector((state) => state.book);
  const { loading: userLoading, users } = useSelector((state) => state.user);

  const [filter, setFilter] = useState("borrowed");
  const [selectedUser, setSelectedUser] = useState("");
  const [readBook, setReadBook] = useState({});

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const currentDate = new Date();

  const filteredByStatus = {
    borrowed: (book) =>
      book.status === "borrowed" && new Date(book.dueDate) >= currentDate,
    overdue: (book) =>
      book.status === "borrowed" && new Date(book.dueDate) < currentDate,
    returned: (book) => book.status === "returned",
    requested: (book) => book.status === "requested",
  };

  const booksByStatus = allBorrowedBooks?.filter(filteredByStatus[filter]);

  const booksToDisplay = selectedUser
    ? booksByStatus?.filter((b) => b.user.email === selectedUser)
    : booksByStatus;

  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");

  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  };

  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    if (!book) {
      console.error("Book not found");
      return;
    }
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const handleConfirmBorrowBook = (borrowId) => {
    dispatch(confirmBorrowBook(borrowId));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <main className="relative flex-1">
        <Header />

        {/* Sub-header with filter buttons and user dropdown */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4 py-2 mt-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {["overdue", "borrowed", "returned", "requested"].map((type) => (
              <button
                key={type}
                className={`rounded px-4 py-2 border-2 font-semibold transition-colors duration-300 ${
                  filter === type
                    ? "bg-black text-white border-black"
                    : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
                }`}
                onClick={() => setFilter(type)}
              >
                {type === "overdue"
                  ? "Overdue Books"
                  : type === "borrowed"
                  ? "Non-Returned Books"
                  : type === "returned"
                  ? "Returned Books"
                  : "Requested Books"}
              </button>
            ))}
          </div>

          {/* User Dropdown */}
          <div>
            <select
              className="w-full md:w-64 border border-gray-300 rounded px-4 py-2 bg-gray-100"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">All Users</option>
              {userLoading ? (
                <option disabled>Loading users...</option>
              ) : (
                users.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.name} ({user.email})
                  </option>
                ))
              )}
            </select>
          </div>
        </header>

        {/* Table */}
        <div className="w-full overflow-x-auto max-h-[80vh] overflow-y-auto rounded-md">
          {borrowLoading || bookLoading ? (
            <div className="flex justify-center items-center h-[60vh]">
              <h3 className="text-xl font-semibold">Loading books...</h3>
            </div>
          ) : booksToDisplay && booksToDisplay.length > 0 ? (
            <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
              <table className="min-w-full border-collapse p-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Username</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Due Date</th>
                    <th className="px-4 py-2 text-left">Borrowed On</th>
                    <th className="px-4 py-2 text-center">
                      {filter === "requested" ? "Confirm" : "Returned"}
                    </th>
                    <th className="px-4 py-2 text-left">View Book</th>
                  </tr>
                </thead>

                <tbody>
                  {booksToDisplay.map((book, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 transition-colors duration-300 ${
                        (index + 1) % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{book?.user.name}</td>
                      <td className="px-4 py-2">{book?.user.email}</td>
                      <td className="px-4 py-2">₹ {book?.price}</td>
                      <td className="px-4 py-2">
                        {book.dueDate ? formatDate(book.dueDate) : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                        {formatDate(book.createdAt)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {filter === "requested" ? (
                          <button
                            onClick={() => handleConfirmBorrowBook(book._id)}
                            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Confirm
                          </button>
                        ) : book.returnDate ? (
                          <div className="flex items-center justify-center gap-3">
                            <p>Yes</p>
                            <FaSquareCheck className="w-6 h-6 text-green-500" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <p>No</p>
                            <PiKeyReturnBold
                              className="w-6 h-6 text-red-500 cursor-pointer"
                              onClick={() =>
                                openReturnBookPopup(book.book, book.user.email)
                              }
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-10 py-3">
                        <EyeIcon onClick={() => openReadPopup(book.book)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className="text-4xl mt-40 font-bold text-center">
              No{" "}
              {filter === "borrowed"
                ? "non-returned"
                : filter === "overdue"
                ? "overdue"
                : filter === "returned"
                ? "returned"
                : "requested"}{" "}
              books found.
            </h3>
          )}
        </div>
      </main>

      {returnBookPopup && (
        <ReturnBookPopup bookId={borrowedBookId} email={email} />
      )}
      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  );
};

export default Catalog;
