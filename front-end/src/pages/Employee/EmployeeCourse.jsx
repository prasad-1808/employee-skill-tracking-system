import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard"; // Import the reusable card component
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination } from "react-bootstrap"; // Import Pagination from Bootstrap

const EmployeeCourse = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9; // Number of courses to display per page

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

  // Calculate pagination data
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="container employee-course mt-5">
      <h2 className="text-center mb-4" style={{ color: "#fff" }}>
        Available Courses
      </h2>
      <div className="row">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseCard key={course.CourseID} course={course} />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-white">Loading courses...</p>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={handleNext}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default EmployeeCourse;
