import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import EmployeeLogin from "./pages/Employee/EmployeeLogin";
import AdminLogin from "./pages/Admin/AdminLogin";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admin/AdminDashboard"; // Assuming this exists
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import EmployeeProfile from "./pages/Employee/EmployeeProfile";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if employee token exists
    const token = localStorage.getItem("employeeToken");
    setIsLoggedIn(!!token);

    // Check if admin token exists
    const adminToken = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!adminToken);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          className="Navbar"
        />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />

            {/* Employee Routes */}
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/dashboard" /> : <EmployeeLogin setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <EmployeeDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? <EmployeeProfile /> : <Navigate to="/login" />
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin-login"
              element={
                isAdminLoggedIn ? <Navigate to="/admin-dashboard" /> : <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />
              }
            />

            {/* Error/Fallback Route */}
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
