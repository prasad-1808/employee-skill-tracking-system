import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import api from "../services/api";
import "chart.js/auto";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditExpenseModal from "./EditExpenseModal"; // Import the modal component
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const Transactions = ({ expenseUpdate, setExpenseUpdate }) => {
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

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
  }, [expenseUpdate, expenses]);

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
    animation: {
      duration: 30, // Total animation duration in milliseconds
      easing: "linear", // Use linear easing to make the animation uniform
    },
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      toast.success("Expense deleted successfully.");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <div className="container p-5" style={{ marginTop: "7rem" }}>
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.length > 0 ? (
                      expenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.category}</td>
                          <td>${expense.amount}</td>
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => handleEdit(expense)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(expense.id)}
                            >
                              <MdDeleteSweep />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
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
      {selectedExpense && (
        <EditExpenseModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          expense={selectedExpense}
          setExpenseUpdate={setExpenseUpdate}
        />
      )}
    </div>
  );
};

export default Transactions;
