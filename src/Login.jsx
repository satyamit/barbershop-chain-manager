import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateBranch from "./CreateBranch";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      we are inside login page
      <Link to="/createbranch">Create Branch</Link>
    </div>
  );
};

export default Login;
