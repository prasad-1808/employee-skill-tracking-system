import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import api from "../services/api";
import "chart.js/auto";

const ExpenseList = ({ expenseUpdate, setExpenseUpdate }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categorySums, setCategorySums] = useState({
    entertainment: 0,
    investment: 0,
    shopping: 0,
    medical: 0,
    education: 0,
    loan: 0,
    other: 0,
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/expenses/${userId}`);
      setExpenses(response.data);

      let total = 0;
      const categoryTotals = {
        entertainment: 0,
        investment: 0,
        shopping: 0,
        medical: 0,
        education: 0,
        loan: 0,
        other: 0,
      };

      response.data.forEach((expense) => {
        total += expense.amount;
        if (categoryTotals.hasOwnProperty(expense.category)) {
          categoryTotals[expense.category] += expense.amount;
        }
      });

      setTotalExpenses(total);
      setCategorySums(categoryTotals);
    };

    fetchExpenses();
  }, [expenseUpdate]);

  const data = {
    labels: [
      "Entertainment",
      "Investment",
      "Shopping",
      "Medical",
      "Education",
      "Loan",
      "Other",
    ],
    datasets: [
      {
        data: Object.values(categorySums),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Expense List</h4>
            </div>
            <div className="card">
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.length > 0 ? (
                      expenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.category}</td>
                          <td>${expense.amount}</td>
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No expenses recorded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">
                Total Expenses: ${totalExpenses.toFixed(2)}
              </h4>
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
