import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";
import { toast } from "react-toastify";

const EditExpenseModal = ({ show, handleClose, expense, setExpenseUpdate }) => {
  const [formData, setFormData] = useState({
    category: expense.category,
    amount: expense.amount,
    date: expense.date,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the amount is a number
    const formattedAmount = parseFloat(formData.amount);

    // Convert the date to the full ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    const formattedDate = new Date(formData.date).toISOString();

    // Create the updated form data with correct types
    const updatedFormData = {
      ...formData,
      amount: formattedAmount,
      date: formattedDate,
    };

    try {
      await api.put(`/expenses/${expense.id}`, updatedFormData);
      //   setExpenseUpdate((prev) => !prev);
      toast.success("Expense updated successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to update expense");
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="entertainment">Entertainment</option>
              <option value="investment">Investment</option>
              <option value="shopping">Shopping</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="loan">Loan</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditExpenseModal;
