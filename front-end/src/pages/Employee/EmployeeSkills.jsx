import React, { useEffect, useState } from "react";
import api from "../../services/api"; // Assuming you have an api service

const EmployeeSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const EmployeeID = localStorage.getItem("userId"); // Get the employee ID from local storage

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get(`/skills/employee/${EmployeeID}`);
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching skills. Please try again.");
        setLoading(false);
      }
    };

    fetchSkills();
  }, [EmployeeID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>My Skills</h2>
      {skills.length > 0 ? (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Proficiency</th>
              <th>Proof</th> {/* Changed header from "Proof" to "Skill Type" */}
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id}>
                <td>{skill.course?.CourseName || "N/A"}</td>{" "}
                {/* Ensure course is defined */}
                <td>{skill.Proficiency}</td>
                {/* Display 'N/A' if no score */}
                <td>{skill.SkillType || "N/A"}</td> {/* Display Skill Type */}
                <td>{skill.Verified ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No skills found.</div>
      )}
    </div>
  );
};

export default EmployeeSkills;
