const express = require("express");
const {
  adminregister,
  adminlogin
} = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware"); // Assuming you have an auth middleware for protected routes

const router = express.Router();

// Route for registering a new employee
router.post("/register", adminregister);

// Route for employee login
router.post("/login", adminlogin);

module.exports = router;
