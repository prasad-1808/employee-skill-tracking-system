import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeAddSkill = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [skillType, setSkillType] = useState(""); // Add skill type field
  const [certificateLink, setCertificateLink] = useState(""); // Certificate link
  const [scoreObtained, setScoreObtained] = useState(""); // Score obtained

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
      SkillType: skillType, // Send SkillType
    };

    // Conditionally add CertificateLink or ScoreObtained based on SkillType
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
    <div className="container mt-5">
      <center>
        <h2 style={{ marginTop: "5rem", color: "white" }}>Add Skill</h2>
      </center>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginTop: "3rem" }}>
          <label htmlFor="course">Skill Name (Course):</label>
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

        <div className="form-group">
          <label htmlFor="proficiency">Proficiency Level:</label>
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

        <div className="form-group">
          <label htmlFor="skillType">Proof:</label>
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
          <div className="form-group">
            <label htmlFor="certificateLink">Certificate Link:</label>
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
          <div className="form-group">
            <label htmlFor="score">Score (1 to 5):</label>
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

        <button type="submit" className="btn btn-primary mt-3">
          Add Skill
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeAddSkill;
