import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure formData has the required properties
    const { name, email } = formData;

    // Make the POST request using axios
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name,
        email,
      })
      .then((response) => {
        console.log("User saved successfully:", response.data);
        onSave(response.data); // Pass the response data to the parent
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        alert("Failed to save user. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={formData.name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;
