import React, { useState } from "react";
import closeIcon from "../assets/close-square.png";
import settingIcon from "../assets/setting.png";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/slices/auth.slice";
import { toggleSettingPopup } from "../store/slices/popup.slice";

const SettingPopup = ({ avatar }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [preview, setPreview] = useState(avatar?.url || "");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("New Password and Confirm Password do not match");
      return;
    }

    setError("");

    const data = new FormData();
    data.append("currentPassword", currentPassword);
    data.append("newPassword", newPassword);
    if (newAvatar) {
      data.append("avatar", newAvatar);
    }

    dispatch(updatePassword(data));
    dispatch(toggleSettingPopup());
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-7 pb-5 border-b border-gray-400">
            <div className="flex items-center gap-3">
              <img
                src={settingIcon}
                alt="setting-icon"
                className="bg-gray-300 p-5 rounded-lg"
              />
              <h3 className="text-xl font-bold">Change Credentials</h3>
            </div>
            <img
              src={closeIcon}
              alt="close-icon"
              onClick={() => dispatch(toggleSettingPopup())}
              className="cursor-pointer"
            />
          </header>

          {/* Content Section */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center w-full lg:w-1/3 gap-3">
              <img
                src={preview}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-900"
              />
              <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <div className="h-auto w-0.5 bg-black"></div>

            {/* Password Form Section */}
            <form onSubmit={handleUpdatePassword} className="w-full lg:w-2/3">
              <div className="mb-4">
                <label className="block text-gray-900 font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter Current Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-900 font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => dispatch(toggleSettingPopup())}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-black hover:shadow-md"
                >
                  {loading ? "Confirming..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPopup;
