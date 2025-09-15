import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/CreateBranch.css";

const CreateBranch = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [chairs, setChairs] = useState("");
  //manager credentials
  const [managerEmail,setManagerEmail] = useState("");
  const [managerPassword,setManagerPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createbranch", {
        name,
        location,
        chairs,
        managerEmail,
        managerPassword
      })
      .then((result) => {
        console.log("create branch result", result);
        alert(result.data.message);
      }) 
      .catch((err) => console.log("create branch error", err));
  };
  return (
    <div className="create-branch-container">
      <div className="create-branch-box">
        <h2>Create Branch</h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Branch Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Chairs"
            value={chairs}
            onChange={(e) => setChairs(e.target.value)}
            required
          />
          <h3>Manager Credentials</h3>
          <div>
            <label htmlFor="">Manager Email:</label>
            <input 
              type="text" 
              placeholder="Manager Email" 
              value={managerEmail}
              onChange={(e) => setManagerEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <label htmlFor="">Manager Password</label>
            <input 
              type="password" 
              placeholder="Manager Password" 
              value={managerPassword}
              onChange={(e) => setManagerPassword(e.target.value)}
            />
          </div>

          <button type="submit">Create Branch</button>
        </form>
        <Link to="/branchlist">Show Branch Details</Link>
        {/* <button onClick={()=>}>Show All Branch Details</button> */}
      </div>
    </div>
  );
};

export default CreateBranch;
