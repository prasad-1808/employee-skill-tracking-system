const express = require("express");
const router = express.Router();
const { register, login, getEmployeeData, updateEmployee, getAllEmployees, changeStatus, deleteEmployee } = require("../controllers/employeeController");

// Register an employee
router.post("/register", register);

// Login employee
router.post("/login", login);

// Get employee data by ID
router.get("/:EmployeeID", getEmployeeData);

// Update employee details
router.put("/employees/:EmployeeID", updateEmployee);

// Get all employees
router.get("/", getAllEmployees); 

// New route for changing employee status
router.patch("/:EmployeeID/status", changeStatus);

// Delete employee route
router.delete("/:EmployeeID", deleteEmployee);


module.exports = router;
