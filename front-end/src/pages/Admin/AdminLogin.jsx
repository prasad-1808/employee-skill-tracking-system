import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const [AdminID, setAdminID] = useState("");
  const [AdminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/dashboard");
    }
  }, [isAdminLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      try {
        const response = await api.post("/admin/login", { AdminID, AdminPassword });
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", AdminID);
          setIsAdminLoggedIn(true);
          navigate("/admin-dashboard");
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
              <h2 className="card-title text-center mb-4">Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group p-1 m-2">
                  <label htmlFor="userid" className="labels">
                    AdminID:
                  </label>
                  <input
                    type="text"
                    id="empid"
                    className="form-control"
                    placeholder="Enter your UserId"
                    autoComplete="off"
                    value={AdminID}
                    onChange={(e) => setAdminID(e.target.value)}
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
                    value={AdminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
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

export default AdminLogin;
