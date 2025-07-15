import React, { useEffect, useState } from "react";
import bookIcon from "../assets/book-square.png";
import userIcon from "../assets/user.png";
import logo from "../assets/black-logo.png";
import adminIcon from "../assets/key.png";
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
import { BookOpen, BookOpenText, ShieldUser, UsersRound } from "lucide-react";

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

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users, admins, librarians } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);
  const { settingPopup } = useSelector((state) => state.popup);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalLibrarian, setTotalLibrarian] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    setTotalBooks(books.length);
    setTotalUsers(users.length);
    setTotalLibrarian(librarians.length);
    let numberOfBorrowed = allBorrowedBooks.filter(
      // (book) => book.returned === false
      (book) => book.returnDate === null
    ).length;

    let numberOfReturned = allBorrowedBooks.filter(
      // (book) => book.returned === true
      (book) => book.returnDate !== null
    ).length;
    setTotalBorrowedBooks(numberOfBorrowed);
    setTotalReturnedBooks(numberOfReturned);
  }, [users, admins, allBorrowedBooks, books]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#10B981", "#3B82F6"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <div className="relative flex-1 p-2">
        <Header />
        <div className="flex flex-col-reverse xl:flex-row">
          {/* LEFT SIDE */}
          <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
            <div className="xl:flex-[4] flex items-end w-[500px] h-[500px] content-center">
              <Pie
                data={data}
                options={{ cutout: 20 }}
                className="mx-auto lg:mx-0 w-full h-auto"
              />
            </div>
            <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-6 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
              <img
                src={logo}
                alt="logo"
                className="w-20 xl:flex-1 rounded-lg"
              />
              <span className="w-[2px] bg-black h-full"></span>
              <div className="flex flex-col items-center gap-3">
                <p className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#10B981]"></span>
                  <span>Total Borrowed Books</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-[#3B82F6]"></span>
                  <span>Total Returned Books</span>
                </p>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="flex flex-[4] flex-col gap-7 lg:gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]">
            <div className="flex flex-col-reverse lg:flex-row gap-5 flex-[4]">
              <div className="flex flex-col gap-7 flex-1">
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                  <span className="bg-green-100 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <UsersRound className="w-10 h-10 text-green-700" />
                  </span>
                  <span className="w-[2px] bg-black h-full"></span>
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="font-black text-3xl">{totalUsers}</h4>
                    <p className="font-light text-gray-700 text:sm">
                      Total Number of Users
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                  <span className="bg-blue-100 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <BookOpenText className="w-10 h-10 text-blue-700" />
                  </span>
                  <span className="w-[2px] bg-black h-full"></span>
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="font-black text-3xl">{totalBooks}</h4>
                    <p className="font-light text-gray-700 text:sm">
                      Total Number of Books
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
                  <span className="bg-fuchsia-100 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <ShieldUser className="w-10 h-10 text-fuchsia-700" />
                  </span>
                  <span className="w-[2px] bg-black h-full"></span>
                  <div className="flex flex-col items-center gap-2">
                    <h4 className="font-black text-3xl">{totalLibrarian}</h4>
                    <p className="font-light text-gray-700 text:sm">
                      Total Number of Librarians
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row flex-1">
                <div className="flex flex-col lg:flex-row flex-1 items-center justify-center">
                  <div className="bg-white p-5 rounded-lg shadow-lg h-full w-full flex flex-col justify-center items-center gap-6">
                    <img
                      src={user && user.avatar?.url}
                      alt="avatar"
                      className="w-40 h-40 rounded-full object-cover shadow-xl"
                    />
                    <h2 className="text-2xl 2xl:text-3xl font-semibold text-center">
                      {user && user.name}
                    </h2>
                    <p className="text-gray-800 text-sm 2xl:text-lg text-center">
                      Welcome to your admin dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex-[3] justify-center items-center rounded-2xl">
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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
