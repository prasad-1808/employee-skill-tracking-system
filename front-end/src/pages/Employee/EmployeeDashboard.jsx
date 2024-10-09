import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

// Register chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEmployeeData = async () => {
    try {
      const employeeID = localStorage.getItem("userId");
      const response = await api.get(`/employees/${employeeID}`);
      setEmployee(response.data);
    } catch (error) {
      setError("Error fetching employee data");
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await api.get(
        `/skills/employee/${employee?.EmployeeID}`
      );
      setSkills(response.data);
    } catch (error) {
      setError("Error fetching skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    if (employee) {
      fetchSkills();
    }
  }, [employee]);

  const proficiencyData = () => {
    const proficiencyLevels = ["Basic", "Intermediate", "Advanced"];
    const counts = proficiencyLevels.map(
      (level) => skills.filter((skill) => skill.Proficiency === level).length
    );

    return {
      labels: proficiencyLevels,
      datasets: [
        {
          label: "Number of Skills",
          data: counts,
          backgroundColor: ["#007bff", "#ffc107", "#28a745"],
          borderColor: "#343a40",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Skill Proficiency Distribution",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div
      className="container-fluid pt-5 pb-5 text-white"
      style={{ marginTop: "3rem" }}
    >
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1 className="mb-4" style={{ color: "#b11aa4" }}>
            Welcome, {employee?.Firstname} {employee?.Lastname}
          </h1>
        </div>
      </div>
      <div className="row">
        {/* Left Column: Profile and Skills */}
        <div className="col-md-5">
          <div
            className="card p-4 mb-4 bg-dark text-light shadow"
            style={{
              borderRadius: "15px",
              border: "2px solid violet",
              minHeight: "18rem",
            }}
          >
            <h2 className="text-center" style={{ color: "pink" }}>
              Profile
            </h2>
            <p>
              <strong>Employee ID:</strong> {employee?.EmployeeID}
            </p>
            <p>
              <strong>Designation:</strong> {employee?.Designation}
            </p>
            <p>
              <strong>Year of Joining:</strong> {employee?.YearOfJoining}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {employee?.status ? "Active" : "Inactive"}
            </p>
          </div>

          <div
            className="card p-4 bg-secondary text-light shadow"
            style={{
              borderRadius: "15px",
              border: "2px solid violet",
              minHeight: "20rem",
            }}
          >
            <h2 className="text-center" style={{ color: "pink" }}>
              Skills
            </h2>
            {skills.length === 0 ? (
              <p className="text-center">No skills added yet.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light"
                    style={{
                      borderRadius: "10px",
                      marginBottom: "5px",
                      borderColor: "#555",
                    }}
                  >
                    <span>
                      {skill.SkillType === "CERTIFICATE" ? "📜" : "📝"}{" "}
                      {skill.course.CourseName} - {skill.Proficiency}
                    </span>
                    <span>
                      {skill.Verified ? (
                        <span className="badge bg-success">Verified</span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="text-center mt-3">
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/addskill");
                }}
              >
                Add New Skill
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Proficiency Chart */}
        <div className="col-md-7">
          <div
            className="card p-5 bg-dark text-light shadow"
            style={{
              borderRadius: "15px",
              border: "2px solid violet",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="text-center mb-4" style={{ color: "pink" }}>
              Proficiency Chart
            </h2>
            <Bar data={proficiencyData()} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
