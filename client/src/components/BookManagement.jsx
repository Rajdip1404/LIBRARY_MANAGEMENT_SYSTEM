import React, { useEffect, useState } from "react";
import {
  BookA,
  NotebookPen,
  Eye,
  Edit2,
  BookOpen,
  Trash2,
  Trash,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { bookCategories } from "../../../server/models/book.model.js";
import {
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleBorrowBookPopup,
  toggleRecordBookPopup,
  toggleUpdateBookPopup,
  toggleDeleteBookPopup,
} from "../store/slices/popUp.slice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/book.slice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "../store/slices/borrow.slice";
import Header from "../layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";
import UpdateBookPopup from "../popups/UpdateBookPopup";
import BorrowBookPopup from "../popups/BorrowBookPopup";
import DeleteBookPopup from "../popups/DeleteBookPopup";
import Select from "react-select";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    addBookPopup,
    readBookPopup,
    deleteBookPopup,
    recordBookPopup,
    updateBookPopup,
    borrowBookPopup,
  } = useSelector((state) => state.popup);
  const {
    loading: borrowLoading,
    error: borrowError,
    message: borrowMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const [deleteBookId, setDeleteBookId] = useState("");
  const [borrowBookId, setBorrowBookId] = useState("");
  const [updateBook, setUpdateBook] = useState({});
  const [userBorrowBook, setUserBorrowBook] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
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

  const openDeleteBookPopup = (id) => {
    if (!books.find((book) => book._id === id)) {
      console.error("Book not found");
      return;
    }
    setDeleteBookId(id);
    dispatch(toggleDeleteBookPopup());
  };

  const openUpdateBookPopup = (id) => {
    const book = books.find((book) => book._id === id);
    if (!book) {
      console.error("Book not found");
      return;
    }
    setUpdateBook(book);
    dispatch(toggleUpdateBookPopup());
  };

  const openRecordBookPopup = (id) => {
    setBorrowBookId(id);
    dispatch(toggleRecordBookPopup());
  };

  const openBorrowBookPopup = (id) => {
    const book = books.find((book) => book._id === id);
    if (!book) {
      console.error("Book not found");
      return;
    }
    setUserBorrowBook(book);
    dispatch(toggleBorrowBookPopup());
  };

  useEffect(() => {
    if (message || borrowMessage) {
      toast.success(message || borrowMessage);
      dispatch(fetchAllBooks());
      if (user?.role === "Admin") dispatch(fetchAllBorrowedBooks());
    }
  }, [message, borrowMessage, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetBookSlice()); // Reset after handling
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (borrowMessage) {
      toast.success(borrowMessage);
      dispatch(resetBorrowSlice());
    }
  }, [borrowMessage, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetBookSlice());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (borrowError) {
      toast.error(borrowError);
      dispatch(resetBorrowSlice());
    }
  }, [borrowError, dispatch]);

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchedKeyword(keyword);
    if (e.key === "Enter") {
      dispatch(fetchAllBooks(keyword));
    }
  };

  const filteredBooks = books.filter((book) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.some((cat) => cat.value === book.category);
  });

  const searchedBooks = filteredBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchedKeyword) ||
      book.author.toLowerCase().includes(searchedKeyword) ||
      book.category.toLowerCase().includes(searchedKeyword)
  );

  return (
    <>
      <main className="relative flex-1">
        <Header />
        <header className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center px-6 py-4">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user && (user.role === "Admin" || user.role === "Librarian")
              ? "Book Management"
              : "Books"}
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 w-full md:w-auto">
            {/* Add Book Button */}
            {isAuthenticated &&
              (user.role === "Admin" || user.role === "Librarian") && (
                <button
                  className="flex gap-2 justify-center items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base w-full lg:w-fit"
                  onClick={() => dispatch(toggleAddBookPopup())}
                >
                  <NotebookPen />
                  Add Book
                </button>
              )}

            {/* Category Filter Dropdown */}
            <div className="w-full lg:w-64">
              <Select
                isMulti
                options={bookCategories.map((cat) => ({
                  label: cat,
                  value: cat,
                }))}
                value={selectedCategories}
                onChange={handleCategoryChange}
                placeholder="Filter by Category"
                classNamePrefix="react-select"
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    maxHeight: 44,
                    overflowY: "hidden",
                    fontSize: "0.875rem",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    maxHeight: "3rem",
                    overflowY: "auto",
                    paddingRight: "1rem",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              value={searchedKeyword}
              onChange={handleSearch}
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-gray-700 w-full lg:w-64 text-sm sm:text-base"
            />
          </div>
        </header>

        {/* Table */}
        {books && books.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse p-4 overflow-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  {isAuthenticated &&
                    (user.role === "Admin" || user.role === "Librarian") && (
                      <th className="px-4 py-2 text-left">Quantity</th>
                    )}
                  <th className="px-4 py-2 text-left">Price</th>
                  {isAuthenticated && user.role === "User" && (
                    <th className="px-4 py-2 text-left">Availability</th>
                  )}
                  {isAuthenticated &&
                    (user.role === "Admin" || user.role === "Librarian") && (
                      <th className="px-4 py-2 text-left">Record Book</th>
                    )}
                  {isAuthenticated &&
                    (user.role === "Admin" || user.role === "Librarian") && (
                      <th className="px-4 py-2 text-left">Update Book</th>
                    )}
                  <th className="px-4 py-2 text-left">View Book</th>
                  {isAuthenticated && user.role === "User" && (
                    <th className="px-4 py-2 text-left">Borrow Book</th>
                  )}
                  {isAuthenticated &&
                    (user.role === "Admin" || user.role === "Librarian") && (
                      <th className="px-4 py-2 text-left">Delete?</th>
                    )}
                </tr>
              </thead>
              <tbody>
                {searchedBooks.map((book, index) => (
                  <tr
                    key={book._id}
                    className={
                      (index + 1) % 2 === 0
                        ? "bg-gray-50 hover:bg-gray-100"
                        : "hover:bg-gray-100"
                    }
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 max-w-[200px] min-w-[100px] truncate whitespace-nowrap overflow-hidde">
                      {book.title}
                    </td>
                    <td className="px-4 py-2 max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {book.author}
                    </td>
                    {isAuthenticated &&
                      (user.role === "Admin" || user.role === "Librarian") && (
                        <td className="px-4 py-2">{book.quantity}</td>
                      )}
                    <td className="px-4 py-2">
                      ₹
                      {book.rentalPrice && book.rentalPrice["7"]
                        ? book.rentalPrice["7"]
                        : "N/A"}
                    </td>

                    {isAuthenticated && user.role === "User" && (
                      <td className="px-4 py-2">
                        {book.availability ? "Available" : "Not Available"}
                      </td>
                    )}
                    {isAuthenticated &&
                      (user.role === "Admin" || user.role === "Librarian") && (
                        <td className="px-10 py-3">
                          <NotebookPen
                            onClick={() => openRecordBookPopup(book._id)}
                          />
                        </td>
                      )}
                    {isAuthenticated &&
                      (user.role === "Admin" || user.role === "Librarian") && (
                        <td className="px-10 py-3">
                          <Edit2
                            onClick={() => openUpdateBookPopup(book._id)}
                          />
                        </td>
                      )}
                    <td className="px-10 py-3">
                      <Eye onClick={() => openReadPopup(book._id)} />
                    </td>
                    {isAuthenticated && user.role === "User" && (
                      <td className="px-10 py-3">
                        <button
                          className="bg-black text-white px-2 py-1 shadow-md"
                          onClick={() => openBorrowBookPopup(book._id)}
                        >
                          <BookOpen />
                        </button>
                      </td>
                    )}
                    {isAuthenticated &&
                      (user.role === "Admin" || user.role === "Librarian") && (
                        <td className="px-9 py-3">
                          <Trash2
                            onClick={() => openDeleteBookPopup(book._id)}
                          />
                        </td>
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-black text-4xl font-bold">No books available</p>
          </div>
        )}
      </main>

      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook} />}
      {deleteBookPopup && <DeleteBookPopup bookId={deleteBookId} />}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
      {updateBookPopup && <UpdateBookPopup book={updateBook} />}
      {borrowBookPopup && (
        <BorrowBookPopup book={userBorrowBook} email={user?.email} />
      )}
    </>
  );
};

export default BookManagement;
