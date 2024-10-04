import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaBars } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import "./../assets/Navbar.css"; // For custom styling

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Clear all cached data
    localStorage.clear();
    sessionStorage.clear();

    if (isAdminLoggedIn) {
      setIsAdminLoggedIn(false);
      navigate("/admin-login");
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-gradient fixed-top fs-3"
      style={{
        paddingTop: "0px",
        paddingBottom: "0.5px",
      }}
    >
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand fs-3" to="/">
          <GiExpense className="brand-icon fs-3" /> Employees Skill Tracking
          System
        </Link>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler fs-3"
          type="button"
          onClick={toggleDropdown}
        >
          <FaBars className="fs-3" />
        </button>

        <div
          className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="d-flex justify-content-end w-100 navbar-nav me-auto fs-3">
            {/* Home link always visible */}

            {/* Show Login and Register links if not logged in */}
            {!isLoggedIn && !isAdminLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fs-3" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fs-3" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fs-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Admin-specific links */}
            {isAdminLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fs-3"
                    to="/admin-dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fs-3"
                    to="/admin-courses"
                  >
                    Courses
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fs-3"
                    to="/admin-skilldata"
                  >
                    Skills
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fs-3"
                    to="/admin-assessments"
                  >
                    Assessments
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-white fs-3"
                    to="/admin-employeedata"
                  >
                    Employee
                  </Link>
                </li>
              </>
            )}

            {/* Employee-specific links */}
            {isLoggedIn && !isAdminLoggedIn && (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fs-3" to="/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fs-3" to="/addskill">
                    Add Skill
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-white fs-3" to="/myskills">
                    My Performance
                  </Link>
                </li>
              </>
            )}

            {/* Profile and Logout Links for logged-in users */}
            {(isLoggedIn || isAdminLoggedIn) && (
              <li className="nav-item dropdown mx-2 my-2">
                <FaRegUserCircle
                  className="dropdown-toggle nav-icon fs-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                />
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-lg animate-dropdown fs-5"
                  style={{ marginTop: "1.5rem" }}
                >
                  <li>
                    <center>
                      <Link className="dropdown-item fs-4" to="/profile">
                        Profile
                      </Link>
                    </center>
                  </li>
                  <li>
                    <center>
                      <button
                        className="dropdown-item fs-4"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </center>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
