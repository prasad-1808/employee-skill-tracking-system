// routes/courseRoutes.js
const express = require("express");
const {
  addCourse,
  editCourse,
  removeCourse,
  getCourses,
  getCourseById,
} = require("../controllers/courseController");
const authMiddleware = require("../middlewares/authMiddleware"); // Optional: use if you want to protect these routes

const router = express.Router();

// Route to add a new course
router.post("/", authMiddleware, addCourse); // Protect route if needed

// Route to edit an existing course
router.put("/:CourseID", authMiddleware, editCourse); // Protect route if needed

// Route to remove a course
router.delete("/:CourseID", authMiddleware, removeCourse); // Protect route if needed

// Route to get all courses
router.get("/", getCourses);

// Route to get a single course by ID
router.get("/:CourseID", getCourseById);

module.exports = router;
