import React, { useEffect, useState } from "react";
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Expense = ({ expenseUpdate, setExpenseUpdate }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  // const [totalExpenses, setTotalExpenses] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const userResponse = await api.get(`/users/${userId}`);

        // Fetch expenses for the selected month
        const expenseResponse = await api.get(`/expenses/${userId}`);
        if (expenseResponse.status === 404)
          throw new Error("Expenses not found");

        // Accumulate the total expenses
        const totalExpenses = expenseResponse.data.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );

        // Calculate the remaining balance
        const balance = userResponse.data.monthlyRevenue - totalExpenses;
        setCurrentBalance(balance);

        console.log(balance, userResponse.data.monthlyRevenue, totalExpenses);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [expenseUpdate]); // Add expenseUpdate as a dependency to refetch balance after adding an expense

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      // Fetch the most recent balance
      const userResponse = await api.get(`/users/${userId}`);

      // Fetch expenses for the selected month
      const expenseResponse = await api.get(`/expenses/${userId}`);
      if (expenseResponse.status === 404) throw new Error("Expenses not found");

      // Accumulate the total expenses
      const totalExpenses = expenseResponse.data.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );

      // Calculate the remaining balance
      const balance = userResponse.data.monthlyRevenue - totalExpenses;

      // Check if the expense exceeds the available balance
      if (parseFloat(amount) > balance) {
        alert(
          "Expense exceeds available balance. Please enter a valid amount."
        );
        return;
      }

      // Proceed with adding the expense if the balance is sufficient
      await api.post("/expenses", {
        userId,
        category,
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
      });

      // Clear form fields after submission
      setCategory("");
      setAmount("");
      setDate("");

      // Update expense state to trigger balance re-fetch
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="container p-5 shadow-2" style={{ marginTop: "7rem" }}>
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

export default Expense;
