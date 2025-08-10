import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ChairDetails = () => {
  const [chairs, setChairs] = useState([]);
  const location = useLocation();
  const chairCount = parseInt(location.state?.chairCount || 0);
  const branchName = location.state?.branchName;

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
  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/chairdetails", {
        branchName,
        chairs,
      })
      .then((res) => {
        alert("chair details saved succcessfully");
      })
      .catch((err) => {
        console.error("Error ");
      });
  };
  return (
    <div>
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
      <table>
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
                  onChange={(e) =>
                    handleChange(index, "employeeName", e.target.value)
                  }
                />
              </td>
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
            <td>
              <button onClick={() => handleSubmit()}>
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
