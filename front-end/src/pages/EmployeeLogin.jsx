import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeLogin = ({ isLoggedIn, setIsLoggedIn }) => {
  const [EmployeeID, setEmployeeID] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      try {
        const response = await api.post("/employees/login", { EmployeeID, Password });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", EmployeeID);
          setIsLoggedIn(true);
          navigate("/dashboard");
        }
      } catch {
        toast.error("Invalid Username or Password");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container h-100" style={{ marginTop: "7rem" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-4 pt-5 m-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Employee Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group p-1 m-2">
                  <label htmlFor="userid" className="labels">
                    EmpID:
                  </label>
                  <input
                    type="text"
                    id="empid"
                    className="form-control"
                    placeholder="Enter your UserId"
                    autoComplete="off"
                    value={EmployeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
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
                <center>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                  >
                    Login
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

export default EmployeeLogin;
