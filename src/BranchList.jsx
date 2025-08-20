import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/BranchList.css";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/getbranches")
      .then((res) => {
        setBranches(res.data);
      })
      .catch((err) => {
        console.log("Failed to fetch branches", err);
      });
  }, []);

  const handleDetailsClick = (branch) => {
    // navigate(`/chairdetails/${branchId}`,{state:{chairCount}});
    console.log("branch ids of all branches inside branchlist",branch);
    navigate(`/chairdetails`, {
      state: {
        branchId: branch._id,
        chairCount: branch.chairs,
        branchName: branch.name,
      },
    });
  };

  const handleAllChairOverviewClick = () => {
    // navigate(`/chairoverview`, {
    //   state: {
    //     branchId, branchName },
    // });
    navigate(`/chairoverview`, {
      state: {
        // branchId: branch._id,
        // branchName: branch.name,
        
      },
    });
  };

  const handleReportsClick = (branch) =>{
    navigate("/dailyreport",{
      state:{
        branchId: branch._id,
        branchName: branch.name,
      }
    })
  }
  return (
    <div className="branch-list-container">
      <h2>All Branches</h2>
      <table className="branch-table">
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Location</th>
            <th>Chairs</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch, index) => (
            <tr key={branch._id || index}>
              <td>{branch.name}</td>
              <td>{branch.location}</td>
              <td>{branch.chairs}</td>
              {/* <td>{index}</td> */}
              <td>
                <button
                  className="details-btn"
                  onClick={() => handleDetailsClick(branch)}
                >
                  Details
                </button>
                {" "}
                <button onClick={() => handleReportsClick(branch)}>
                  Show Reports
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {branches.length > 0 && (
        <button
          className="view-all-btn"
          onClick={() => handleAllChairOverviewClick()}
        >
          View All Chair Details
        </button>
      )}
    </div>
  );
};

export default BranchList;
