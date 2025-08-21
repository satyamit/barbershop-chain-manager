import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./CSS/ChairDetails.css";
const ChairDetails = () => {
  const [chairs, setChairs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const chairCount = parseInt(location.state?.chairCount || 0);
  const branchName = location.state?.branchName;
  const branchId = location.state?.branchId;
  console.log("branchId inside ChairDetails ",branchId);
  useEffect(() => {
    const chairData = [];
    for (let i = 1; i <= chairCount; i++) {
      chairData.push({
        chairNumber: i,
        employeeName: "",
        // service: "",
        // amount: "",
      });
    }
    setChairs(chairData);
  }, [chairCount]);

  const handleChange = (index, field, value) => {
    const updated = [...chairs];
    updated[index][field] = value;
    setChairs(updated);
  };

  const handleSubmit = async() => {
    if(!branchId){
      alert("Missing branchId. Cannot save chairs.")
    }

    try{
      const payload = {
        branchId,
        branchName,
        chairs,
      }
      console.log("Sending chair Details",payload);
    await axios
      .post("http://localhost:3001/chairdetails",payload);
      alert("Chair Details saved successfully");
      navigate("/branchlist");
      }catch(err)  {
        console.error("Error while saving chair details ");
        alert("Error saving chairs");
      };
  };

  // const handleAllChairOverviewClick = () =>{
  //   Navigate(`/chairoverview`,{
  //     state:{
  //       branchId
  //     }
  //   })
  // } 
  // const handleServiceClick = (chair) =>{
  //   navigate("/servicepage",{
  //     state:{
  //       branchId,
  //       branchName,
  //       chairNumber:chair.chairNumber,
  //       employeeName:chair.employeeName
  //     }
  //   })
  // }
  return (
    <div className="chair-details-container">
      <h2>ChairDetails</h2>
      <h2>{branchName}</h2>
      {/* <form action="">
        <input 
          type="text"
          placeholder="Emplyee Name"
          value={chairs}
          onChange={(e)=> setChairs(e.target.value)}
        />
        <input 
          type="text"
          placeholder=""
        />
      </form> */}
      <table className="chair-table">
        <thead>
          <tr>
            <th>Chair</th>
            <th>Employee</th>
            {/* <th>Services</th>
            <th>Amount</th> */}
          </tr>
        </thead>
        <tbody>
          {chairs.map((chair, index) => (
            <tr key={index}>
              <td>{chair.chairNumber}</td>
              <td>
                <input
                  type="text"
                  value={chair.employeeName}
                  placeholder="Name"
                  className="chair-input"
                  onChange={(e) =>
                    handleChange(index, "employeeName", e.target.value)
                  }
                />
              </td>
              {/* <td><button onClick={()=> handleServiceClick(chair)} >service</button></td> */}
              {/* <td>
                  <input
                    type="text"
                    value={chair.service}
                    onChange={(e) =>
                      handleChange(index, "service", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={chair.amount}
                    onChange={(e) =>
                      handleChange(index, "amount", e.target.value)
                    }
                  />
                </td> */}
            </tr>
          ))}
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <button className="submit-btn" onClick={() => handleSubmit()}>
                Submit Chair Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChairDetails;
