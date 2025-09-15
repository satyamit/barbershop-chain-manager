// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CreateBranch from "./CreateBranch";
// import { Link } from "react-router-dom";

// const Login = () => {
//   return (
//     <div>
//       we are inside login page
//       <Link to="/createbranch">Create Branch</Link>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        alert(res.data.message);
        navigate("/createbranch"); // Redirect after login
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
