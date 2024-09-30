import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [userid, setUserId] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [age, setAge] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await api.post("/users/register", {
          userid,
          name,
          mobileNo,
          age,
          monthlyRevenue,
          password,
        });
        navigate("/login");
      } catch (error) {
        console.error(error);
        toast.error("An error occurred during registration. Please try again.");
      }
    } else {
      console.log("Password and confirm password should be the same");
      toast("Password and confirm password should be the same");
    }
  };

  return (
    <div className="container h-100" style={{ marginTop: "7rem" }}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 col-lg-4 pt-5 m-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group p-1 m-2">
                  <label htmlFor="userid" className="labels">
                    UserID:
                  </label>
                  <input
                    type="text"
                    id="userid"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter your UserId"
                    value={userid}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group p-1 m-2">
                  <label htmlFor="name" className="labels">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                    required
                  />
                </div>
                <div className="form-group  p-1 m-2">
                  <label htmlFor="mobileNo" className="labels">
                    Mobile No:
                  </label>
                  <input
                    type="text"
                    id="mobileNo"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter your Mobile Number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group p-1 m-2">
                  <label htmlFor="age" className="labels">
                    Age:
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    placeholder="Enter your Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group p-1 m-2">
                  <label htmlFor="monthlyRevenue" className="labels">
                    Monthly Revenue:
                  </label>
                  <input
                    type="number"
                    id="monthlyRevenue"
                    className="form-control"
                    placeholder="Enter your Monthly Revenue"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group p-1 m-2">
                  <label htmlFor="password" className="labels">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Re-enter your Password"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
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

export default Register;
