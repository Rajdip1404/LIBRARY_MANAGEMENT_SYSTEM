import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout, resetAuthSlice } from "../store/slices/auth.slice.js";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
  toggleAddNewLibrarianPopup,
} from "../store/slices/popup.slice.js";
import AddNewAdmin from "../popups/AddNewAdmin.jsx";
import SettingPopup from "../popups/SettingPopup.jsx";
import AnonymousSettingPopup from "../popups/AnonymousSettingPopup.jsx";
import AddNewLibrarian from "../popups/AddNewLibrarian.jsx";
import { useNavigate } from "react-router-dom"; // ✅ FIXED import

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const {
    addNewAdminPopup,
    addNewLibrarianPopup,
    settingPopup,
    anonymousSettingPopup,
  } = useSelector((state) => state.popup);

  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } z-10 transition-all duration-700 lg:relative lg:left-0 flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>
        <nav className="flex-1 px-6 space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setSelectedComponent("dashboard")}
            className="w-full py-2 font-medium flex items-center space-x-2"
          >
            <img src={dashboardIcon} alt="dashboard" /> <span>Dashboard</span>
          </button>

          {/* Books - accessible for ALL users including anonymous */}
          <button
            onClick={() => setSelectedComponent("Books")}
            className="w-full py-2 font-medium flex items-center space-x-2 cursor-pointer"
          >
            <img src={bookIcon} alt="books" /> <span>Books</span>
          </button>

          {/* Catalog - Admin & Librarian only */}
          {isAuthenticated &&
            (user?.role === "Admin" || user?.role === "Librarian") && (
              <button
                onClick={() => setSelectedComponent("Catalog")}
                className="w-full py-2 font-medium flex items-center space-x-2"
              >
                <img src={catalogIcon} alt="catalog" /> <span>Catalog</span>
              </button>
            )}

          {/* Users + Admin features */}
          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button
                onClick={() => setSelectedComponent("Users")}
                className="w-full py-2 font-medium flex items-center space-x-2"
              >
                <img src={usersIcon} alt="users" /> <span>Users</span>
              </button>
              <button
                onClick={() => dispatch(toggleAddNewAdminPopup())}
                className="w-full py-2 font-medium flex items-center space-x-2"
              >
                <RiAdminFill className="w-6 h-6" /> <span>Add New Admin</span>
              </button>
              <button
                onClick={() => dispatch(toggleAddNewLibrarianPopup())}
                className="w-full py-2 font-medium flex items-center space-x-2"
              >
                <RiAdminFill className="w-6 h-6" />{" "}
                <span>Add New Librarian</span>
              </button>
            </>
          )}

          {/* My Borrowed Books - User only */}
          {isAuthenticated && user?.role === "User" && (
            <button
              onClick={() => setSelectedComponent("my-borrowed-books")}
              className="w-full py-2 font-medium flex items-center space-x-2"
            >
              <img src={catalogIcon} alt="my-borrowed-books" />{" "}
              <span>My Borrowed Books</span>
            </button>
          )}

          {/* Settings */}
          {isAuthenticated && (
            <button
              onClick={() => dispatch(toggleSettingPopup())}
              className="w-full py-2 font-medium flex items-center space-x-2"
            >
              <img src={settingIcon} alt="setting" />{" "}
              <span>Update Credentials</span>
            </button>
          )}
        </nav>

        {/* Footer: Login / Logout */}
        <div className="px-6 py-4">
          {isAuthenticated ? (
            <button
              className="py-2 flex items-center justify-center space-x-5 mx-auto w-fit"
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="logout" /> <span>Log Out</span>
            </button>
          ) : (
            <button
              className="py-2 flex items-center justify-center space-x-5 mx-auto w-fit"
              onClick={() => navigate("/login")} // ✅ FIXED navigation
            >
              <img src={logoutIcon} alt="login" /> <span>Log In</span>
            </button>
          )}
        </div>

        {/* Close Button for mobile */}
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden"
        />
      </aside>

      {/* Popups */}
      {addNewAdminPopup && <AddNewAdmin />}
      {addNewLibrarianPopup && <AddNewLibrarian />}
      {settingPopup && <SettingPopup avatar={user?.avatar} />}
      {anonymousSettingPopup && <AnonymousSettingPopup />}
    </>
  );
};

export default SideBar;
