import React, { useEffect, useState } from "react";
import api from "../../services/api"; // Assuming you have an API service
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/EmployeeSkills.css";

const EmployeeSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const EmployeeID = localStorage.getItem("userId"); // Get the employee ID from local storage

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true); // Ensure loading is true before the fetch

      try {
        const response = await api.get(`/skills/employee/${EmployeeID}`);
        if (response.status === 200) {
          setSkills(response.data);
        }
      } catch (error) {
        // Handle network or unexpected errors
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchSkills();
  }, [EmployeeID]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-3">Loading your skills, please wait...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div style={{ marginTop: "5rem" }}>
        <h2 className="text-center" style={{ color: "#fff", marginTop: "5rem", fontWeight: "bold" }}>
          My Skills
        </h2>

        {skills.length > 0 ? (
          <div className="table-responsive mt-3">
            <table className="table table-striped mt-3 employee-skills-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Proficiency</th>
                  <th>Skill Type</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{skill.course?.CourseName || "N/A"}</td>
                    <td>{skill.Proficiency}</td>
                    <td>{skill.SkillType || "N/A"}</td>
                    <td>{skill.Verified ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-skills-message">
            No skills available. Please add a new skill to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeSkills;
