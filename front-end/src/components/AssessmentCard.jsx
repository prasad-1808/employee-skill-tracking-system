import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify"; // Assuming toast notifications are imported

// Reusable Assessment Card Component
const AssessmentCard = ({
  assessment,
  onAssessmentDelete,
  onAssessmentEdit,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAssessment, setEditedAssessment] = useState({ ...assessment });

  const handleMoreInfo = () => setShowModal(!showModal);
  const handleExpand = () => setShowExpand(!showExpand);

  // Delete assessment handler
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Get the admin token
      const response = await fetch(
        `http://localhost:5000/api/assessments/${assessment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        toast.success("Assessment deleted successfully");
        onAssessmentDelete(assessment.AssessmentID); // Notify parent to refresh the list
        setShowModal(false); // Close the modal after deletion
      } else {
        toast.error("Failed to delete assessment");
      }
    } catch (error) {
      toast.error("Error occurred while deleting the assessment");
      console.error("Error during delete:", error);
    }
  };

  // Handle Edit Toggle
  const handleEditToggle = () => setIsEditing(!isEditing);

  // Update the assessment details
  const handleEditChange = (e) => {
    setEditedAssessment({
      ...editedAssessment,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // Get the admin token
      const response = await fetch(
        `http://localhost:5000/api/assessments/${assessment.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedAssessment),
        }
      );

      if (response.ok) {
        toast.success("Assessment updated successfully");
        onAssessmentEdit(editedAssessment); // Notify parent to refresh the list or update the UI
        setIsEditing(false);
        setShowModal(false); // Close modal after successful edit
      } else {
        toast.error("Failed to update assessment");
      }
    } catch (error) {
      toast.error("Error occurred while updating the assessment");
      console.error("Error during edit:", error);
    }
  };

  const role = localStorage.getItem("role"); // Get user role from local storage

  return (
    <>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5>Assessment Code: </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {assessment.AssessmentCode}
            </h6>
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
              <Button variant="primary" onClick={handleExpand}>
                Expand
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal show={showExpand} onHide={handleExpand}>
        <Modal.Header closeButton>
          <Modal.Title>{assessment.AssessmentName} - Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Assessment Code:</strong> {assessment.AssessmentCode}
          </p>
        </Modal.Body>
      </Modal>

      {/* Modal for Assessment Details */}
      <Modal show={showModal} onHide={handleMoreInfo}>
        <Modal.Header closeButton>
          <Modal.Title>{assessment.AssessmentName} - Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Assessment Code:</strong> {assessment.AssessmentCode}
          </p>

          {isEditing ? (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  name="AssessmentCode"
                  value={editedAssessment.AssessmentCode}
                  onChange={handleEditChange}
                  placeholder="Edit Assessment Code"
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

export default AssessmentCard;
