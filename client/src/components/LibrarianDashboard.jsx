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

    const borrowed = allBorrowedBooks.filter(
      (b) => b.returnDate === null
    ).length;
    const returned = allBorrowedBooks.filter(
      (b) => b.returnDate !== null
    ).length;

    setTotalBorrowedBooks(borrowed);
    setTotalReturnedBooks(returned);
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
    <div className="relative flex-1 px-4 py-3">
      <Header />

      {/* Dashboard Heading */}
      <div className="mb-10 mt-4">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Librarian Dashboard
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* LEFT: Chart & Legend */}
        <div className="flex-1 flex flex-col items-center gap-7 py-5">
          <div className="w-full xl:max-w-[500px] md:max-w-[400px] sm:max-w-[380px]">
            <Pie data={data} />
          </div>

          <div className="flex items-center p-5 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[120px] bg-white xl:flex-1 rounded-lg">
            <img
              src={logo}
              alt="logo"
              className="w-auto xl:flex-1 rounded-lg"
            />
            <span className="w-[2px] bg-black h-full"></span>
            <div className="flex flex-col items-center gap-3">
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                <span>Total Returned Books</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Cards */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-center gap-6 bg-white p-7 rounded-lg shadow hover:shadow-inner transition">
              <span className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </span>
              <div>
                <h4 className="text-3xl font-bold">{totalBooks}</h4>
                <p className="text-gray-600 text-md">Total Book Titles</p>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-white p-7 rounded-lg shadow hover:shadow-inner transition">
              <span className="bg-green-100 p-3 rounded-lg">
                <Boxes className="w-10 h-10 text-green-600" />
              </span>
              <div>
                <h4 className="text-3xl font-bold">{inventoryCount}</h4>
                <p className="text-gray-600 text-md">Total Inventory Count</p>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-white p-7 rounded-lg shadow hover:shadow-inner transition">
              <span className="bg-yellow-100 p-3 rounded-lg">
                <Undo2 className="w-10 h-10 text-yellow-600" />
              </span>
              <div>
                <h4 className="text-3xl font-bold">{totalBorrowedBooks}</h4>
                <p className="text-gray-600 text-md">Currently Borrowed</p>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-white p-7 rounded-lg shadow hover:shadow-inner transition">
              <span className="bg-purple-100 p-3 rounded-lg">
                <Redo2 className="w-10 h-10 text-purple-600" />
              </span>
              <div>
                <h4 className="text-3xl font-bold">{totalReturnedBooks}</h4>
                <p className="text-gray-600 text-md">Books Returned</p>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="hidden xl:flex bg-white p-6 text-lg xl:text-2xl 2xl:text-3xl font-semibold relative min-h-52 justify-center items-center rounded-2xl shadow">
            <h4 className="text-center overflow-hidden">
              "Preserving order in the library is preserving knowledge for the
              future."
            </h4>
            <p className="text-gray-600 text-sm absolute bottom-6 right-6">
              - Library Management Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
