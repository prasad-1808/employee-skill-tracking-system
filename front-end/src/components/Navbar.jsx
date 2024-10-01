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
    if (isAdminLoggedIn) {
      setIsAdminLoggedIn(false);
      localStorage.removeItem("adminToken");
      navigate("/admin-login");
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem("employeeToken");
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
            <li className="nav-item mx-3">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {/* Check if the user is an admin */}
            {isAdminLoggedIn ? (
              <>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/admin-courses">
                    Courses
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/page5">
                    Page5
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to="/page6">
                    Page6
                  </Link>
                </li>
              </>
            ) : (
              // If not admin, check if the user is logged in as an employee
              isLoggedIn && (
                <>
                  <li className="nav-item mx-3">
                    <Link className="nav-link text-white" to="/courses">
                      Courses
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link className="nav-link text-white" to="/page2">
                      Page2
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link className="nav-link text-white" to="/page3">
                      Page3
                    </Link>
                  </li>
                </>
              )
            )}

            {/* Profile and Logout Links */}
            {isLoggedIn || isAdminLoggedIn ? (
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
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
