import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminExists, setIsAdminExists] = useState(false);

  const navigate = useNavigate();

  //On load, check if an admin already exists
  useEffect(()=>{
    axios.get("http://localhost:3001/check-admin")
      .then(res =>{
        setIsAdminExists(res.data.exists);
      })
      .catch(err => console.error("Error checking admin: ", err));
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    //role is decided here -- first user = admin, others = manager
    const role = isAdminExists ? "manager" : "admin";

    axios
      .post("http://localhost:3001/signup", { email,password,role })
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
        <h2>{isAdminExists ? "Register as Manager" : "Register as Admin"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
              required
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
