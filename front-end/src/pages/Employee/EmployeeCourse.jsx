import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard"; // Import the reusable card component
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeCourse = () => {
  const [courses, setCourses] = useState([]);

  // Fetch the courses from the API
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

  return (
    <div className="container employee-course mt-5">
      <h2 className="text-center mb-4" style={{ color: "#fff" }}>Available Courses</h2>
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.CourseID} course={course} />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-white">Loading courses...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCourse;
