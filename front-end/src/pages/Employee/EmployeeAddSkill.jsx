import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeAddSkill = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [skillType, setSkillType] = useState("");
  const [certificateLink, setCertificateLink] = useState("");
  const [scoreObtained, setScoreObtained] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/course/");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillData = {
      EmployeeID: localStorage.getItem("userId"),
      CourseID: parseInt(selectedCourse),
      Proficiency: proficiency,
      SkillType: skillType,
    };

    if (skillType === "CERTIFICATE") {
      skillData.CertificateLink = certificateLink;
    } else if (skillType === "ASSESSMENT") {
      skillData.ScoreObtained = parseInt(scoreObtained);
    }

    try {
      const response = await api.post("/skills", skillData);
      if (response.status === 201) {
        toast.success("Skill added successfully");
        setSelectedCourse("");
        setProficiency("");
        setSkillType("");
        setCertificateLink("");
        setScoreObtained("");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Error adding skill");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: "#f8f9fa",
        backgroundImage: "linear-gradient(135deg, #e0eafc, #cfdef3)", // Background gradient
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "2rem",
          borderRadius: "15px", // Rounded corners
          background: "linear-gradient(135deg, #8d0cc8, #9c27b0)", // Card gradient
          transition: "transform 0.3s ease",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#fff", marginBottom: "2rem" }}>
          Add Skill
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="course" style={{ color: "white" }}>
              Skill Name (Course):
            </label>
            <select
              id="course"
              className="form-control"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.CourseID} value={course.CourseID}>
                  {course.CourseName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="proficiency" style={{ color: "white" }}>
              Proficiency Level:
            </label>
            <select
              id="proficiency"
              className="form-control"
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value)}
              required
            >
              <option value="">Select proficiency level</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: "2rem" }}>
            <label htmlFor="skillType" style={{ color: "white" }}>
              Proof:
            </label>
            <select
              id="skillType"
              className="form-control"
              value={skillType}
              onChange={(e) => setSkillType(e.target.value)}
              required
            >
              <option value="">Select Proof type</option>
              <option value="CERTIFICATE">Certificate</option>
              <option value="ASSESSMENT">Assessment</option>
            </select>
          </div>

          {skillType === "CERTIFICATE" && (
            <div className="form-group" style={{ marginBottom: "2rem" }}>
              <label htmlFor="certificateLink" style={{ color: "white" }}>
                Certificate Link:
              </label>
              <input
                type="text"
                id="certificateLink"
                className="form-control"
                value={certificateLink}
                onChange={(e) => setCertificateLink(e.target.value)}
                required={skillType === "CERTIFICATE"}
              />
            </div>
          )}

          {skillType === "ASSESSMENT" && (
            <div className="form-group" style={{ marginBottom: "2rem" }}>
              <label htmlFor="score" style={{ color: "white" }}>
                Score (1 to 5):
              </label>
              <input
                type="number"
                id="score"
                className="form-control"
                min="1"
                max="5"
                value={scoreObtained}
                onChange={(e) => setScoreObtained(e.target.value)}
                required={skillType === "ASSESSMENT"}
              />
            </div>
          )}

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
                transform: "skewX(-15deg)", // Slanted button style
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)", // Button shadow
                marginTop: "2rem" // Add margin to separate button from inputs
              }}
            >
              <span
                style={{
                  transform: "skewX(15deg)", // Reset text skew
                  color: "#ff69b4",
                }}
              >
                Add Skill
              </span>
            </button>
          </center>
        </form>
      </div>

      <ToastContainer />

      {/* Custom styles for hover and button animation */}
      <style>
        {`
          .custom-button:hover {
            transform: scale(1.05) skewX(-15deg); /* Enlarge on hover */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
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

export default EmployeeAddSkill;
