import React from "react";
import closeIcon from "../assets/close-square.png";
import { useDispatch } from "react-redux";
import { toggleAnonymousSettingPopup } from "../store/slices/popup.slice";
import { Link } from "react-router-dom";

const AnonymousSettingPopup = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-7 pb-5 border-b border-gray-400">
            <h3 className="text-xl font-bold">Account Required</h3>
            <img
              src={closeIcon}
              alt="close-icon"
              onClick={() => dispatch(toggleAnonymousSettingPopup())}
              className="cursor-pointer"
            />
          </header>

          {/* Content */}
          <div className="flex flex-col items-center text-center gap-6 p-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              ⚠️ You are currently browsing as an{" "}
              <strong>Anonymous User</strong>. To update settings, borrow books,
              and access more features, you need to create an account.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to="/login"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
                onClick={() => dispatch(toggleAnonymousSettingPopup())}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-center"
                onClick={() => dispatch(toggleAnonymousSettingPopup())}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousSettingPopup;
