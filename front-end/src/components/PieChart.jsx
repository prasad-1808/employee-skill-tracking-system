// PieChart.jsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import api from "../services/api";
import "chart.js/auto";

const PieChart = () => {
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
      const expenses = response.data;

      const categoryTotals = {
        entertainment: 0,
        investment: 0,
        shopping: 0,
        medical: 0,
        education: 0,
        loan: 0,
        other: 0,
      };

      expenses.forEach((expense) => {
        if (categoryTotals.hasOwnProperty(expense.category)) {
          categoryTotals[expense.category] += expense.amount;
        }
      });

      setCategorySums(categoryTotals);
    };

    fetchExpenses();
  }, []);

  const data = {
    labels: Object.keys(categorySums),
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

  return <Pie data={data} options={options} />;
};

export default PieChart;
