import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/auth.slice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  };

  useEffect(() => { 
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    
  }, [dispatch, message, error, loading, isAuthenticated]);
  
  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* left side  */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-8">
              <div className="rounder-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-8 overflow-hidden">
              Welcome Back
            </h1>
            <p className="text-gray-700 text-center mb-12">
              Please enter your credentials to log in
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <Link
                to={"/forgot-password"}
                className="font-semibold text-black mb-12"
              >
                Forgot Password?
              </Link>
              <div className="block md:hidden font-semibold mt-5">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    className="font-semibold text-gray-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="border-2 mt-5 w-full font-bold bg-black text-white py-3 rounded-md hover:bg-gray-200 hover:text-black transition duration-300"
              >
                LOG IN
              </button>
            </form>
          </div>
        </div>

        {/* right side  */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[5rem] rounded-bl-[5rem] transition duration-300">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="m-6 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 text-center mb-12">
              Don't have an account?
            </p>
            <Link
              to={"/register"}
              className="border-2 mt-5 w-full font-bold border-white  bg-black text-white py-3 px-8 rounded-md hover:bg-gray-200 hover:text-black transition duration-300"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
