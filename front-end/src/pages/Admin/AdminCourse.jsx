import React, { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard"; // Import the reusable card component
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    CourseName: "",
    CourseCode: "",
    Level: "",
  });

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

  const handleAddCourse = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Assuming the token is stored in localStorage
      const response = await fetch("http://localhost:5000/api/course/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
        body: JSON.stringify(newCourse),
      });

      if (response.ok) {
        const addedCourse = await response.json();
        setCourses((prevCourses) => [...prevCourses, addedCourse]);
        toast.success("Course added successfully!");
        setShowAddCourseModal(false); // Close the modal
        setNewCourse({ CourseName: "", CourseCode: "", Level: "" }); // Reset form
      } else {
        toast.error("Failed to add course");
      }
    } catch (error) {
      toast.error("Error occurred while adding course");
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Add Course Button */}
      <div className="text-center mb-4">
        <Button
          variant="primary"
          onClick={() => setShowAddCourseModal(true)}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          Add Course
        </Button>
      </div>

      <div className="row mt-4">
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
            <input
              type="text"
              placeholder="Level"
              className="form-control"
              value={newCourse.Level}
              onChange={(e) =>
                setNewCourse({ ...newCourse, Level: e.target.value })
              }
            />
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
