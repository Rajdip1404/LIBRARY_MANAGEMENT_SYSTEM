import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../layout/Header.jsx'

const Users = () => {
  const {users} = useSelector((state) => state.user);

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  
  return (
    <>
      <main>
        <Header />
        {/* Sub header */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between items-center px-6 py-4">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Registered users
          </h2>
        </header>
        {/* table */}
        {users && users.filter((u) => u.role !== "Admin").length > 0 ? (
          <div className="mt-6 bg-white overflow-x-auto overflow-y-auto rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-Center">
                    No of Books Borrowed
                  </th>
                  <th className="px-4 py-2 text-center">Registered On</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((u) => u.role === "User")
                  .map((user, index) => (
                    <tr
                      key={user._id}
                      className={
                        (index + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2 text-center">
                        {user?.borrowedBooks?.length}
                      </td>
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
            <h2 className="text-xl font-medium">No users found</h2>
          </div>
        )}
      </main>
    </>
  );
}

export default Users