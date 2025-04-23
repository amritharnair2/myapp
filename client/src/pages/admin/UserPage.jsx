import React, { useEffect, useState } from 'react';
import { listUsers } from '../../services/AdminServices';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await listUsers();
          const filteredUsers = res.data
        .filter(user => user.role === "user")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setUsers(filteredUsers);
          console.log(res.data)
        } catch (err) {
          console.log(err);
        }
      };
      fetchUsers();
    }, []);

    const formatDate = (dateString) => {
      const date = new Date(dateString)    
      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-GB", options);
      const time = date.toTimeString().split(" ")[0];
      return `${formattedDate}, ${time}`;
    };

  return (
    <div className="text-white font-serif">

    
      {/* Main Content */}
      <div className=" text-black space-y-8">
        {/* Recent Users */}
        <section>
        <h2 className="text-2xl font-bold text-black">Users</h2>
          <table className="w-full text-left border border-black bg-white mt-5">
          <thead className="bg-gray-400 text-black font-bold">
              <tr>
                <th className="p-2 border border-black">User</th>
                <th className="p-2 border border-black">Email</th>
                <th className="p-2 border border-black">Created At</th>
              </tr>
            </thead>
            <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white border border-black">
                <td className="p-2 border border-black text-black">{user.name}</td>
                <td className="p-2 border border-black text-black">{user.email}</td>
                <td className="p-2 border border-black text-black">{formatDate(user.createdAt)}</td>

              </tr>
            ))}
          </tbody>
          </table>
        </section>

        {/* All Users */}
      </div>

    </div>
  );
};

export default AdminUsersPage


