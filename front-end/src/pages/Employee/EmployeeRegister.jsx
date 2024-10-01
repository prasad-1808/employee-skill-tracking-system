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
        YearOfJoining: parseInt(YearOfJoining, 10), // Convert YearOfJoining to an integer
        Password,
      });
      console.log(response);
      if (response.status === 201) {
        toast.success(
          "Registration successful! Kindly wait for admin approval"
        );
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
    <div className="container h-100" style={{ marginTop: "7rem" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-4 pt-5 m-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Employee Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group p-1 m-2">
                  <label htmlFor="empid" className="labels">
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
                  <label htmlFor="firstname" className="labels">
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
                  <label htmlFor="lastname" className="labels">
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
                  <label htmlFor="designation" className="labels">
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
                  <label htmlFor="yearOfJoining" className="labels">
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
                  <label htmlFor="password" className="labels">
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
                  <label htmlFor="confirmPassword" className="labels">
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
                    className="btn btn-primary btn-block mt-3"
                  >
                    Register
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeRegister;
