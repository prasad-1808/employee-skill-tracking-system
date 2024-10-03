import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify"; // Assuming toast notifications are imported

// Reusable Card Component
const CourseCard = ({ course, onCourseDelete, onCourseEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState({ ...course });

  const handleMoreInfo = () => setShowModal(!showModal);
  const handleExpand = () => setShowExpand(!showExpand);

  // Delete course handler
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Get the admin token
      const response = await fetch(
        `http://localhost:5000/api/course/${course.CourseID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        toast.success("Course deleted successfully");
        onCourseDelete(course.CourseID); // Notify parent to refresh the list
        setShowModal(false); // Close the modal after deletion
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      toast.error("Error occurred while deleting the course");
      console.error("Error during delete:", error);
    }
  };

  // Handle Edit Toggle
  const handleEditToggle = () => setIsEditing(!isEditing);

  // Update the course details
  const handleEditChange = (e) => {
    setEditedCourse({
      ...editedCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Get the admin token
      const response = await fetch(
        `http://localhost:5000/api/course/${course.CourseID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedCourse),
        }
      );

      if (response.ok) {
        toast.success("Course updated successfully");
        onCourseEdit(editedCourse); // Notify parent to refresh the list or update the UI
        setIsEditing(false);
        setShowModal(false); // Close modal after successful edit
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      toast.error("Error occurred while updating the course");
      console.error("Error during edit:", error);
    }
  };

  const role = localStorage.getItem("role"); // Get user role from local storage

  return (
    <>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{course.CourseName}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {course.CourseCode}
            </h6>
            <p className="card-text">Level: {course.Level}</p>
            {role === "admin" && (
              <Button variant="primary" onClick={handleMoreInfo}>
                More Info
              </Button>
            )}
            {role === "employee" && (
              <Button variant="primary" onClick={handleExpand}>
                Expand
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal show={showExpand} onHide={handleExpand}>
        <Modal.Header closeButton>
          <Modal.Title>{course.CourseName} - Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Course Code:</strong> {course.CourseCode}
          </p>
          <p>
            <strong>Level:</strong> {course.Level}
          </p>
        </Modal.Body>
      </Modal>

      {/* Modal for Course Details */}
      <Modal show={showModal} onHide={handleMoreInfo}>
        <Modal.Header closeButton>
          <Modal.Title>{course.CourseName} - Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Course Code:</strong> {course.CourseCode}
          </p>
          <p>
            <strong>Level:</strong> {course.Level}
          </p>

          {isEditing ? (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="CourseName"
                  value={editedCourse.CourseName}
                  onChange={handleEditChange}
                  placeholder="Edit Course Name"
                  className="form-control" // Bootstrap class for styling
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="CourseCode"
                  value={editedCourse.CourseCode}
                  onChange={handleEditChange}
                  placeholder="Edit Course Code"
                  className="form-control" // Bootstrap class for styling
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="Level"
                  value={editedCourse.Level}
                  onChange={handleEditChange}
                  placeholder="Edit Level"
                  className="form-control" // Bootstrap class for styling
                />
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="success" onClick={handleEditSubmit}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={handleEditToggle}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-between">
              <Button variant="warning" onClick={handleEditToggle}>
                Edit
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseCard;
