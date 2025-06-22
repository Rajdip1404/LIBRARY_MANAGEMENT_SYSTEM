import React, { useEffect, useState } from 'react';
import {PiKeyReturnBold} from 'react-icons/pi';
import {FaSquareCheck} from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleReturnBookPopup } from '../store/slices/popUp.slice';
import { fetchAllBooks, resetBookSlice } from '../store/slices/book.slice';
import { fetchAllBorrowedBooks, resetBorrowSlice } from '../store/slices/borrow.slice';
import ReturnBookPopup from '../popups/ReturnBookPopup.jsx';
import Header from '../layout/Header.jsx';
import { toast } from 'react-toastify';

const Catalog = () => {
  const dispatch = useDispatch();

  const {returnBookPopup} = useSelector((state) => state.popup); 
  const { loading, error, allBorrowedBooks, message } = useSelector(
    (state) => state.borrow
  );
  
  const [filter, setFilter] = useState("borrowed");

  const formatDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    return formattedDate;
  };

  const currentDate = new Date();
  const borrowedBooks = allBorrowedBooks?.filter(
    (book) => {
      const dueDate = new Date(book.dueDate);
      return book.status === "borrowed" && dueDate > currentDate;
    }
  );
  const overdueBooks = allBorrowedBooks?.filter(
    (book) => {
      const dueDate = new Date(book.dueDate);
      return book.status === "returned";
    }
  );

  const booksToDisplay = filter === "borrowed" ? borrowedBooks : overdueBooks;

  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openReturnBookPopup = (bookId, email) => {
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(toggleReturnBookPopup());
  };

  useEffect(() => {
    if(message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBorrowSlice());
      dispatch(resetBookSlice());
    }
    if(error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, loading]);

  return (
    <>
      <main className="relative flex-1">
        <Header />
        {/* <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center px-6 py-4 mt-2">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            My Borrowed Books
          </h2>
        </header> */}
        <header className="flex flex-col gap-3 sm:flex-row md:items-center px-6 py-2">
          <button
            className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg px-4 py-2 bg-black text-center border-2 font-semibold w-full sm:w-72 transition-colors duration-300 ${
              filter === "overdue"
                ? "bg-black text-white border-black"
                : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
            } hover:cursor-pointer hover:shadow-lg`}
            onClick={() => setFilter("overdue")}
          >
            Overdue Borrowers
          </button>
          <button
            className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-tr-lg sm:rounded-br-lg px-4 py-2 bg-black text-center border-2 font-semibold w-full sm:w-72 transition-colors duration-300 ${
              filter === "borrowed"
                ? "bg-black text-white border-black"
                : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
            } hover:cursor-pointer hover:shadow-lg`}
            onClick={() => setFilter("borrowed")}
          >
            Non-Returned Books
          </button>
        </header>

        {booksToDisplay && booksToDisplay.length > 0 ? (
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
                  <th className="px-4 py-2 text-center">Returned</th>
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
                    <td className="px-4 py-2">{book?.price}</td>
                    <td className="px-4 py-2">{formatDate(book.dueDate)}</td>
                    <td className="px-4 py-2">{formatDate(book.createdAt)}</td>
                    <td className="px-4 py-2">
                      {book.returnDate ? (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-4xl mt-40 font-bold text-center">
            No {filter === "borrowed" ? "non-returned" : "overdue"} books found.
          </h3>
        )}
      </main>

      {returnBookPopup && <ReturnBookPopup bookId={borrowedBookId} email={email}/>}
    </>
  );
}

export default Catalog