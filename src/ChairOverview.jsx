import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/ChairOverview.css";

const ChairOverview = () => {
  const [chairs, setChairs] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();
  const branchId = location.state?.branchId;
  console.log("branchId inside chairOverview.jsx: ",branchId);
  
  const branchName = location.state?.branchName;
  console.log("Chairs from API:", chairs);

  useEffect(() => {
    let url = "";

    if (branchId) {
      console.log("Fetching chairs for branchId:", branchId);
      url=`http://localhost:3001/getchairdetails/${branchId}`;
    }else{
       console.log("Fetching chairs of ALL branches");
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
  }, [branchId]);

  const handleServiceClick = (chair) =>{
    console.log("chair.branchId ",chair.branchId);
    console.log("chair._id ",chair._id);
    console.log("Chair object:", chair);  
    navigate("/servicepage",{
      state: {
        //branchId: chair.branchId || chair._id,
        branchId:chair.branchId,
        branchName: chair.branchName,
        chairNumber: chair.chairNumber,
        employeeName: chair.employeeName,
        
      }
    })
  }
  return (
    <div className="chair-overview-container">
      <h2>Chair Details</h2>
      <h2>{branchName ? `Chairs in Branch: ${branchName}`: "All Branches"}</h2>
      <table className="overview-table">
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
              <td>
                <button onClick={() => handleServiceClick(chair)}>
                  Services
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default ChairOverview;
