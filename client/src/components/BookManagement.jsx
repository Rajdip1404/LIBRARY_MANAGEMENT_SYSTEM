import React, { useEffect, useState } from "react";
import { BookA, NotebookPen, Eye, Edit2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  toggleAddBookPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleUpdateBookPopup
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

const BookManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup, updateBookPopup } = useSelector(
    (state) => state.popup
  );
  const {
    loading: borrowLoading,
    error: borrowError,
    message: borrowMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const [borrowBookId, setBorrowBookId] = useState("");
  const[updateBook, setUpdateBook] = useState({});


  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    if (!book) {
      console.error("Book not found");
      return;
    }
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };
  
  const openUpdateBookPopup = (id) => {
    const book = books.find((book) => book._id === id);
    if (!book) {
      console.error("Book not found");
      return;
    }
    setUpdateBook(book);
    console.log(book);
    dispatch(toggleUpdateBookPopup());
  };

  const openRecordBookPopup = (id) => {
    setBorrowBookId(id);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    if (message || borrowMessage) {
      toast.success(message || borrowMessage);
      dispatch(fetchAllBooks());
      if(user?.role === "Admin") dispatch(fetchAllBorrowedBooks());
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

  const searchedBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchedKeyword) ||
      book.author.toLowerCase().includes(searchedKeyword) ||
      book.category.toLowerCase().includes(searchedKeyword)
  );

  return (
    <>
      <main className="relative flex-1">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center sm:items-center px-6 py-4">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold ">
            {user && (user.role === "Admin" || user.role === "Librarian")
              ? "Book Management"
              : "Books"}
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {isAuthenticated &&
              (user.role === "Admin" || user.role === "Librarian") && (
                <button
                  className="relative w-full sm:w-full flex gap-4 justify-center items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 text-[18px] font-medium"
                  onClick={() => dispatch(toggleAddBookPopup())}
                >
                  <NotebookPen className="" />
                  Add Book
                </button>
              )}
            <input
              type="text"
              placeholder="Search..."
              value={searchedKeyword}
              onChange={handleSearch}
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-gray-700 w-full sm:w-full"
            />
          </div>
        </header>

        {/* Table */}
        {books && books.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse p-4">
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
                    <td className="px-4 py-2">${book.rentalPrice}</td>
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
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
      {updateBookPopup && <UpdateBookPopup book={updateBook} />}
    </>
  );
};

export default BookManagement;
