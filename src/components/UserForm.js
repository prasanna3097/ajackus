import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserForm = ({ onSaveUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (id) {
      // Fetch user details for editing
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((data) => setFormData(data))
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveUser(formData);
    navigate("/");
  };

  return (
    <div>
      <h2>{id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-secondary ms-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
