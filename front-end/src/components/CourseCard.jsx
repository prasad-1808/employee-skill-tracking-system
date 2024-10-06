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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:5000/api/course/${course.CourseID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        toast.success("Course deleted successfully");
        onCourseDelete(course.CourseID);
        setShowModal(false);
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      toast.error("Error occurred while deleting the course");
      console.error("Error during delete:", error);
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);
  
  const handleEditChange = (e) => {
    setEditedCourse({
      ...editedCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:5000/api/course/${course.CourseID}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCourse),
      });

      if (response.ok) {
        toast.success("Course updated successfully");
        onCourseEdit(editedCourse);
        setIsEditing(false);
        setShowModal(false);
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      toast.error("Error occurred while updating the course");
      console.error("Error during edit:", error);
    }
  };

  const role = localStorage.getItem("role");

  return (
    <>
      <div className="col-md-4">
        <div className="card mb-4 shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
          <div className="card-body text-center">
            <h5 className="card-title" style={{ color: "#ffffff", fontWeight: "bold" }}>
              {course.CourseName}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted" style={{ color:"white"}} >{course.CourseCode}</h6>
            <p className="card-text" style={{ fontSize: "1.1rem" }}>Level: {course.Level}</p>
            <div className="d-flex justify-content-center">
              {role === "admin" && (
                <center>
                {/* Add the new button for adding skills */}
                <button className="custom-button d-inline-flex align-items-center mt-3" 
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
                    marginLeft: "15px" // Add margin to separate buttons
                  }}
                  onClick={handleMoreInfo} // On click navigate to Add Skill page
                >
                  <span style={{ transform: "skewX(15deg)", color: "#ff69b4" }}>More Info</span>
                </button>
              </center>
              )}
              {role === "employee" && (
                <center>
                {/* Add the new button for adding skills */}
                <button className="custom-button d-inline-flex align-items-center mt-3" 
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
                    marginLeft: "15px" // Add margin to separate buttons
                  }}
                  onClick={handleExpand} // On click navigate to Add Skill page
                >
                  <span style={{ transform: "skewX(15deg)", color: "#ff69b4" }}>Expand</span>
                </button>
              </center>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expand Modal */}
      <Modal show={showExpand} onHide={handleExpand} centered>
        <Modal.Header closeButton>
          <Modal.Title>{course.CourseName} - Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Course Code:</strong> {course.CourseCode}</p>
          <p><strong>Level:</strong> {course.Level}</p>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showModal} onHide={handleMoreInfo} centered>
        <Modal.Header closeButton>
          <Modal.Title>{course.CourseName} - Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Course Code:</strong> {course.CourseCode}</p>
          <p><strong>Level:</strong> {course.Level}</p>

          {isEditing ? (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="CourseName"
                  value={editedCourse.CourseName}
                  onChange={handleEditChange}
                  placeholder="Edit Course Name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="CourseCode"
                  value={editedCourse.CourseCode}
                  onChange={handleEditChange}
                  placeholder="Edit Course Code"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="Level"
                  value={editedCourse.Level}
                  onChange={handleEditChange}
                  placeholder="Edit Level"
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-between">
                <Button variant="success" onClick={handleEditSubmit}>Save Changes</Button>
                <Button variant="secondary" onClick={handleEditToggle}>Cancel</Button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-between">
              <Button variant="warning" onClick={handleEditToggle}>Edit</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CourseCard;
