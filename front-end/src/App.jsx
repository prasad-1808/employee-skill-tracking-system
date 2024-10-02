import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import EmployeeLogin from "./pages/Employee/EmployeeLogin";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard"; // Assuming this exists
import AdminCourse from "./pages/Admin/AdminCourse";
import AdminEmployeeData from "./pages/Admin/AdminEmployeeData";
import AdminSkillData from "./pages/Admin/AdminSkillData";
import EmployeeAddSkill from "./pages/Employee/EmployeeAddSkill";
import EmployeeSkills from "./pages/Employee/EmployeeSkills";
import EmployeeCourse from "./pages/Employee/EmployeeCourse";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import EmployeeProfile from "./pages/Employee/EmployeeProfile";
import EmployeeRegister from "./pages/Employee/EmployeeRegister";
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
            <Route path="/register" element={<EmployeeRegister />} />

            {/* Employee Routes */}
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <EmployeeLogin setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <EmployeeDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/courses"
              element={
                isLoggedIn ? <EmployeeCourse /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/addskill"
              element={
                isLoggedIn ? <EmployeeAddSkill /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/myskills"
              element={
                isLoggedIn ? <EmployeeSkills /> : <Navigate to="/login" />
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
                isAdminLoggedIn ? (
                  <Navigate to="/admin-dashboard" />
                ) : (
                  <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />
                )
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                isAdminLoggedIn ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/admin-courses"
              element={
                isAdminLoggedIn ? (
                  <AdminCourse />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/admin-skilldata"
              element={
                isAdminLoggedIn ? (
                  <AdminSkillData />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
            <Route
              path="/admin-employeedata"
              element={
                isAdminLoggedIn ? (
                  <AdminEmployeeData />
                ) : (
                  <Navigate to="/admin-login" />
                )
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
