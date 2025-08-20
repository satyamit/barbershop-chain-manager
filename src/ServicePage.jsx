import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./CSS/ServicePage.css";
const ServicePage = () => {
  const location = useLocation();
  const { branchId, branchName, chairNumber, employeeName } = location.state;

  const [serviceName, setServiceName] = useState("");
  const [amount, setAmount] = useState("");
  const [services, setServices] = useState([]);

  const handleAddService = () => {
    if (!serviceName || !amount) return alert("Please fill all fields");

    const newService = { serviceName, amount };
    setServices([...services, newService]);
    setServiceName("");
    setAmount("");
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3001/servicepage", {
        branchId,
        branchName,
        chairNumber,
        employeeName,
        services,
      })
      .then(() => alert("Services saved successfully"))
      .catch((err) => console.error(err));
      console.log("ServicePage state:", location.state);

  };

  return (
    <div className="service-page">
      <h2>
        {branchName} - Chair {chairNumber} ({employeeName})
      </h2>

      <select
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      >
        <option value="">Select Service</option>
        <option value="Normal Hair Cut">Normal Hair Cut</option>
        <option value="Shave">Shave</option>
        <option value="Facial">Facial</option>
        <option value="Fashionable Cutting">Fashionable Cutting</option>
        <option value="Hair Cut for Child">Hair Cut for Child</option>
        <option value="Fashionable Cutting for child">
          Fashionable Cutting for child
        </option>
        <option value="Hair Cut for Girl">Hair Cut for Girl</option>
        <option value="Cutline">Cutline</option>
        <option value="bald">bald</option>
        <option value="Hair Colour">Hair Colour</option>
        <option value="Garnier hair colour">Garnier hair colour</option>
        <option value="Loreal hair colour">Loreal hair colour</option>
        <option value="Powder/Mehandi Hair Colour">
          Powder/Mehandi Hair Colour
        </option>
        <option value="Head Massage only with Oil">
          Head Massage only with Oil
        </option>
        <option value="Head Massage with Oil and machine">
          Head Massage with Oil and machine
        </option>
        <option value="Hair Black">Hair Black</option>
        <option value="Moustache Cut">Moustache Cut</option>
        <option value="Underarm hair removal">Underarm hair removal</option>
        <option value="Simple Beard">Simple Beard</option>
        <option value="Special Beard">Special Beard</option>
        <option value="Foam Beard">Foam Beard</option>
        <option value="Style Beard">Style Beard</option>
        <option value="Beard with zero machine">Beard with zero machine</option>
        <option value="Face Cleaning">Face Cleaning</option>
        <option value="Face Massage">Face Massage</option>
        <option value="Simple Facial">Simple Facial</option>
        <option value="Branded Facial">Branded Facial</option>
        <option value="Bleach Facial">Bleach Facial</option>
        <option value="Mask Facial">Mask Facial</option>
        <option value="Detan Facial">Detan Facial</option>
        <option value="Strstraightening hair">straightening hair</option>
        <option value="Hair Setting">Hair Setting</option>
        <option value="Hair Shampoo">Hair Shampoo</option>
        <option value="Munj">Munj</option>
        <option value="Jawal">Jawal</option>
        <option value="Scrab">Scrab</option>
        <option value="Hair keratin treatment">Hair keratin treatment</option>
        <option value="Hair buttocks treatment">Hair buttocks treatment</option>
        <option value="Hair premium treatment">Hair premium treatment</option>
        <option value="Body massage">Body massage</option>
        <option value="Eyebrow thirteen">Eyebrow thirteen</option>
        <option value="Coraline hair colour">Coraline hair colour</option>
        <option value="Highlight colours">Highlight colours</option>
        <option value="Charcoal mask">Charcoal mask</option>
        <option value="Hydra facial">Hydra facial</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleAddService}>Add Service</button>

      <h3>Today's Services</h3>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={i}>
              <td>{s.serviceName}</td>
              <td>{s.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-bar">
        Total: ₹
        {services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0)}
      </div>

      <button onClick={handleSubmit}>Save All Services</button>
    </div>
  );
};

export default ServicePage;
