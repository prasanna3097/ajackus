import React from "react";

const UserList = ({ users, onEdit, onDelete }) => (
  <div className="table-responsive">
    <table className="table table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>

            <td>
              <button
                onClick={() => onEdit(user)}
                className="btn btn-warning btn-sm mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {users.length === 0 && (
      <div className="text-center text-muted mt-3">
        No users found. Please add a new user.
      </div>
    )}
  </div>
);

export default UserList;
