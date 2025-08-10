import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChairOverview = () => {
  const [chairs, setChairs] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();
  const branchId = location.state?.branchId;
  const branchName = location.state?.branchName;

  useEffect(() => {
    let url = "";

    if (!branchName) {
      console.warn("No branchId found from navigation state");
      url=`http://localhost:3001/getchairdetails/${branchName}`;
    }else{
      console.log("Fetching chairs of all branches: ", branchName);
      url = `http://localhost:3001/getallchairdetails`;
    }
    
    axios
      .get(url)
      .then((res) => {
        console.log("API Response",res.data);
        setChairs(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch chair details", err);
      });
  }, [branchName]);

  return (
    <div>
      <h2>Chair Details</h2>
      <h2>{branchName ? `Chairs in Branch: ${branchName}`: "All Branches"}</h2>
      <table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Chair Number</th>
            <th>Employee Name</th>
          </tr>
        </thead>
        <tbody>
          {chairs.map((chair) => (
            <tr key={chair._id}>
              {/* <td>{chair.branchName}</td> */}
              <td>{chair.branchName}</td>
              <td>{chair.chairNumber}</td>
              <td>{chair.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChairOverview;
