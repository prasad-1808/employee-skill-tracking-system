import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Ensure this points to your API service
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeAddSkill = () => {
  const [courses, setCourses] = useState([]); // State for the list of courses
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course
  const [proficiency, setProficiency] = useState(""); // Proficiency level
  const [score, setScore] = useState(""); // Score (1 to 5)
  const [proof, setProof] = useState(""); // Certification or assessment link

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/course/");
        const data = await response.json();
        setCourses(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching the courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillData = {
        EmployeeID: localStorage.getItem("userId"), // Assuming EmployeeID is stored in localStorage
        CourseID: parseInt(selectedCourse),
        Proficiency: proficiency, // Now sending the proficiency as a string
        Score: parseInt(score), // Adjust this if you need to send a specific value for score
        Proof: proof,
      };
      console.log(skillData);

      const response = await api.post("/skills", skillData); // Adjust API endpoint as necessary
      if (response.status === 201) {
        toast.success("Skill added successfully");
        // Reset form fields if needed
        setSelectedCourse("");
        setProficiency(""); // Reset to default
        setScore("");
        setProof("");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Error adding skill");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Skill</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
          <label htmlFor="score">Score (1 to 5):</label>
          <input
            type="number"
            id="score"
            className="form-control"
            min="1"
            max="5"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="proof">
            Proof (Certification link or Assessment):
          </label>
          <input
            type="text"
            id="proof"
            className="form-control"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Skill
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmployeeAddSkill;
