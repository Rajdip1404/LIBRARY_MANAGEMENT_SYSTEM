import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar.jsx";
import UserDashboard from "../components/UserDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import LibrarianDashboard from "../components/LibrarianDashboard.jsx";
import BookManagement from "../components/BookManagement.jsx";
import Catalog from "../components/Catalog.jsx";
import Users from "../components/Users.jsx";
import MyBorrowedBooks from "../components/MyBorrowedBooks.jsx";
import { getUser } from "../store/slices/auth.slice.js";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Select component to render
  const renderComponent = () => {
    switch (selectedComponent) {
      case "dashboard":
        return user?.role === "User" ? <UserDashboard /> : user?.role === "Admin" ? <AdminDashboard /> : <LibrarianDashboard />;
      case "Books":
        return <BookManagement />;
      case "Catalog":
        return (user?.role === "Admin" || user?.role === "Librarian") ? <Catalog /> : <UserDashboard />;
      case "Users":
        return user?.role === "Admin" ? <Users /> : <UserDashboard />;
      case "my-borrowed-books":
        return <MyBorrowedBooks />;
      default:
        return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
    }
  };


  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-gray-100">
      <Sidebar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSelectedComponent={setSelectedComponent}
      />

      <div className="absolute right-6 top-7.5 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white z-20 lg:hidden">
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>
      <div className="flex-1 p-2 overflow-y-auto h-full xl:ml-64 lg:ml-64">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Home;
