// BarChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((expense) => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: "Expenses",
        data: data.map((expense) => expense.amount),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#ffffff", // Set legend labels to white (if displayed)
        },
      },
      title: {
        display: true,
        text: "Expenses by Date",
        color: "#ffffff", // Set chart title to white
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // Set x-axis labels to white
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Set x-axis gridlines to white (with some transparency)
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Set y-axis labels to white
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Set y-axis gridlines to white (with some transparency)
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
