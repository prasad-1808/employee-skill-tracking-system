import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

const AdminEmployeeData = () => {
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState({});

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

  const editEmployee = (employee) => {
    setIsViewMode(false);
    setEditEmployeeData(employee);
    setShowModal(true);
  };

  const saveEditedEmployee = async () => {
    try {
      const { Firstname, Lastname, Designation, YearOfJoining } =
        editEmployeeData;
      const dataToSend = { Firstname, Lastname, Designation, YearOfJoining };

      await api.put(`/employees/${editEmployeeData.EmployeeID}`, dataToSend);
      fetchEmployees();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving edited employee:", error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await api.delete(`/employees/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response?.data || error.message
      );
    }
  };

  const acceptEmployee = async (employeeId) => {
    try {
      await api.patch(`/employees/${employeeId}/status`, { status: true });
      fetchEmployees();
    } catch (error) {
      console.error(
        "Error accepting employee:",
        error.response?.data || error.message
      );
    }
  };

  const rejectEmployee = async (employeeId) => {
    try {
      await api.delete(`/employees/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      console.error(
        "Error rejecting employee:",
        error.response?.data || error.message
      );
    }
  };

  const viewEmployee = (employee) => {
    setIsViewMode(true);
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setEditEmployeeData({});
  };

  return (
    <div
      className="container mt-5"
      style={{
        width: "150rem",
      }}
    >
      <div className="text-center mb-4" style={{ marginTop: "5rem" }}>
        <h2 style={{ color: "#e62dd7" }}>Employees Data</h2>
      </div>
      <div className="row w-100">
        {/* Active Employees */}
        <div className="col-md-6">
          <div className="p-3 rounded" style={{ borderRadius: "15px" }}>
            <h4 className="text-center mb-4" style={{ color: "#e62dd7" }}>
              Active Employees
            </h4>
            {activeEmployees.length > 0 ? (
              <table className="table table-sm table-hover">
                <thead className="thead-light">
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
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => editEmployee(employee)}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteEmployee(employee.EmployeeID)}
                          >
                            <CloseIcon /> {/* Use CloseIcon here */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="card p-4 text-center">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#ffffff" }}>
                    No Active Employees
                  </h5>
                  <p className="card-text">
                    No data available. Please add employees.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pending Employees */}
        <div className="col-md-6">
          <div className="p-3 rounded" style={{ borderRadius: "15px" }}>
            <h4 className="text-center mb-4" style={{ color: "#e62dd7" }}>
              Pending Employees
            </h4>
            {pendingEmployees.length > 0 ? (
              <table className="table table-sm table-hover">
                <thead className="thead-light">
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
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => acceptEmployee(employee.EmployeeID)}
                          >
                            ✅
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => viewEmployee(employee)}
                          >
                            👁️
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => rejectEmployee(employee.EmployeeID)}
                          >
                            <CloseIcon /> {/* Use CloseIcon here */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="card p-4 text-center">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#ffffff" }}>
                    No Pending Employees Request
                  </h5>
                </div>
              </div>
            )}
          </div>
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
                  <div>
                    <p>
                      <strong>Employee ID:</strong>{" "}
                      {selectedEmployee?.EmployeeID}
                    </p>
                    <p>
                      <strong>First Name:</strong> {selectedEmployee?.Firstname}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {selectedEmployee?.Lastname}
                    </p>
                    <p>
                      <strong>Designation:</strong>{" "}
                      {selectedEmployee?.Designation}
                    </p>
                    <p>
                      <strong>Year of Joining:</strong>{" "}
                      {selectedEmployee?.YearOfJoining}
                    </p>
                    <center>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </center>
                  </div>
                ) : (
                  <div>
                    <div className="form-group">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Firstname"
                        value={editEmployeeData.Firstname || ""}
                        onChange={(e) =>
                          setEditEmployeeData((prevData) => ({
                            ...prevData,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Lastname"
                        value={editEmployeeData.Lastname || ""}
                        onChange={(e) =>
                          setEditEmployeeData((prevData) => ({
                            ...prevData,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="designation">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Designation"
                        value={editEmployeeData.Designation || ""}
                        onChange={(e) =>
                          setEditEmployeeData((prevData) => ({
                            ...prevData,
                            [e.target.name]: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="yearOfJoining">Year of Joining</label>
                      <input
                        type="text"
                        className="form-control"
                        name="YearOfJoining"
                        value={editEmployeeData.YearOfJoining || ""}
                        onChange={(e) =>
                          setEditEmployeeData((prevData) => ({
                            ...prevData,
                            [e.target.name]: e.target.value,
                          }))
                        }
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
