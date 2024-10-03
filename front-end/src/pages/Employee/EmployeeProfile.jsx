import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeID: "", // Renamed to match the Prisma model
    firstname: "",
    lastname: "",
    designation: "",
    yearOfJoining: "",
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = localStorage.getItem("userId"); // Ensure this is set when employee logs in

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`employees/${employeeId}`);
        setEmployee(response.data);
        console.log(response);
        console.log(employee);
        setFormData({
          employeeID: response.data.EmployeeID,
          firstname: response.data.Firstname,
          lastname: response.data.Lastname,
          designation: response.data.Designation,
          yearOfJoining: response.data.YearOfJoining,
          status: response.data.status,
        });
      } catch (err) {
        setError("Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      // Send only the updated fields to the backend
      const updatedData = {
        Firstname: formData.firstname,
        Lastname: formData.lastname,
        Designation: formData.designation,
        YearOfJoining: formData.yearOfJoining,
      };

      await api.put(`/employees/${employeeId}`, updatedData); // Make sure API route matches
      toast.success("Profile updated successfully");

      // Update the employee state with the new data to reflect changes on UI
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        ...updatedData, // Merge updated fields with existing employee data
      }));

      setEditing(false); // Exit editing mode
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container-fluid profile p-4" style={{ marginTop: "7rem" }}>
      <h2 className="text-center mb-4 text-white">User Profile</h2>
      <div className="card">
        <div className="card-body">
          {editing ? (
            <div>
              <div className="form-group">
                <label htmlFor="firstname">First Name:</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  autoComplete="off"
                  className="form-control"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  autoComplete="off"
                  className="form-control"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  className="form-control"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="yearOfJoining">Year of Joining:</label>
                <input
                  type="number"
                  id="yearOfJoining"
                  name="yearOfJoining"
                  className="form-control"
                  value={formData.yearOfJoining}
                  onChange={handleChange}
                />
              </div>
              <center>
                <button className="btn btn-primary mt-3" onClick={handleSave}>
                  Save
                </button>
              </center>
            </div>
          ) : (
            <div>
              <center>
                <FaRegCircleUser className="profile-pic-icon" />
              </center>
              <div className="card-body rounded">
                <table className="table table-bordered rounded">
                  <tbody>
                    <tr>
                      <td className="fw-bold">EmployeeID</td>
                      <td>{employee.EmployeeID}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">First Name</td>
                      <td>{employee.Firstname}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Last Name</td>
                      <td>{employee.Lastname}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Designation</td>
                      <td>{employee.Designation}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Year of Joining</td>
                      <td>{employee.YearOfJoining}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Status</td>
                      <td>{employee.status ? "Active" : "Inactive"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <center>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
