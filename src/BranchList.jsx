import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    navigate(`/chairdetails`, {
      state: {
        branchId: branch._id,
        chairCount: branch.chairs,
        branchName: branch.name,
      },
    });
  };

  const handleAllChairOverviewClick = (branch) => {
    // navigate(`/chairoverview`, {
    //   state: {
    //     branchId, branchName },
    // });
    navigate(`/chairoverview`, {
      state: {
        branchId: branch._id,
        branchName: branch.name,
      },
    });
  };

  return (
    <div>
      <h2>All Branches</h2>
      <table style={{ border: "1px solid black" }}>
        <thead style={{ border: "1px solid black" }}>
          <tr>
            <th style={{ border: "1px solid black" }}>Branch Name</th>
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
                <button onClick={() => handleDetailsClick(branch)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {branches.length > 0 && (
        <button onClick={() => handleAllChairOverviewClick(branches[0])}>
          View All Chair Details
        </button>
      )}
    </div>
  );
};

export default BranchList;
