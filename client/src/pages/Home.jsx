import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar.jsx";
import UserDashboard from "../components/UserDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import BookManagement from "../components/BookManagement.jsx";
import Catalog from "../components/Catalog.jsx";
import Users from "../components/Users.jsx";
import MyBorrowedBooks from "../components/MyBorrowedBooks.jsx";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="relative md:pd-64 flex min-h-screen bg-gray-100">
        <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        </div>
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          setSelectedComponent={setSelectedComponent}
        />

        {(() => {
          switch (selectedComponent) {
            case "dashboard":
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
            case "Books":
              return <BookManagement />;
            case "Catalog":
              if (user.role === "Admin") return <Catalog />;
              break;
            case "Users":
              if (user.role === "Admin") return <Users />;
              break;
            case "My Borrowed Books":
              return <MyBorrowedBooks />;
            default:
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
          }
        })()}
      </div>
    </>
  );
};

export default Home;
