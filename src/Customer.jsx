import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./CSS/Customer.css";
const Customer = () => {
  const location = useLocation();
  //const branchId = location.state?.branchId;
  //const branchName = location.state?.branchName;

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentmode, setPaymentmode] = useState("cash");

  const handleAddCustomer = () => {
    if (!customerName || !mobile || !amount || !paymentmode) {
      alert("Please fill all fields");
      return;
    }
    console.log("Submitting customer:", {
      customerName,
      mobile,
      paymentmode,
      amount,
    });

    axios
      .post("http://localhost:3001/customer", {
        customerName,
        mobile,
        paymentmode,
        amount,
      })
      .then((res) => {
        console.log("customer result", res);
        alert("Customer added successfully");
        setCustomerName("");
        setAmount("");
        setMobile("");
        setPaymentmode("cash");
      })
      .catch((err) => {
        console.log("err", err);
        alert(err.response?.data?.message || "Customer Details Failed");
      });
  };

  const handleWhatsappCustomer = () => {
    axios
      .post("http://localhost:3001/send-whatsapp", {
        mobile,
        customerName,
      })
      .then(() => {
        alert("WhatsApp message sent to customer!");
      })
      .catch((err) => {
        console.log("WhatsApp error", err);
        alert("Failed to send WhatsApp message");
      });
  };

  return (
    <div className="customer-page">
      <h2>Customer Management</h2>
      <div className="form-box">
        <label htmlFor="">Customer Name</label>
        <input
          type="text"
          placeholder="Customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <label htmlFor="">Mobile Number</label>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <label htmlFor="">Payment Mode</label>
        <select
          name=""
          id=""
          value={paymentmode}
          onChange={(e) => setPaymentmode(e.target.value)}
        >
          <option value="">Cash</option>
          <option value="">Online</option>
        </select>
        <label htmlFor="">Amount</label>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
      {/* <button onClick={handleWhatsappCustomer}>Send Whatsapp message</button> */}
    </div>
  );
};

export default Customer;
