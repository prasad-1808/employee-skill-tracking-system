import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard"; // Import the reusable card component
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const AdminCourse = () => {
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

  // Handler for course deletion
  const handleCourseDelete = (courseID) => {
    // Filter out the deleted course from the state
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.CourseID !== courseID)
    );
  };

  // Handler for course editing
  const handleCourseEdit = async (editedCourse) => {
    try {
      const updatedCourses = courses.map((course) =>
        course.CourseID === editedCourse.CourseID ? editedCourse : course
      );
      setCourses(updatedCourses);
      toast.success("Course updated successfully");
    } catch (error) {
      toast.error("Error updating course");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard
              key={course.CourseID}
              course={course}
              onCourseDelete={handleCourseDelete} // Pass the delete handler as a prop
              onCourseEdit={handleCourseEdit} // Pass the edit handler as a prop
            />
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
};

export default AdminCourse;
