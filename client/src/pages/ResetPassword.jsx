import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/slices/auth.slice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import logo_with_title from "../assets/logo-with-title.png";
import logo from "../assets/black-logo.png";
import { resetAuthSlice } from "../store/slices/auth.slice";
import { Link } from "react-router-dom";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleResetPassword = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    dispatch(resetPassword(formData, token));
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
        {/* LEFT SECTION */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col justify-center items-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center h-[450px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl font-medium leading-10">
              "Your Digital Library"
            </h3>
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative">
          <Link
            to={"/forgot-password"}
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 left-10 hover:bg-black hover:text-white transition duration-300 text-center"
          >
            Back
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img
                  src={logo}
                  alt="logo"
                  className="mt-[-25px] mb-2 h-20 w-auto"
                />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-5">
              Reset Password
            </h1>
            <p className="text-gray-700 text-center mb-12">
              Please enter your new password to reset it
            </p>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full mb-4 py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <button
                type="submit"
                className="border-2 mt-5 w-full font-bold bg-black text-white py-3 rounded-md hover:bg-gray-200 hover:text-black transition duration-300"
                disabled={loading ? true : false}
              >
                RESET PASSWORD
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
