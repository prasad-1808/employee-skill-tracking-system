import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [skillsByEmployee, setSkillsByEmployee] = useState([]);
  const [skillsPerCourse, setSkillsPerCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resSummary = await fetch("http://localhost:5000/api/dashboard/summary");
      const dataSummary = await resSummary.json();
      setSummary(dataSummary);
  
      const resSkillsByEmployee = await fetch("http://localhost:5000/api/dashboard/skills-by-employee");
      const dataSkillsByEmployee = await resSkillsByEmployee.json();
      setSkillsByEmployee(dataSkillsByEmployee);
  
      const resSkillsPerCourse = await fetch("http://localhost:5000/api/dashboard/courses-skills");
      const dataSkillsPerCourse = await resSkillsPerCourse.json();
      setSkillsPerCourse(dataSkillsPerCourse);
    };
  
    fetchData();
  }, []);
  

  const employeeSkillData = {
    labels: skillsByEmployee.map((emp) => emp.employeeName),
    datasets: [
      {
        label: "Number of Skills",
        data: skillsByEmployee.map((emp) => emp.skillCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const courseSkillData = {
    labels: skillsPerCourse.map((course) => course.courseCode),
    datasets: [
      {
        label: "Number of Employees",
        data: skillsPerCourse.map((course) => course.employeeCount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    plugins: {
      legend: {
        labels: {
          color: "#e62dd7", // Change legend text color
        },
      },
      tooltip: {
        bodyColor: "#e62dd7", // Change tooltip text color
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for tooltip
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#e62dd7", // Change x-axis tick color
        },
      },
      y: {
        beginAtZero: true, // Start y-axis at 0
        ticks: {
          color: "#e62dd7", // Change y-axis tick color
          callback: (value) => Math.round(value), // Round to whole numbers
        },
      },
    },
  };

  return (
    <div
      className="container-fluid pt-4 text-white dashboard-container"
      style={{ marginTop: "7rem", padding: "20px", borderRadius: "10px" }}
    >
      <h1 className="text-center mb-4" style={{ color: "#e62dd7" }}>Admin Dashboard</h1>

      {/* Summary Section */}
      <div className="row mb-4 justify-content-center">
        {/* Cards on the left side */}
        <div className="col-md-3">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body text-center">
              <h3>Total Employees</h3>
              <h4>{summary.totalEmployees}</h4>
            </div>
          </div>
          <div className="card bg-success text-white mb-3">
            <div className="card-body text-center">
              <h3>Total Courses</h3>
              <h4>{summary.totalCourses}</h4>
            </div>
          </div>
          <div className="card bg-info text-white mb-3">
            <div className="card-body text-center">
              <h3>Total Skills</h3>
              <h4>{summary.totalSkills}</h4>
            </div>
          </div>
        </div>

        {/* Charts on the right side */}
        <div className="col-md-9">
          {/* Bar Chart: Skills per Employee */}
          <div className="chart-container mb-4 text-center" style={{ width: '100%', margin: '0 auto', maxWidth: '950px', height: '400px' }}>
            <Bar data={employeeSkillData} options={chartOptions} />
          </div>

          {/* Bar Chart: Skills per Course */}
          <div className="chart-container mb-4 text-center" style={{ width: '100%', margin: '0 auto', maxWidth: '950px', height: '400px' }}>
            <Bar data={courseSkillData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
