import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { email, password })
      .then((result) => {
        console.log("result", result)
        alert(result.data.message)
        navigate("/login");
      })
      .catch((err) => {
        console.log("err", err)
        alert(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="text"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>
        <form action=""></form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
