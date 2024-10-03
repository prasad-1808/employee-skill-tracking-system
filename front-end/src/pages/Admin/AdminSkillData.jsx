import React, { useState, useEffect } from "react";
import api from "../../services/api";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../../assets/AdminSkillData.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is imported

Chart.register(ArcElement, Tooltip, Legend);

const AdminSkillData = () => {
  const [verifiedSkills, setVerifiedSkills] = useState([]);
  const [unVerifiedSkills, setUnVerifiedSkills] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedSkill, setSelectedSkill] = useState(null); // State for selected skill
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      const skills = response.data;
      const verified = skills.filter((skill) => skill.Verified);
      const unverified = skills.filter((skill) => !skill.Verified);
      // console.log(verified);
      // console.log(unVerifiedSkills);
      setVerifiedSkills(verified);
      setUnVerifiedSkills(unverified);
      processChartData(verified);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const processChartData = (verifiedSkills) => {
    const courseCount = verifiedSkills.reduce((acc, skill) => {
      const courseName = skill.course.CourseName;
      acc[courseName] = (acc[courseName] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      labels: Object.keys(courseCount),
      datasets: [
        {
          label: "Number of Employees",
          data: Object.values(courseCount),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          hoverOffset: 4,
        },
      ],
    });
  };

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]); // Add fetchSkills as a dependency

  const verifySkill = async (skillId) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await api.put(
        `/skills/${skillId}`,
        { Verified: true },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      fetchSkills();
    } catch (error) {
      console.error(
        "Error verifying skill:",
        error.response?.data || error.message
      );
    }
  };

  const deleteSkill = async (skillID) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/skills/${skillID}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      fetchSkills();
    } catch (error) {
      console.error(
        "Error deleting skill:",
        error.response?.data || error.message
      );
    }
  };

  // Function to handle "View" button click
  const viewSkillDetails = (skill) => {
    setSelectedSkill(skill);
    setShowModal(true); // Show the modal
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h3>Verified Skills by Course</h3>
          {chartData && chartData.labels && chartData.labels.length > 0 ? (
            <Doughnut
              data={chartData}
              options={{
                animation: {
                  duration: 50, // Animation duration set to 50ms
                  easing: "linear", // Use linear easing for consistent speed
                },
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "black",
                      boxWidth: 20,
                      padding: 15,
                    },
                  },
                },
              }}
            />
          ) : (
            <div
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "20px",
                fontSize: "18px",
                padding: "20px",
                border: "1px solid white",
                borderRadius: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              No data available to display.
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h3>Unverified Skills</h3>
          {unVerifiedSkills.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Course Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {unVerifiedSkills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{`${skill.employee.Firstname} ${skill.employee.Lastname}`}</td>
                    <td>{skill.course.CourseName}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-success"
                          onClick={() => verifySkill(skill.id)}
                        >
                          ✅ Verify
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => viewSkillDetails(skill)}
                        >
                          👁️ View
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteSkill(skill.id)}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "20px",
                fontSize: "18px",
                padding: "20px",
                border: "1px solid white",
                borderRadius: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              No unverified skills available to display.
            </div>
          )}
        </div>
      </div>

      {/* Modal to display skill details */}
      {selectedSkill && (
        <div
          className={`modal fade show ${showModal ? "d-block" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Skill Details for {selectedSkill.employee?.Firstname}{" "}
                  {selectedSkill.employee?.Lastname}
                </h5>
              </div>

              <div className="modal-body">
                <p>
                  <strong>Course:</strong>{" "}
                  {selectedSkill.course?.CourseName || "N/A"}
                </p>
                <p>
                  <strong>Course Code:</strong>{" "}
                  {selectedSkill.course?.CourseCode || "N/A"}
                </p>
                <p>
                  <strong>Proficiency:</strong>{" "}
                  {selectedSkill.Proficiency || "N/A"}
                </p>
                <p>
                  <strong>Proof:</strong> {selectedSkill.SkillType}
                </p>

                {selectedSkill.SkillType === "CERTIFICATE" ? (
                  <p>
                    <strong>Certificate link:</strong>
                    <a
                      href={selectedSkill.CertificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </p>
                ) : (
                  <p>
                    <strong>Assessment Score:</strong>
                    {selectedSkill.ScoreObtained || "Score not available"}
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkillData;
