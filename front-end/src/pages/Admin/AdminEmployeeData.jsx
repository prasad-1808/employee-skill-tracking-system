import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Make sure Bootstrap CSS is imported

const AdminEmployeeData = () => {
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store selected employee
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      console.log(response);
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
  const editEmployee = (employeeId) => {
    console.log("Edit employee with ID:", employeeId);
    // Redirect logic here if needed, e.g.:
    // history.push(`/edit-employee/${employeeId}`);
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
      console.log("Employee accepted:", response.data);
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
    setSelectedEmployee(employee); // Set the selected employee
    setShowModal(true); // Show the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null); // Clear selected employee
  };

  return (
    <div className="container mt-5">
      <div className="row">
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
                  <th>Year of Joining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeEmployees.map((employee) => (
                  <tr key={employee.EmployeeID}>
                    <td>{employee.EmployeeID}</td>
                    <td>{`${employee.Firstname} ${employee.Lastname}`}</td>
                    <td>{employee.Designation}</td>
                    <td>{employee.YearOfJoining}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-warning"
                          onClick={() => editEmployee(employee.EmployeeID)}
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
              No active employees available.
            </div>
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
                  <th>Year of Joining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingEmployees.map((employee) => (
                  <tr key={employee.EmployeeID}>
                    <td>{employee.EmployeeID}</td>
                    <td>{`${employee.Firstname} ${employee.Lastname}`}</td>
                    <td>{employee.Designation}</td>
                    <td>{employee.YearOfJoining}</td>
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
              No pending employees request available.
            </div>
          )}
        </div>
      </div>

      {/* Modal for Employee Details */}
      {selectedEmployee && (
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
                  Employee Details
                </h5>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Employee ID:</strong> {selectedEmployee.EmployeeID}
                </p>
                <p>
                  <strong>Name:</strong>{" "}
                  {`${selectedEmployee.Firstname} ${selectedEmployee.Lastname}`}
                </p>
                <p>
                  <strong>Designation:</strong> {selectedEmployee.Designation}
                </p>
                <p>
                  <strong>Year of Joining:</strong>{" "}
                  {selectedEmployee.YearOfJoining}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedEmployee.status ? "Active" : "Pending"}
                </p>
                {/* Add any additional employee details here */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployeeData;
