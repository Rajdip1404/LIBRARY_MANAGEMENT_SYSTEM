import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { BookOpen, Boxes, Undo2, Redo2 } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Header from "../layout/Header";
import logo from "../assets/black-logo.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const LibrarianDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBooks, setTotalBooks] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    setTotalBooks(books.length);
    setInventoryCount(
      books.reduce((acc, book) => acc + (book.quantity || 0), 0)
    );
    setTotalBorrowedBooks(
      allBorrowedBooks.filter((b) => b.returnDate === null).length
    );
    setTotalReturnedBooks(
      allBorrowedBooks.filter((b) => b.returnDate !== null).length
    );
  }, [books, allBorrowedBooks]);

  const data = {
    labels: ["Borrowed", "Returned"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3B82F6", "#10B981"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="flex-1 px-4 py-3 bg-gray-50 min-h-screen">
      <Header />

      <div className="flex flex-col xl:flex-row gap-10 mt-6">
        {/* LEFT: Chart Section */}
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
            <Pie data={data} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start sm:justify-center gap-5 sm:gap-10 w-auto bg-white rounded-xl p-6 shadow">
            {/* Logo */}
            <img
              src={logo}
              alt="logo"
              className="w-24 sm:w-28 object-contain"
            />

            {/* Legend */}
            <div className="flex flex-col gap-4 mt-3">
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#10B981]"></span>
                <span className="text-gray-700">Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#3B82F6]"></span>
                <span className="text-gray-700">Total Returned Books</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Info Cards */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-blue-600" />,
                count: totalBooks,
                label: "Total Book Titles",
                color: "bg-blue-100",
              },
              {
                icon: <Boxes className="w-8 h-8 text-green-600" />,
                count: inventoryCount,
                label: "Total Inventory Count",
                color: "bg-green-100",
              },
              {
                icon: <Undo2 className="w-8 h-8 text-yellow-600" />,
                count: totalBorrowedBooks,
                label: "Currently Borrowed",
                color: "bg-yellow-100",
              },
              {
                icon: <Redo2 className="w-8 h-8 text-purple-600" />,
                count: totalReturnedBooks,
                label: "Books Returned",
                color: "bg-purple-100",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <span className={`${card.color} p-3 rounded-lg`}>
                  {card.icon}
                </span>
                <div>
                  <h4 className="text-2xl font-semibold">{card.count}</h4>
                  <p className="text-gray-600">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row flex-1">
            <div className="flex flex-col lg:flex-row flex-1 items-center justify-center">
              <div className="bg-white p-5 rounded-lg shadow-lg h-full w-full flex flex-col justify-center items-center gap-3">
                <img
                  src={user && user.avatar?.url}
                  alt="avatar"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <h2 className="text-xl 2xl:text-2xl font-semibold text-center mt-1">
                  {user && user.name}
                </h2>
                <p className="text-gray-600 text-sm 2xl:text-base text-center">
                  Welcome to your Librarian dashboard.
                </p>
              </div>
            </div>
          </div>
          {/* Quote */}
          <div className="bg-white p-6 text-center text-xl sm:text-2xl font-semibold relative rounded-2xl shadow min-h-[140px] flex flex-col justify-center items-center">
            <h4 className="max-w-xl">
              "Preserving order in the library is preserving knowledge for the
              future."
            </h4>
            <p className="text-gray-500 text-sm absolute bottom-4 right-6">
              - LibraFlow Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
