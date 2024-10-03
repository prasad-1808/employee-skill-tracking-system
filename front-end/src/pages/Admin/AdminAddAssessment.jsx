import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminAddAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAssessment, setNewAssessment] = useState({
    AssessmentCode: "",
    Question: "",
    Options: ["", "", "", ""], // Default to 4 options
    CorrectAnswer: "",
  });

  // Fetch assessments from the API
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/assessments");
        const data = await response.json();
        setAssessments(data);
      } catch (error) {
        toast.error("Error fetching assessments");
        console.error(error);
      }
    };
    fetchAssessments();
  }, []);

  // Handle opening and closing of the add modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssessment({
      ...newAssessment,
      [name]: value,
    });
  };

  // Handle options change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newAssessment.Options];
    updatedOptions[index] = value;
    setNewAssessment({
      ...newAssessment,
      Options: updatedOptions,
    });
  };

  // Submit new assessment
  const handleAddAssessment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAssessment),
      });

      if (response.ok) {
        const addedAssessment = await response.json();
        setAssessments([...assessments, addedAssessment]);
        toast.success("Assessment added successfully!");
        handleCloseModal();
        setNewAssessment({
          AssessmentCode: "",
          Question: "",
          Options: ["", "", "", ""],
          CorrectAnswer: "",
        });
      } else {
        toast.error("Failed to add assessment");
      }
    } catch (error) {
      toast.error("Error occurred while adding assessment");
      console.error("Error adding assessment:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Add Assessment Button */}
      <div className="text-center mb-4">
        <Button variant="primary" onClick={handleShowModal}>
          Add Assessment
        </Button>
      </div>

      {/* Display Existing Assessments */}
      <div className="row">
        {assessments.length > 0 ? (
          assessments.map((assessment, index) => (
            <Card key={index} className="col-md-4 mb-3">
              <Card.Body>
                <Card.Title>{assessment.AssessmentCode}</Card.Title>
                <Card.Text>
                  <strong>Question:</strong> {assessment.Question}
                </Card.Text>
                <Card.Text>
                  <strong>Options:</strong>
                  <ul>
                    {assessment.Options.map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                </Card.Text>
                <Card.Text>
                  <strong>Correct Answer:</strong> {assessment.CorrectAnswer}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No assessments available</div>
        )}
      </div>

      {/* Modal for Adding Assessment */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Assessment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Assessment Code</Form.Label>
              <Form.Control
                type="text"
                name="AssessmentCode"
                value={newAssessment.AssessmentCode}
                onChange={handleInputChange}
                placeholder="Enter Assessment Code"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                name="Question"
                value={newAssessment.Question}
                onChange={handleInputChange}
                placeholder="Enter Question"
              />
            </Form.Group>

            {newAssessment.Options.map((option, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>Option {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Enter Option ${index + 1}`}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                type="text"
                name="CorrectAnswer"
                value={newAssessment.CorrectAnswer}
                onChange={handleInputChange}
                placeholder="Enter Correct Answer"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
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

export default AdminAddAssessment;
