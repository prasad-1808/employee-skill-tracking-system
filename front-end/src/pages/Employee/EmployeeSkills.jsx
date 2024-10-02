import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Assuming you have an api service

const EmployeeSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const EmployeeID = localStorage.getItem('userId'); // Get the employee ID from local storage

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get(`/skills/employee/${EmployeeID}`);
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching skills.");
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
    <div className="container">
      <h2>My Skills</h2>
      {skills.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Proficiency</th>
              <th>Score</th>
              <th>Proof</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill.id}>
                <td>{skill.course.CourseName}</td> {/* Assuming course name is in skill.course */}
                <td>{skill.Proficiency}</td>
                <td>{skill.Score}</td>
                <td>
                  {skill.Proof ? (
                    <a href={skill.Proof} target="_blank" rel="noopener noreferrer">
                      View Proof
                    </a>
                  ) : (
                    "No Proof"
                  )}
                </td>
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
