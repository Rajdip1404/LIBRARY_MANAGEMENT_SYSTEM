import React, { useState } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { addNewLibrarian } from "../store/slices/user.slice";
import { toggleAddNewLibrarianPopup } from "../store/slices/popup.slice";

const AddNewLibrarian = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(file);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewLibrarian = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match");
      return;
    }
    if(!avatar) {
      setError("Please select an avatar");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    dispatch(addNewLibrarian(formData)).then(() => {
      dispatch(toggleAddNewLibrarianPopup());
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <header className="flex items-center justify-between mb-7 pb-5 border-b-1 border-black">
            <div className="flex items-center gap-3">
              <img
                src={keyIcon}
                alt="key-icon"
                className="bg-gray-300 p-5 rounded-lg"
              />
              <h3 className="text-xl font-bold">Add New Librarian</h3>
            </div>
            <img
              src={closeIcon}
              alt="close-icon"
              onClick={() => dispatch(toggleAddNewLibrarianPopup())}
              className="cursor-pointer"
            />
          </header>

          <form onSubmit={handleAddNewLibrarian}>
            <div className="mb-5 flex flex-col items-center">
              <label htmlFor="avatarInput" className="cursor-pointer">
                <img
                  src={avatarPreview ? avatarPreview : placeHolder}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Librarian's Name"
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Librarian's Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-900 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => dispatch(toggleAddNewLibrarianPopup())}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-black hover:shadow-md"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewLibrarian;
