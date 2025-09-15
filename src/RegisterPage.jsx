import React, { use, useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");
  
  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:3001/registerpage", {
        username,
        password,
        role,
      });
      alert(`User registered as ${res.data.role}`);
    } catch (err) {
      console.error(err);
      alert("Registered failed");
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <select name="" id="" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;
