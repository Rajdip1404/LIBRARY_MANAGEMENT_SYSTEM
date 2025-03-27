import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/auth.slice";
import { toast } from "react-toastify";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };

  useEffect(() => {
    if (message) navigateTo(`/verify-email/${email}`);
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* left side  */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col justify-center items-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center h-[376px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                className="mb-12 h-44 w-auto"
                alt="logo"
              />
            </div>
            <p className=" text-gray-200 mb-12">Already have Account? </p>
            <Link
              to="/login"
              className="border-2 rounder-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl overflow-hidden">
                  Sign Up
                </h3>
                <img
                  src={logo}
                  alt="logo"
                  className="h-auto w-24 object-cover"
                />
              </div>
            </div>
            <p className="text-gray-800 text-center mb-12">
              Please provide your information to sign up
            </p>
            <form onSubmit={handleRegister}>
              <div className="mb-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-black rounder-md focus:outline-none"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounder-md focus:outline-none"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounder-md focus:outline-none"
                />
              </div>
              <div className="block md:hidden font-semibold mt-5">
                <p>Already have an Account?</p>
                <Link to="/login" className="text-sm text-gray-500 hover:underline">
                  Login
                </Link>
              </div>
              <button type="submit" className="border-2 mt-5 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"> Sign Up </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
