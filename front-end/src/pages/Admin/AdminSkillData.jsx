import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Ensure you have the correct API service
import axios from "axios"; // Import axios

const AdminSkillData = () => {
  const [verifiedSkills, setVerifiedSkills] = useState([]);
  const [unVerifiedSkills, setUnVerifiedSkills] = useState([]);

  // Function to fetch all skills and categorize them
  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills"); // Adjust the endpoint as needed
      const skills = response.data;

      // Separate verified and unverified skills
      const verified = skills.filter((skill) => skill.Verified);
      const unverified = skills.filter((skill) => !skill.Verified);

      setVerifiedSkills(verified);
      setUnVerifiedSkills(unverified);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  // Function to verify a skill
  const verifySkill = async (skillId) => {
    try {
      await api.put(`/skills/${skillId}`, { Verified: true });
      // Refresh the skill data after verification
      fetchSkills();
    } catch (error) {
      console.error("Error verifying skill:", error);
    }
  };

  // Function to delete a skill
  // Example of a delete request
  const deleteSkill = async (skillID) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/skills/${skillID}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`, // Include the token if required
        },
      });
      // Handle success (e.g., refresh the skill list)
    } catch (error) {
      console.error(
        "Error deleting skill:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Container: Verified Skills */}
        <div className="col-md-6">
          <h3>Verified Skills</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Skill ID</th>
                <th>Employee Name</th>
                <th>Course Name</th>
                <th>Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {verifiedSkills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>{`${skill.employee.Firstname} ${skill.employee.Lastname}`}</td>
                  <td>{skill.course.CourseName}</td>
                  <td>{skill.Proficiency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Container: Unverified Skills */}
        <div className="col-md-6">
          <h3>Unverified Skills</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Skill ID</th>
                <th>Employee Name</th>
                <th>Course Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unVerifiedSkills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>{`${skill.employee.Firstname} ${skill.employee.Lastname}`}</td>
                  <td>{skill.course.CourseName}</td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => verifySkill(skill.id)}
                    >
                      ✅ Verify
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteSkill(skill.id)}
                    >
                      ❌ Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSkillData;
