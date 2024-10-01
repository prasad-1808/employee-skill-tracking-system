import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Make sure you have an API service to handle requests
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeAddSkill = () => {
  const [courses, setCourses] = useState([]); // State for the list of courses
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course
  const [proficiency, setProficiency] = useState(0); // Proficiency score
  const [proof, setProof] = useState(""); // Certification or assessment link

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/course"); // Adjust API endpoint as necessary
        setCourses(response.data); // Assuming the response data is an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses");
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillData = {
        EmployeeID: localStorage.getItem("userId"), // Assuming EmployeeID is stored in localStorage
        CourseID: selectedCourse,
        Score: proficiency,
        Proof: proof,
      };

      const response = await api.post("/skills", skillData); // Adjust API endpoint as necessary
      if (response.status === 201) {
        toast.success("Skill added successfully");
        // Reset form fields if needed
        setSelectedCourse("");
        setProficiency(0);
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
          <label htmlFor="proficiency">Proficiency (1 to 5):</label>
          <input
            type="number"
            id="proficiency"
            className="form-control"
            min="1"
            max="5"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
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
