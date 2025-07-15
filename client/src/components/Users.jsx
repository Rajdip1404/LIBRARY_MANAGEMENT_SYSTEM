import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header.jsx";

const Users = () => {
  const { users, admins, librarians } = useSelector((state) => state.user);

  const [selectedRole, setSelectedRole] = useState("User");

  const getUsersByRole = () => {
    switch (selectedRole) {
      case "User":
        return users;
      case "Admin":
        return admins;
      case "Librarian":
        return librarians;
      default:
        return [];
    }
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };

  const roleUsers = getUsersByRole();

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-2">
      <Header />

      {/* Sub-header: Filter Buttons + Title */}
      <header className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center mb-6 mt-5">
        <h2 className="text-xl sm:text-2xl font-semibold">
          {selectedRole === "User"
            ? "Registered Users"
            : selectedRole === "Librarian"
            ? "Librarians"
            : "Admin Users"}
        </h2>

        {/* Role filter buttons */}
        <div className="flex gap-2 flex-wrap">
          {["User", "Librarian", "Admin"].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded font-semibold text-lg border-2 transition-colors duration-300 ${
                selectedRole === role
                  ? "bg-black text-white border-black"
                  : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
              }`}
            >
              {role === "User"
                ? "Users"
                : role === "Librarian"
                ? "Librarians"
                : "Admins"}
            </button>
          ))}
        </div>
      </header>

      {/* Table or empty state */}
      <div className="w-full overflow-x-auto max-h-[80vh] overflow-y-auto rounded-md">
        {roleUsers.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-md shadow-lg">
            <table className="min-w-[600px] w-full border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  {selectedRole === "User" && (
                    <th className="px-4 py-2 text-center">Books Borrowed</th>
                  )}
                  <th className="px-4 py-2 text-center">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roleUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    {selectedRole === "User" && (
                      <td className="px-4 py-2 text-center">
                        {user?.borrowedBooks?.length || 0}
                      </td>
                    )}
                    <td className="px-4 py-2 text-center">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <h2 className="text-xl font-medium">
              No {selectedRole.toLowerCase()}s found
            </h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default Users;
