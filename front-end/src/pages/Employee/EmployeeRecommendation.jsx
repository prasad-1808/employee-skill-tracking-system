import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeRecommendation = () => {
  const [courseName, setCourseName] = useState("");
  const [outcomeSkill, setOutcomeSkill] = useState("");
  const [roleOutcome, setRoleOutcome] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recommendationData = {
      courseName,
      outcomeSkill,
      roleOutcome,
      currentRole,
      skills,
      feedbackCategory,
      yearsOfExperience,
    };

    try {
      const response = await api.post("/recommendation", recommendationData);
      if (response.status === 201) {
        toast.success("Recommendation data submitted successfully");
        setCourseName("");
        setOutcomeSkill("");
        setRoleOutcome("");
        setCurrentRole("");
        setSkills([]);
        setFeedbackCategory("");
        setYearsOfExperience("");
      }
    } catch (error) {
      console.error("Error submitting recommendation:", error);
      toast.error("Error submitting recommendation");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: "#f8f9fa",
        backgroundImage: "linear-gradient(135deg, #e0eafc, #cfdef3)",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "2rem",
          borderRadius: "15px",
          background: "linear-gradient(135deg, #8d0cc8, #9c27b0)",
          transition: "transform 0.3s ease",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#fff", marginBottom: "2rem" }}
        >
          Add Recommendation
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="courseName" style={{ color: "white" }}>
              Course Name:
            </label>
            <input
              type="text"
              id="courseName"
              className="form-control"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="outcomeSkill" style={{ color: "white" }}>
              Outcome Skill:
            </label>
            <input
              type="text"
              id="outcomeSkill"
              className="form-control"
              value={outcomeSkill}
              onChange={(e) => setOutcomeSkill(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="roleOutcome" style={{ color: "white" }}>
              Role Outcome:
            </label>
            <input
              type="text"
              id="roleOutcome"
              className="form-control"
              value={roleOutcome}
              onChange={(e) => setRoleOutcome(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="currentRole" style={{ color: "white" }}>
              Current Role:
            </label>
            <input
              type="text"
              id="currentRole"
              className="form-control"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="skills" style={{ color: "white" }}>
              Skills:
            </label>
            <input
              type="text"
              id="skills"
              className="form-control"
              value={skills.join(", ")}
              onChange={(e) => setSkills(e.target.value.split(", "))}
              placeholder="Enter skills separated by commas"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="feedbackCategory" style={{ color: "white" }}>
              Feedback Category:
            </label>
            <input
              type="text"
              id="feedbackCategory"
              className="form-control"
              value={feedbackCategory}
              onChange={(e) => setFeedbackCategory(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="yearsOfExperience" style={{ color: "white" }}>
              Years of Experience:
            </label>
            <input
              type="number"
              id="yearsOfExperience"
              className="form-control"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              required
            />
          </div>

          <center>
            <button
              type="submit"
              className="custom-button d-inline-flex align-items-center"
              style={{
                backgroundColor: "white",
                color: "#ff69b4",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                transform: "skewX(-15deg)",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
                marginTop: "2rem",
              }}
            >
              <span
                style={{
                  transform: "skewX(15deg)",
                  color: "#ff69b4",
                }}
              >
                Submit Recommendation
              </span>
            </button>
          </center>
        </form>
      </div>

      <ToastContainer />

      <style>
        {`
          .custom-button:hover {
            transform: scale(1.05) skewX(-15deg);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          }

          .card {
            animation: fadeIn 1.5s ease;
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default EmployeeRecommendation;
