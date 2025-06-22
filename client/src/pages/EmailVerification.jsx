import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { emailVerification, resetAuthSlice } from "../store/slices/auth.slice";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const { email } = useParams();
  const [verificationCode, setVerificationCode] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleEmailVerification = (e) => {
    e.preventDefault();
    dispatch(emailVerification(email, verificationCode));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      console.log(isAuthenticated)
      // if (isAuthenticated) {
      //   dispatch(resetAuthSlice());
      // }
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, message]);

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* left side  */}
        <div className="w-full md:ww-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to={"/register"}
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 left-10 hover:bg-black hover:text-white transition duration-300 text-center"
          >
            Back to Sign Up
          </Link>
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounder-full flex items-center justify-center">
                <img src={logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
              Check your Mailbox
            </h1>
            <p className="text-gray-700 text-center mb-12">
              Please enter the Verification code to proceed
            </p>
            <form onSubmit={handleEmailVerification}>
              <div className="mb-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Verification Code"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <button
                type="submit"
                className="border-2 mt-5 w-full font-bold bg-black text-white py-3 rounded-md hover:bg-gray-200 hover:text-black transition duration-300"
              >
                VERIFY
              </button>
            </form>
          </div>
        </div>

        {/* right side  */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[5rem] rounded-bl-[5rem]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 text-center mb-12">
              Already have an account? <br /> Please log in
            </p>
            <Link
              to={"/login"}
              className="border-2 mt-5 w-full font-bold border-white  bg-black text-white py-3 px-8 rounded-md hover:bg-gray-200 hover:text-black transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
