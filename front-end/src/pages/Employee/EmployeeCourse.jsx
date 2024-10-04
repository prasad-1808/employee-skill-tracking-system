import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard"; // Import the reusable card component
import "bootstrap/dist/css/bootstrap.min.css";

const CourseList = () => {
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
    <div className="container employee-course">
      <div className="row" style={{ marginTop: "8rem" }}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.CourseID} course={course} />
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
