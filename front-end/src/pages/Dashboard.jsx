import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [numTransactions, setNumTransactions] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  ); // Format: YYYY-MM
  const [barData, setBarData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in local storage");

        // Fetch expenses for the selected month
        const expenseResponse = await api.get(
          `/expenses/${userId}?month=${selectedMonth}`
        );
        if (expenseResponse.status === 404)
          throw new Error("Expenses not found");

        const expenses = expenseResponse.data;
        const totalExpense = expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        setTotalExpense(totalExpense);
        setNumTransactions(expenses.length);

        // Fetch monthly income
        const userData = await api.get(`/users/${userId}`);
        if (userData.status === 404) throw new Error("Income data not found");

        const monthlyIncome = userData.data.monthlyRevenue; // Adjust this if needed
        setTotalIncome(monthlyIncome);

        // Calculate balance
        setBalance(monthlyIncome - totalExpense);

        // Prepare bar chart data
        const expenseByDate = expenses.reduce((acc, expense) => {
          const date = new Date(expense.date).toLocaleDateString();
          if (!acc[date]) acc[date] = 0;
          acc[date] += expense.amount;
          return acc;
        }, {});

        const labels = Object.keys(expenseByDate);
        const data = Object.values(expenseByDate);

        setBarData({
          labels,
          datasets: [
            {
              label: "Expenses",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]); // Re-run fetch when selectedMonth changes

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const InfoCard = ({ title, value }) => (
    <div className="col-md-3 mb-4">
      <div className="card info-card">
        <h3 className="card-title mb-3">{title}</h3>
        <div className="card-body">
          <h4 className="card-value">{loading ? "Loading..." : value}</h4>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );

  return (
    <div
      className="container pt-4 text-white dashboard-container"
      style={{ marginTop: "7rem" }}
    >
      <h2 className="text-center">Dashboard</h2>
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
      </div>
    </div>
  );
};

export default Dashboard;
