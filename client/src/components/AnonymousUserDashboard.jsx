import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../layout/Header";
import logo from "../assets/black-logo.png";
import { BookOpen, Boxes } from "lucide-react";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnonymousUserDashboard = () => {
  const { books } = useSelector((state) => state.book);

  const [totalBooks, setTotalBooks] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    setTotalBooks(books.length);
    setInventoryCount(
      books.reduce((acc, book) => acc + (book.quantity || 0), 0)
    );

    // Group books by category
    const categoryCount = books.reduce((acc, book) => {
      const category = book.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    setCategoryData(categoryCount);
  }, [books]);

  // Bar chart dataset
  const barChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Books by Category",
        data: Object.values(categoryData),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Books Distribution by Category",
        font: { size: 20 },
      },
    },
    scales: {
      x: { ticks: { font: { size: 14 } } },
      y: { ticks: { font: { size: 14 } } },
    },
  };

  return (
    <div className="flex-1 px-6 py-6 bg-gray-50 min-h-screen">
      <Header />

      <div className="flex flex-col xl:flex-row gap-14 mt-8 min-h-[85vh]">
        {/* LEFT: Bar Chart */}
        <div className="flex-1 flex flex-col items-center gap-10">
          <div className="w-full max-w-3xl bg-white rounded-2xl p-8 shadow min-h-[500px] flex items-center justify-center">
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Legend + Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full bg-white rounded-2xl p-8 shadow min-h-[180px]">
            <img
              src={logo}
              alt="logo"
              className="w-28 sm:w-36 object-contain"
            />
            <p className="text-gray-700 text-lg leading-relaxed text-center sm:text-left max-w-lg">
              Explore our wide range of book categories. 📚 From fiction to
              research – discover something new every day!
            </p>
          </div>
        </div>

        {/* RIGHT: Info + Login Prompt */}
        <div className="flex-1 flex flex-col gap-10">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              {
                icon: <BookOpen className="w-12 h-12 text-blue-600" />,
                count: totalBooks,
                label: "Total Book Titles",
                color: "bg-blue-100",
              },
              {
                icon: <Boxes className="w-12 h-12 text-green-600" />,
                count: inventoryCount,
                label: "Total Inventory Count",
                color: "bg-green-100",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex items-center gap-6 bg-white p-7 rounded-2xl shadow hover:shadow-lg transition min-h-[160px]"
              >
                <span className={`${card.color} p-6 rounded-xl`}>
                  {card.icon}
                </span>
                <div className="flex flex-col gap-3">
                  <h4 className="text-4xl font-bold">{card.count}</h4>
                  <p className="text-gray-600 text-xl">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Message */}
          <div className="bg-white p-10 text-center rounded-2xl shadow-lg flex flex-col gap-6 min-h-[220px]">
            <h2 className="text-3xl font-bold text-gray-800">
              👋 Welcome to LibraFlow!
            </h2>
            <p className="text-gray-600 text-lg">
              You are currently exploring as an{" "}
              <strong>Anonymous Visitor</strong>. Sign up to borrow books, track
              your reading history, and unlock exclusive features!
            </p>
            <div className="flex gap-6 justify-center">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-3 text-lg rounded-xl shadow hover:bg-blue-700 transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-green-600 text-white px-6 py-3 text-lg rounded-xl shadow hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-white p-10 text-center text-2xl font-semibold relative rounded-2xl shadow min-h-[200px] flex flex-col justify-center items-center">
            <h4 className="max-w-2xl leading-relaxed">
              "A library is not just a place to borrow books, it’s a gateway to
              knowledge and imagination."
            </h4>
            <p className="text-gray-500 text-base absolute bottom-6 right-8">
              - LibraFlow Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousUserDashboard;
