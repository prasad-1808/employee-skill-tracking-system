import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaBars } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";

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
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top text-white"
      style={{ paddingTop: "0px", paddingBottom: "0.5px" }}
    >
      <div className="container-fluid unorderedList">
        <Link className="navbar-brand fs-2 text-white" to="/">
          Employees Skill Tracking System <GiExpense />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleDropdown}
        >
          <FaBars />
        </button>

        <div
          className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="d-flex justify-content-end w-100 navbar-nav me-auto fs-4">
            {/* Home link always visible */}
            <li className="nav-item mx-3">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {/* Show Login and Register links if not logged in */}
            {!isLoggedIn && !isAdminLoggedIn && (
              <>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Admin-specific links */}
            {isAdminLoggedIn && (
              <>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/admin-courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/admin-skilldata">
                    SkillsData
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link text-white"
                    to="/admin-employeedata"
                  >
                    EmployeeData
                  </Link>
                </li>
              </>
            )}

            {/* Employee-specific links */}
            {isLoggedIn && !isAdminLoggedIn && (
              <>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/addskill">
                    Add Skill
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/myskills">
                    My Performance
                  </Link>
                </li>
              </>
            )}

            {/* Profile and Logout Links for logged-in users (admin or employee) */}
            {(isLoggedIn || isAdminLoggedIn) && (
              <li className="nav-item dropdown mx-3">
                <FaRegUserCircle
                  className="dropdown-toggle nav-item mx-4 fs-2 mt-2 nav-icon"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  style={{ marginTop: "1.75rem" }}
                >
                  <li>
                    <center>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </center>
                  </li>
                  <li className="nav-item mx-3">
                    <center>
                      <button className="dropdown-item" onClick={handleLogout}>
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
