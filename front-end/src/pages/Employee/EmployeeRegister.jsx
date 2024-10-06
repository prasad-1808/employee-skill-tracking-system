import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeRegister = ({ isLoggedIn, setIsLoggedIn }) => {
  const [EmployeeID, setEmployeeID] = useState("");
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Designation, setDesignation] = useState("");
  const [YearOfJoining, setYearOfJoining] = useState(0);
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await api.post("/employees/register", {
        EmployeeID,
        Firstname,
        Lastname,
        Designation,
        YearOfJoining: parseInt(YearOfJoining, 10),
        Password,
      });
      if (response.status === 201) {
        toast.success("Registration successful! Kindly wait for admin approval");
        setTimeout(() => {
          navigate("/");
        }, 6000);
      }
    } catch (error) {
      toast.error("An error occurred during registration. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: "#f8f9fa",
        backgroundImage: "linear-gradient(135deg, #e0eafc, #cfdef3)", // Matching background gradient
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "2rem",
          borderRadius: "15px", // Rounded corners
          background: "linear-gradient(135deg, #8d0cc8, #9c27b0)", // Card gradient
          transition: "transform 0.3s ease", // Smooth animation
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#fff" }}>
          Employee Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group p-1 m-2">
            <label htmlFor="empid" style={{ color: "white" }}>
              Employee ID:
            </label>
            <input
              type="text"
              id="empid"
              className="form-control"
              placeholder="Enter your Employee ID"
              autoComplete="off"
              value={EmployeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="firstname" style={{ color: "white" }}>
              First Name:
            </label>
            <input
              type="text"
              id="firstname"
              className="form-control"
              placeholder="Enter your First Name"
              value={Firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="lastname" style={{ color: "white" }}>
              Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              className="form-control"
              placeholder="Enter your Last Name"
              value={Lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="designation" style={{ color: "white" }}>
              Designation:
            </label>
            <input
              type="text"
              id="designation"
              className="form-control"
              placeholder="Enter your Designation"
              value={Designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="yearOfJoining" style={{ color: "white" }}>
              Year of Joining:
            </label>
            <input
              type="number"
              id="yearOfJoining"
              className="form-control"
              placeholder="Enter Year of Joining"
              value={YearOfJoining}
              onChange={(e) => setYearOfJoining(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="password" style={{ color: "white" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="confirmPassword" style={{ color: "white" }}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
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
            >
              <span
                style={{
                  transform: "skewX(15deg)", // Reset text skew
                  color: "#ff69b4",
                }}
              >
                Register
              </span>
            </button>
          </center>
        </form>
      </div>

      <ToastContainer />

      {/* Custom styles for hover and button animation */}
      <style>
        {`
          .custom-button:hover {
            transform: scale(1.05) skewX(-15deg); /* Enlarge on hover */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
          }

          .card {
            animation: fadeIn 1.5s ease;
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default EmployeeRegister;
