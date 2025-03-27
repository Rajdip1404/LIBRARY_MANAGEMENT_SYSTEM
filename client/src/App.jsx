import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/verify-email/:email" element={<EmailVerification/>} />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
