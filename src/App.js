import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selectedUser, setSelectedUser] = useState(null); // Currently edited user
  const [error, setError] = useState(null); // Error handling

  // Fetch users on component mount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch(() => setError("Failed to fetch users"));
  }, []);

  // Save a user (add or update)
  const handleSaveUser = (user) => {
    if (user.id) {
      // Update existing user
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then((response) => {
          const updatedUsers = users.map((u) =>
            u.id === response.data.id ? response.data : u
          );
          setUsers(updatedUsers);
          setSelectedUser(null);
        })
        .catch(() => setError("Failed to update user"));
    } else {
      // Add new user
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then((response) => {
          setUsers([...users, { ...response.data, id: users.length + 1 }]); // Append user with mock ID
          setSelectedUser(null);
        })
        .catch(() => setError("Failed to add user"));
    }
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      })
      .catch(() => setError("Failed to delete user"));
  };

  return (
    <ErrorBoundary>
      <div className="container mt-4">
        <h1 className="text-center mb-4">User Management</h1>
        <div className="card shadow p-4">
          <UserList
            users={users}
            onEdit={setSelectedUser}
            onDelete={handleDeleteUser}
          />
          <button
            onClick={() => setSelectedUser({})}
            className="btn btn-primary mt-3"
          >
            Add User
          </button>
          {selectedUser && (
            <div className="mt-4">
              <h3>{selectedUser.id ? "Edit User" : "Add User"}</h3>
              <UserForm
                user={selectedUser}
                onSave={handleSaveUser}
                onCancel={() => setSelectedUser(null)}
              />
            </div>
          )}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
