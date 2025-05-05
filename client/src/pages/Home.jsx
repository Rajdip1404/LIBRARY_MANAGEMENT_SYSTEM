import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar.jsx";
import UserDashboard from "../components/UserDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import BookManagement from "../components/BookManagement.jsx";
import Catalog from "../components/Catalog.jsx";
import Users from "../components/Users.jsx";
import MyBorrowedBooks from "../components/MyBorrowedBooks.jsx";
import { getUser } from "../store/slices/auth.slice.js";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log(isAuthenticated);
    return <Navigate to="/login" />;
  }

  // Select component to render
  const renderComponent = () => {
    switch (selectedComponent) {
      case "dashboard":
        return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
      case "Books":
        return <BookManagement />;
      case "Catalog":
        return user?.role === "Admin" ? <Catalog /> : <UserDashboard />;
      case "Users":
        return user?.role === "Admin" ? <Users /> : <UserDashboard />;
      case "My Borrowed Books":
        return <MyBorrowedBooks />;
      default:
        return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
    }
  };

  return (
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
      {renderComponent()}
    </div>
  );
};

export default Home;
