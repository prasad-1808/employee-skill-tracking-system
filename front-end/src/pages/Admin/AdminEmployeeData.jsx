import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is imported

const AdminEmployeeData = () => {
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store selected employee
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isViewMode, setIsViewMode] = useState(false); // State to check if it's view mode or edit mode
  const [editEmployeeData, setEditEmployeeData] = useState({}); // State for editing employee data

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      const employees = response.data;
      setActiveEmployees(employees.filter((employee) => employee.status));
      setPendingEmployees(employees.filter((employee) => !employee.status));
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to edit employee
  const editEmployee = (employee) => {
    setIsViewMode(false); // Set to edit mode
    setEditEmployeeData(employee); // Set the employee data to edit
    setShowModal(true); // Show the edit modal
  };

  // Function to save the edited employee
  const saveEditedEmployee = async () => {
    try {
      // Create an object with only the required fields
      const { Firstname, Lastname, Designation, YearOfJoining } =
        editEmployeeData;
      const dataToSend = {
        Firstname,
        Lastname,
        Designation,
        YearOfJoining,
      };

      await api.put(`/employees/${editEmployeeData.EmployeeID}`, dataToSend);
      fetchEmployees(); // Refresh employee lists after editing
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Error saving edited employee:", error);
    }
  };

  // Function to delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      await api.delete(`/employees/${employeeId}`);
      fetchEmployees(); // Refresh employee lists after deletion
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response?.data || error.message
      );
    }
  };

  // Function to accept employee
  const acceptEmployee = async (employeeId) => {
    try {
      const response = await api.patch(`/employees/${employeeId}/status`, {
        status: true,
      });
      fetchEmployees(); // Refresh employee lists
    } catch (error) {
      console.error(
        "Error accepting employee:",
        error.response?.data || error.message
      );
    }
  };

  // Function to reject employee
  const rejectEmployee = async (employeeId) => {
    try {
      const response = await api.delete(`/employees/${employeeId}`);
      console.log("Employee rejected:", response.data);
      fetchEmployees(); // Refresh employee lists after rejection
    } catch (error) {
      console.error(
        "Error rejecting employee:",
        error.response?.data || error.message
      );
    }
  };

  // Function to view employee details
  const viewEmployee = (employee) => {
    setIsViewMode(true); // Set to view mode
    setSelectedEmployee(employee); // Set the selected employee
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null); // Clear selected employee
    setEditEmployeeData({}); // Clear edit employee data
  };

  return (
    <div className="container mt-5">
      <div className="row" style={{ marginTop: "5rem" }}>
        {/* Left half: Active Employees */}
        <div className="col-md-6">
          <h3>Active Employees</h3>
          {activeEmployees.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeEmployees.map((employee) => (
                  <tr key={employee.EmployeeID}>
                    <td>{employee.EmployeeID}</td>
                    <td>{`${employee.Firstname} ${employee.Lastname}`}</td>
                    <td>{employee.Designation}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning"
                          onClick={() => editEmployee(employee)} // Call editEmployee with employee data
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteEmployee(employee.EmployeeID)}
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No active employees available.</div>
          )}
        </div>

        {/* Right half: Pending Employees */}
        <div className="col-md-6">
          <h3>Pending Employees</h3>
          {pendingEmployees.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingEmployees.map((employee) => (
                  <tr key={employee.EmployeeID}>
                    <td>{employee.EmployeeID}</td>
                    <td>{`${employee.Firstname} ${employee.Lastname}`}</td>
                    <td>{employee.Designation}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-success"
                          onClick={() => acceptEmployee(employee.EmployeeID)}
                        >
                          ✅ Accept
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => viewEmployee(employee)} // Open modal
                        >
                          👁️ View
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => rejectEmployee(employee.EmployeeID)}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No pending employees request available.</div>
          )}
        </div>
      </div>

      {/* Modal for Viewing or Editing Employee */}
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="employeeModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="employeeModalLabel">
                  {isViewMode ? "View Employee Details" : "Edit Employee"}
                </h5>
              </div>
              <div className="modal-body">
                {isViewMode ? (
                  // Display Employee Details in Read-Only Mode
                  <div>
                    <p><strong>Employee ID:</strong> {selectedEmployee?.EmployeeID}</p>
                    <p><strong>First Name:</strong> {selectedEmployee?.Firstname}</p>
                    <p><strong>Last Name:</strong> {selectedEmployee?.Lastname}</p>
                    <p><strong>Designation:</strong> {selectedEmployee?.Designation}</p>
                    <p><strong>Year of Joining:</strong> {selectedEmployee?.YearOfJoining}</p>
                    <center><button className="btn btn-secondary" onClick={handleCloseModal}>Close</button></center>
                  </div>
                ) : (
                  // Editable Employee Form
                  <div>
                    <div className="form-group">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Firstname"
                        value={editEmployeeData.Firstname || ""}
                        onChange={(e) => setEditEmployeeData((prevData) => ({
                          ...prevData,
                          [e.target.name]: e.target.value,
                        }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Lastname"
                        value={editEmployeeData.Lastname || ""}
                        onChange={(e) => setEditEmployeeData((prevData) => ({
                          ...prevData,
                          [e.target.name]: e.target.value,
                        }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="designation">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Designation"
                        value={editEmployeeData.Designation || ""}
                        onChange={(e) => setEditEmployeeData((prevData) => ({
                          ...prevData,
                          [e.target.name]: e.target.value,
                        }))}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="yearOfJoining">Year of Joining</label>
                      <input
                        type="text"
                        className="form-control"
                        name="YearOfJoining"
                        value={editEmployeeData.YearOfJoining || ""}
                        onChange={(e) => setEditEmployeeData((prevData) => ({
                          ...prevData,
                          [e.target.name]: e.target.value,
                        }))}
                      />
                    </div>
                  </div>
                )}
              </div>
              {!isViewMode && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveEditedEmployee}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployeeData;
