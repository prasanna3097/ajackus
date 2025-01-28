import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const handleSaveUser = (user) => {
    if (user.id) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((u) => (u.id === user.id ? user : u))
          );
        })
        .catch((err) => console.error("Failed to update user:", err));
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/users", user)
        .then((response) => {
          setUsers((prevUsers) => [
            ...prevUsers,
            { ...user, id: response.data.id },
          ]);
        })
        .catch((err) => console.error("Failed to add user:", err));
    }
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Failed to delete user:", err));
  };

  return (
    <Router>
      <div className="container">
        <h1>User Management</h1>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={<UserList users={users} onDelete={handleDeleteUser} />}
            />
            <Route
              path="/add"
              element={<UserForm onSaveUser={handleSaveUser} />}
            />
            <Route
              path="/edit/:id"
              element={<UserForm onSaveUser={handleSaveUser} />}
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
