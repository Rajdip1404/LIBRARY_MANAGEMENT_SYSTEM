import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/auth.slice.js";
import { fetchAllAdmins, fetchAllLibrarians, fetchAllUsers } from "./store/slices/user.slice.js";
import { fetchAllBooks } from "./store/slices/book.slice.js";
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from "./store/slices/borrow.slice.js";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const {loading} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]); // Only runs once on initial mount


  useEffect(() => {
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchAllAdmins());
      dispatch(fetchAllLibrarians());
      dispatch(fetchAllBorrowedBooks());
      dispatch(fetchAllBooks());
    }
  }, [isAuthenticated, user, dispatch]); // Runs only when these change

  useEffect(() => {
    if (isAuthenticated && user?.role === "Librarian") {
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
    }
    if (isAuthenticated && user?.role === "User") {
      dispatch(fetchAllBooks());
      dispatch(fetchUserBorrowedBooks());
    }
    if(!isAuthenticated){
      dispatch(fetchAllBooks());
    }
  }, [isAuthenticated, user, dispatch]); // Runs only when these change

  // useEffect(() => {
  //   if (isAuthenticated && user?.role === "Admin") {
  //     dispatch(fetchAllUsers());
  //     dispatch(fetchAllAdmins());
  //     dispatch(fetchAllLibrarians());
  //     dispatch(fetchAllBorrowedBooks());
  //     dispatch(fetchAllBooks());
  //   }
  //   if (isAuthenticated && user?.role === "Librarian") {
  //     dispatch(fetchAllBooks());
  //     dispatch(fetchAllBorrowedBooks());
  //   }
  //   if (isAuthenticated && user?.role === "User") {
  //     dispatch(fetchAllBooks());
  //     dispatch(fetchUserBorrowedBooks());
  //   }
  //   if(!isAuthenticated){
  //     dispatch(fetchAllBooks());
  //   }
  // }, [isAuthenticated, user, dispatch]); // Runs only when these change

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email/:email" element={<EmailVerification />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
