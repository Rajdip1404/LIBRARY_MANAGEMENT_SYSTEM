import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import logo from "../assets/black-logo.png";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
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
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfTotalBorrowedBooks = userBorrowedBooks.filter(
      (book) => book.returned === false
    ).length;
    let numberOfTotalReturnedBooks = userBorrowedBooks.filter(
      (book) => book.returned === true
    ).length;

    setTotalBorrowedBooks(numberOfTotalBorrowedBooks);
    setTotalReturnedBooks(numberOfTotalReturnedBooks);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-2">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        {/* LEFT SIDE */}
        <div className="flex flex-[4] flex-col gap-7 lg:gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]">
          <div className="flex flex-col gap-5 flex-[4]">
            <div className="flex flex-col lg:flow-row gap-5 overflow-y-hidden">
              <div className="flex items-center gap-3 bg-white p-5 min-h-[100px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300">
                <span className="w-[2px] bg-black h-15 lg:h-full"></span>
                <span className="bg-gray-300 h-15 w-15 lg:h-20 lg:w-20 flex justify-center items-center rounded-lg">
                  <img src={bookIcon} alt="book-icon" className="w-8 h-8" />
                </span>
                <p className="text-lg xl:text-xl font-semibold">
                  Your Borrowed Book List
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 min-h-[100px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300">
                <span className="w-[2px] bg-black h-15 lg:h-full"></span>
                <span className="bg-gray-300 h-15 w-15 lg:h-20 lg:w-20 flex justify-center items-center rounded-lg">
                  <img src={returnIcon} alt="book-icon" className="w-8 h-8" />
                </span>
                <p className="text-lg xl:text-xl font-semibold">
                  Your Returned Book List
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-7">
              <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300">
                <span className="w-[2px] bg-black h-15 lg:h-full"></span>
                <span className="bg-gray-300 h-15 w-15 lg:h-20 lg:w-20 flex justify-center items-center rounded-lg">
                  <img src={browseIcon} alt="book-icon" className="w-8 h-8" />
                </span>
                <p className="text-lg xl:text-xl font-semibold">
                  Let's Browse Books Inventory
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-40 font-semibold relative flex-[3] flex items-center justify-center rounded-2xl transition hover:shadow-inner duration-300">
            <h4 className="overflow-y-hidden">
              "Embarking on the journey of reading fosters personal growth,
              nurturing a path towards excellence and the refinements of
              knowledge."
            </h4>
            <p className="text-gray-700 text-sm sm:text-lg absolute right-[35px] sm:right-[50px] bottom-[35px] sm:bottom-[35px]">
              - LibraFlow Team
            </p>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
          <div className="xl:flex-[4] flex items-end w-full content-center">
            <Pie
              data={data}
              options={{ cutout: 80 }}
              className="mx-auto lg:mx-0 w-[300px] h-[300px]"
            />
          </div>
          <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl-min-h-[150px] bg-white xl:flex-1 rounded-lg">
            <img src={logo} alt="logo" className="w-auto h-12 wxl:h-20" />
            <span className="w-[2px] bg-black h-full"></span>
            <div className="flex flex-col gap-5">
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
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
