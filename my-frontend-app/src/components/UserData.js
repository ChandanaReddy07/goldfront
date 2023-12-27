import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import ExportButton from './Exportfile';
import './style.css'

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  //fetching use data from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://goldbakckend.onrender.com/user/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (id, user) => {
    setEditingUser({ id, ...user });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(
        `https://goldbakckend.onrender.com/user/users/${editingUser.id}`,
        editingUser
      );
      console.log(response.data);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="UserTable">
      <h2>User Table</h2>
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>
        
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editingUser.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editingUser.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    name="gender"
                    value={editingUser.gender}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.gender
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    name="status"
                    value={editingUser.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.status
                )}
              </td>

              {/* Edit button and other actions */}
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <button onClick={updateUser}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(user.id, user)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ExportButton users={users} />

    </div>
);
};


export default UserTable