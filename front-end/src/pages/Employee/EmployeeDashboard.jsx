import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeDashboard = () => {

  return (
    <div
      className="container pt-4 text-white dashboard-container"
      style={{ marginTop: "7rem" }}
    >
      <h1>Employee Dashboard</h1>
    </div>
  );
};

export default EmployeeDashboard;

{/* <h2 className="text-center">Dashboard</h2>
      <div className="form-group">
        <label htmlFor="monthSelect">Select Month:</label>
        <input
          type="month"
          id="monthSelect"
          className="form-control"
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>
      <center>
        <div className="row mt-4">
          <InfoCard title="Total Income" value={`$${totalIncome.toFixed(2)}`} />
          <InfoCard
            title="Total Expense"
            value={`$${totalExpense.toFixed(2)}`}
          />
          <InfoCard title="Transactions" value={numTransactions} />
          <InfoCard title="Balance" value={`$${balance.toFixed(2)}`} />
        </div>
      </center>
      <div className="mt-5 card">
        <h4 className="text-center mb-4">Expenses by Date</h4>
        <Bar data={barData} />
      </div> */}