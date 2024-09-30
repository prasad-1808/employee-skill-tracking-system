const express = require("express");
const {
  register,
  login,
  getEmployeeData,
  updateEmployee,
} = require("../controllers/employeeController");
const authMiddleware = require("../middlewares/authMiddleware"); // Assuming you have an auth middleware for protected routes

const router = express.Router();

// Route for registering a new employee
router.post("/register", register);

// Route for employee login
router.post("/login", login);

// Route for getting employee data (protected)
router.get("/:EmployeeID", authMiddleware, getEmployeeData);

// Route for updating employee data (protected)
router.put("/:EmployeeID", authMiddleware, updateEmployee);

module.exports = router;
