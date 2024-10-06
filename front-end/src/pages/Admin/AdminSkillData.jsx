import React, { useState, useEffect } from "react";
import api from "../../services/api";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../../assets/AdminSkillData.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import { toast } from "react-toastify"; // Assuming you want to show notifications

Chart.register(ArcElement, Tooltip, Legend);

const AdminSkillData = () => {
  const [verifiedSkills, setVerifiedSkills] = useState([]);
  const [unVerifiedSkills, setUnVerifiedSkills] = useState([]);
  const [chartData, setChartData] = useState({});
  const [selectedSkill, setSelectedSkill] = useState(null); // State for selected skill
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [showAddSkillModal, setShowAddSkillModal] = useState(false); // State for add skill modal
  const [newSkill, setNewSkill] = useState({ // New skill state for adding
    CourseName: "",
    EmployeeName: "",
    Proficiency: "",
  });

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      const skills = response.data;
      const verified = skills.filter((skill) => skill.Verified);
      const unverified = skills.filter((skill) => !skill.Verified);
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
  }, []); // Removed fetchSkills as a dependency

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
      toast.success("Skill verified successfully");
    } catch (error) {
      toast.error("Error verifying skill");
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
      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error("Error deleting skill");
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

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Assuming the token is stored in localStorage
      const response = await api.post("/skills", newSkill, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });

      if (response.ok) {
        const addedSkill = await response.json();
        setUnVerifiedSkills((prevSkills) => [...prevSkills, addedSkill]);
        toast.success("Skill added successfully!");
        setShowAddSkillModal(false); // Close the modal
        setNewSkill({ CourseName: "", EmployeeName: "", Proficiency: "" }); // Reset form
      } else {
        toast.error("Failed to add skill");
      }
    } catch (error) {
      toast.error("Error occurred while adding skill");
      console.error("Error adding skill:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4" style={{ marginTop: "5rem" }}>
  
      </div>

      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="col-md-6">
          <h3 style={{ color:"#e62dd7"}}>Verified Skills by Course</h3>
          {chartData && chartData.labels && chartData.labels.length > 0 ? (
            <Doughnut
              data={chartData}
              options={{
                animation: {
                  duration: 50,
                  easing: "linear",
                },
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#e62dd7",
                      boxWidth: 20,
                      padding: 15,
                      font: {
                        size: 20
                      }
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
          <h3 style={{ color:"#e62dd7"}} >Unverified Skills</h3>
          {unVerifiedSkills.length > 0 ? (
            <table className="table table-striped table-dark">
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

      {/* Add Skill Modal */}
      <Modal show={showAddSkillModal} onHide={() => setShowAddSkillModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Course Name"
              className="form-control"
              value={newSkill.CourseName}
              onChange={(e) => setNewSkill({ ...newSkill, CourseName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Employee Name"
              className="form-control"
              value={newSkill.EmployeeName}
              onChange={(e) => setNewSkill({ ...newSkill, EmployeeName: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Proficiency"
              className="form-control"
              value={newSkill.Proficiency}
              onChange={(e) => setNewSkill({ ...newSkill, Proficiency: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddSkillModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to display skill details */}
      {selectedSkill && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Skill Details for {selectedSkill.employee?.Firstname} {selectedSkill.employee?.Lastname}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              <strong>Course:</strong> {selectedSkill.course?.CourseName || "N/A"}
            </p>
            <p>
              <strong>Course Code:</strong> {selectedSkill.course?.CourseCode || "N/A"}
            </p>
            <p>
              <strong>Proficiency:</strong> {selectedSkill.Proficiency || "N/A"}
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
                  download // Add the download attribute here
                >
                  View Certificate
                </a>
              </p>
            ) : (
              <p>
                <strong>Assessment Score:</strong> {selectedSkill.ScoreObtained || "Score not available"}
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AdminSkillData;
