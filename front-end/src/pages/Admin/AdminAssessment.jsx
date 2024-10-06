import React, { useState, useEffect } from "react";
import AssessmentCard from "../../components/AssessmentCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const AdminAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [showAddAssessmentModal, setShowAddAssessmentModal] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    AssessmentCode: "", // Only AssessmentCode is required
  });
  const [loading, setLoading] = useState(true);

  // Fetch all assessments from the API
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/assessments/");
        const data = await response.json();

        if (response.ok) {
          setAssessments(data);
        } else {
          toast.error(data.message || "Failed to fetch assessments");
        }
      } catch (error) {
        toast.error("Error fetching assessments");
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [setAssessments, assessments]);

  // Handle adding a new assessment
  const handleAddAssessment = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/api/assessments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAssessment),
      });

      const data = await response.json();

      if (response.ok) {
        setAssessments((prevAssessments) => [
          ...prevAssessments,
          data.assessment,
        ]);
        toast.success(data.message || "Assessment added successfully!");
        setShowAddAssessmentModal(false);
        setNewAssessment({ AssessmentCode: "" }); // Reset the form
      } else {
        toast.error(data.message || "Failed to add assessment");
      }
    } catch (error) {
      toast.error("Error adding assessment");
      console.error("Error adding assessment:", error);
    }
  };

  // Handle deleting an assessment
  const handleAssessmentDelete = async (assessmentID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/assessments/${assessmentID}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (response.ok) {
        setAssessments((prevAssessments) =>
          prevAssessments.filter((assessment) => assessment.id !== assessmentID)
        );
        toast.success(data.message || "Assessment deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete assessment");
      }
    } catch (error) {
      toast.error("Error deleting assessment");
      console.error("Error deleting assessment:", error);
    }
  };

  // Handle editing an existing assessment
  const handleAssessmentEdit = async (editedAssessment) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/assessments/${editedAssessment.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            AssessmentCode: editedAssessment.AssessmentCode,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAssessments((prevAssessments) =>
          prevAssessments.map((assessment) =>
            assessment.id === editedAssessment.id
              ? editedAssessment
              : assessment
          )
        );
        toast.success(data.message || "Assessment updated successfully!");
      } else {
        toast.error(data.message || "Failed to update assessment");
      }
    } catch (error) {
      toast.error("Error updating assessment");
      console.error("Error updating assessment:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Add Assessment Button */}
      <div className="text-center mb-4" style={{ marginTop: "5rem" }}>
      <center>
            <button
              type="submit"
              className="custom-button d-inline-flex align-items-center"
              style={{
                backgroundColor: "white",
                color: "#ff69b4",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                transform: "skewX(-15deg)", // Slanted button style
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)", // Button shadow
              }}
              onClick={() => setShowAddAssessmentModal(true)}
            >
              <span
                style={{
                  transform: "skewX(15deg)", // Reset text skew
                  color: "#ff69b4",
                }}
              >
                Add Assessment
              </span>
            </button>
          </center>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          {assessments.length > 0 ? (
            assessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onAssessmentDelete={handleAssessmentDelete}
                onAssessmentEdit={handleAssessmentEdit}
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
              No assessments available. Please add a new assessment to get
              started.
            </div>
          )}
        </div>
      )}

      {/* Add Assessment Modal */}
      <Modal
        show={showAddAssessmentModal}
        onHide={() => setShowAddAssessmentModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Assessment Code"
              className="form-control"
              value={newAssessment.AssessmentCode}
              onChange={(e) =>
                setNewAssessment({ AssessmentCode: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddAssessmentModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddAssessment}>
            Add Assessment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminAssessment;
