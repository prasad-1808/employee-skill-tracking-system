import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../assets/EmployeeProfile.css";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    employeeID: "",
    firstname: "",
    lastname: "",
    designation: "",
    yearOfJoining: "",
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`employees/${employeeId}`);
        setEmployee(response.data);
        console.log(response);
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
      const updatedData = {
        Firstname: formData.firstname,
        Lastname: formData.lastname,
        Designation: formData.designation,
        YearOfJoining: formData.yearOfJoining,
      };

      await api.put(`/employees/${employeeId}`, updatedData);
      toast.success("Profile updated successfully");

      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        ...updatedData,
      }));

      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  // Function to navigate to Add Skill page
  const handleAddSkillClick = () => {
    navigate("/add-skill"); // Adjust the route as necessary
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div
      className="container-fluid profile p-4"
      style={{ marginTop: "7rem", backgroundColor: "" }}
    >
      <h2 className="text-center mb-4" style={{ color: "#b11aa4" }}>
        Employee Profile
      </h2>
      <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
        <div className="card-body">
          {editing ? (
            <div>
              <div className="form-group">
                <label htmlFor="firstname" style={{ color: "white" }}>
                  First Name:
                </label>
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
                <label htmlFor="lastname" style={{ color: "white" }}>
                  Last Name:
                </label>
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
                <label htmlFor="designation" style={{ color: "white" }}>
                  Designation:
                </label>
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
                <label htmlFor="yearOfJoining" style={{ color: "white" }}>
                  Year of Joining:
                </label>
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
                {/* Add the new button for adding skills */}
                <button
                  className="custom-button d-inline-flex align-items-center mt-3"
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
                    marginLeft: "15px", // Add margin to separate buttons
                  }}
                  onClick={handleSave} // On click navigate to Add Skill page
                >
                  <span style={{ transform: "skewX(15deg)", color: "#ff69b4" }}>
                    Save
                  </span>
                </button>
              </center>
            </div>
          ) : (
            <div>
              <center>
                <FaRegCircleUser
                  className="profile-pic-icon"
                  style={{ fontSize: "3rem", color: "#fffff" }}
                />
              </center>
              <div className="card-body rounded">
                <table className="table table-bordered rounded employee-profile-table">
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
                {/* Add the new button for adding skills */}
                <button
                  className="custom-button d-inline-flex align-items-center mt-3"
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
                    marginLeft: "15px", // Add margin to separate buttons
                  }}
                  onClick={handleEditClick} // On click navigate to Add Skill page
                >
                  <span style={{ transform: "skewX(15deg)", color: "#ff69b4" }}>
                    Edit Profile
                  </span>
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
