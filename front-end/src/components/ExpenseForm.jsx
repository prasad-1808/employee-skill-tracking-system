import React, { useState } from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenseForm = ({ expenseUpdate, setExpenseUpdate }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      await api.post("/expenses", {
        userId,
        category,
        amount,
        date: new Date(date).toISOString(),
      });
      // Clear form fields after submission
      setCategory("");
      setAmount("");
      setDate("");
      setExpenseUpdate(expenseUpdate + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Add Expense</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-3">
                  <label htmlFor="category" className="col-sm-4 col-form-label">
                    Category:
                  </label>
                  <div className="col-sm-8">
                    <select
                      id="category"
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="investment">Investment</option>
                      <option value="shopping">Shopping</option>
                      <option value="medical">Medical</option>
                      <option value="education">Education</option>
                      <option value="loan">Loan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="amount" className="col-sm-4 col-form-label">
                    Amount:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      id="amount"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="date" className="col-sm-4 col-form-label">
                    Date:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="date"
                      id="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12 text-center">
                    <button type="submit" className="btn btn-primary">
                      Add Expense
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
