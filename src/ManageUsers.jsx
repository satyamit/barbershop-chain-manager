import React, { useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/add-user",
        { username, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Users</h2>
      <input
        type="text"
        placeholder="New Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default ManageUsers;
