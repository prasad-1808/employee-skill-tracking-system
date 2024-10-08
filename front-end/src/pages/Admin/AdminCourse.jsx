import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    CourseID: null, // Initialize as null; it will be set in handleAddCourse
    CourseName: "",
    CourseCode: "",
    Level: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

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

  const handleCourseDelete = (courseID) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.CourseID !== courseID)
    );
  };

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

  const handleAddCourse = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      // Fetch existing courses to find the last CourseID
      const response = await fetch("http://localhost:5000/api/course/");
      const existingCourses = await response.json();

      // Check if existingCourses is an array and has elements
      const lastCourseID =
        Array.isArray(existingCourses) && existingCourses.length > 0
          ? Math.max(...existingCourses.map((course) => course.CourseID))
          : 0;
      const newCourseID = lastCourseID + 1;

      // Prepare the new course data with the generated CourseID
      const courseData = {
        CourseID: newCourseID, // Only if you decide not to use auto-increment
        CourseName: newCourse.CourseName,
        CourseCode: newCourse.CourseCode,
        Level: newCourse.Level,
      };

      // Debug log to check the course data being sent
      console.log("New Course Data:", courseData);

      // Validate course data before sending
      if (
        !courseData.CourseName ||
        !courseData.CourseCode ||
        !courseData.Level
      ) {
        toast.error("All fields are required.");
        return;
      }

      // Send the new course data to the server
      const addCourseResponse = await fetch(
        "http://localhost:5000/api/course/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(courseData),
        }
      );

      if (addCourseResponse.ok) {
        const addedCourse = await addCourseResponse.json();
        setCourses((prevCourses) => [...prevCourses, addedCourse]);
        toast.success("Course added successfully!");
        setShowAddCourseModal(false);
        setNewCourse({
          CourseID: null,
          CourseName: "",
          CourseCode: "",
          Level: "",
        }); // Reset form
      } else {
        const errorData = await addCourseResponse.json(); // Get the error response from the server
        toast.error(
          `Failed to add course: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("Error occurred while adding course");
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4" style={{ marginTop: "5rem" }}>
        <center>
          <button
            className="custom-button d-inline-flex align-items-center mt-3"
            style={{
              backgroundColor: "white",
              color: "#ff69b4",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-block",
              transform: "skewX(-15deg)",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
              marginLeft: "15px",
            }}
            onClick={() => setShowAddCourseModal(true)}
          >
            <span style={{ transform: "skewX(15deg)", color: "#ff69b4" }}>
              Add Course
            </span>
          </button>
        </center>
      </div>

      <div className="row mt-4">
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <CourseCard
              key={course.CourseID}
              course={course}
              onCourseDelete={handleCourseDelete}
              onCourseEdit={handleCourseEdit}
            />
          ))
        ) : (
          <div
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "20px",
              fontSize: "18px",
              padding: "20px",
              border: "1px solid white",
              borderRadius: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            No courses available. Please add a new course to get started.
          </div>
        )}
      </div>

      {/* Pagination */}
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

      {/* Add Course Modal */}
      <Modal
        show={showAddCourseModal}
        onHide={() => setShowAddCourseModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Course Name"
              className="form-control"
              value={newCourse.CourseName}
              onChange={(e) =>
                setNewCourse({ ...newCourse, CourseName: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Course Code"
              className="form-control"
              value={newCourse.CourseCode}
              onChange={(e) =>
                setNewCourse({ ...newCourse, CourseCode: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <select
              id="course-level"
              className="form-select"
              value={newCourse.Level}
              onChange={(e) =>
                setNewCourse({ ...newCourse, Level: e.target.value })
              }
            >
              <option value="" disabled>
                Select Level
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddCourseModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCourse}>
            Add Course
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminCourse;
