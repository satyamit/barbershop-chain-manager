import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useLocation } from "react-router-dom";
import "./CSS/DailyReport.css";

const DailyReport = () => {
  const location = useLocation();
  const branchId = location.state?.branchId;
  const branchName = location.state?.branchName;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);

  const fetchReport = () => {
    console.log(
      "Sending branchId:",
      branchId,
      "Start:",
      startDate,
      "End:",
      endDate
    );

    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    console.log("sending request to /getreport with: ", {
      branchId,
      startDate,
      endDate,
    });

    axios
      .get("http://localhost:3001/getreport", {
        params: {
          branchId,
          startDate,
          endDate,
        },
      })
      .then((res) => {
        console.log("Report Data:", res.data);
        setReportData(res.data);
      })
      .catch((err) => console.error("Error fetching report:", err));
  };

  const generatePDF = () => {
    if (reportData.length === 0) {
      alert("No data available for PDF export");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Report - ${branchName}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`From: ${startDate}  To: ${endDate}`, 14, 30);

    const tableData = [];

    reportData.forEach((entry) => {
      entry.services.forEach((service) => {
        tableData.push([
          entry.chairNumber,
          entry.employeeName,
          service.serviceName,
          `\u20B9${service.amount}`,
          new Date(entry.createdAt).toLocaleDateString(),
        ]);
      });
    });

    // ✅ Use autoTable correctly
    autoTable(doc, {
      head: [["Chair", "Employee", "Service", "Amount", "Date"]],
      body: tableData,
      startY: 40,
    });

    // ✅ Print total
    const total = reportData.reduce(
      (sum, entry) =>
        sum +
        entry.services.reduce((s, service) => s + Number(service.amount), 0),
      0
    );

    const finalY = doc.lastAutoTable?.finalY || 50;
    doc.text(`Total: \u20B9${total}`, 14, finalY + 10);

    doc.save(`${branchName}_Report.pdf`);
  };

  return (
    <div className="daily-report-container">
      <h2>Report for {branchName}</h2>
      <div className="date-filters">
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label style={{ marginLeft: "20px" }}>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button onClick={fetchReport} style={{ marginLeft: "20px" }}>
          Generate Report
        </button>
      </div>

      {reportData.length > 0 && (
        <div className="report-preview">
          <h3>Report Preview</h3>
          <table className="report-table">
            <thead>
              <tr>
                <th>Chair</th>
                <th>Employee</th>
                <th>Service</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((entry) =>
                entry.services.map((service, idx) => (
                  <tr key={idx}>
                    <td>{entry.chairNumber}</td>
                    <td>{entry.employeeName}</td>
                    <td>{service.serviceName}</td>
                    <td>₹{service.amount}</td>
                    <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <button onClick={generatePDF} className="btn download-btn">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyReport;
