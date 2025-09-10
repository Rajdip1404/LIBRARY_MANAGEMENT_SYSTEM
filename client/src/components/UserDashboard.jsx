import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { books } = useSelector((state) => state.book);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
      (book) => book.returned === false
    ).length;
    let numberOfTotalReturnedBooks = userBorrowedBooks.filter(
      (book) => book.returned === true
    ).length;

    setTotalBorrowedBooks(numberOfTotalBorrowedBooks);
    setTotalReturnedBooks(numberOfTotalReturnedBooks);

    // Group books by category
    const categoryCount = books.reduce((acc, book) => {
      const category = book.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    setCategoryData(categoryCount);
  }, [userBorrowedBooks, books]);

  // Pie chart dataset (Borrowed vs Returned)
  const pieData = {
    labels: ["Borrowed", "Returned"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#14B8A6", "#F97316"], // teal & orange
        hoverOffset: 6,
      },
    ],
  };

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count; // evenly distribute hues
      colors.push(`hsl(${hue}, 70%, 50%)`); // vibrant colors
    }
    return colors;
  };

  const barData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Books by Category",
        data: Object.values(categoryData),
        backgroundColor: generateColors(Object.keys(categoryData).length),
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Books Distribution by Category",
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { font: { size: 13 } } },
      y: { ticks: { font: { size: 13 } } },
    },
  };

  return (
    <main className="relative flex-1 py-2 px-4">
      <Header />
      <div className="flex flex-col xl:flex-row gap-2">
        {/* LEFT SIDE (smaller) */}
        <div className="flex flex-[2] flex-col gap-8 lg:py-5 justify-between xl:min-h-[85.5vh]">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow w-full min-h-[350px] flex items-center justify-center">
            <Bar data={barData} options={barOptions} />
          </div>

          {/* Motivational Text */}
          <div className="bg-white p-7 text-lg sm:text-xl xl:text-2xl 2xl:text-3xl min-h-40 font-semibold relative flex flex-col items-center justify-center rounded-2xl transition hover:shadow-inner duration-300">
            <h4 className="max-w-2xl leading-relaxed text-center">
              "Every book you borrow is a step towards growth. Keep reading,
              keep exploring, and let knowledge light your way."
            </h4>
            <p className="text-gray-700 text-sm sm:text-lg absolute bottom-4 right-6">
              - LibraFlow Team
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (larger) */}
        <div className="flex-[2] flex flex-col gap-2 justify-between py-5">
          <div className="flex justify-center items-center">
            <Pie
              data={pieData}
              options={{ cutout: 80 }}
              className="mx-auto w-[420px] h-[420px] sm:w-[460px] sm:h-[460px]"
            />
          </div>
          <div className="flex items-center p-6 w-full sm:w-[420px] xl:w-fit gap-5 h-fit bg-white rounded-lg shadow mx-auto">
            <img src={logo} alt="logo" className="w-auto h-14 xl:h-20" />
            <span className="w-[2px] bg-black h-full"></span>
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#14B8A6]"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#F97316]"></span>
                <span>Total Returned Books</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
