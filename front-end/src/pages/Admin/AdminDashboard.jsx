import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [skillsByEmployee, setSkillsByEmployee] = useState([]);
  const [skillsPerCourse, setSkillsPerCourse] = useState([]);

  useEffect(() => {
    // Fetch dashboard summary
    const fetchSummary = async () => {
      const res = await fetch("http://localhost:5000/api/dashboard/summary");
      const data = await res.json();
      setSummary(data);
    };

    // Fetch skills by employee
    const fetchSkillsByEmployee = async () => {
      const res = await fetch(
        "http://localhost:5000/api/dashboard/skills-by-employee"
      );
      const data = await res.json();
      setSkillsByEmployee(data);
    };

    // Fetch skills per course
    const fetchSkillsPerCourse = async () => {
      const res = await fetch(
        "http://localhost:5000/api/dashboard/courses-skills"
      );
      const data = await res.json();
      setSkillsPerCourse(data);
    };

    fetchSummary();
    fetchSkillsByEmployee();
    fetchSkillsPerCourse();
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

  return (
    <div
      className="container pt-4 text-white dashboard-container"
      style={{ marginTop: "7rem" }}
    >
      <h1>Admin Dashboard</h1>

      {/* Summary Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h3>Total Employees</h3>
              <h4>{summary.totalEmployees}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h3>Total Courses</h3>
              <h4>{summary.totalCourses}</h4>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h3>Total Skills</h3>
              <h4>{summary.totalSkills}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart: Skills per Employee */}
      <div className="chart-container mb-4">
        <h3>Skills by Employee</h3>
        <Bar data={employeeSkillData} options={{ responsive: true }} />
      </div>

      {/* Bar Chart: Skills per Course */}
      <div className="chart-container mb-4">
        <h3>Skills per Course</h3>
        <Bar data={courseSkillData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default AdminDashboard;
