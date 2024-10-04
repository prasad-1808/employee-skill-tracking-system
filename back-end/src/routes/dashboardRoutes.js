const express = require("express");
const router = express.Router();
const {
  getDashboardSummary,
  getSkillsByEmployee,
  getSkillsPerCourse,
} = require("../controllers/dashboardController");

// Route to get dashboard summary
router.get("/summary", getDashboardSummary);

// Route to get skills by employee
router.get("/skills-by-employee", getSkillsByEmployee);

// Route to get skills per course
router.get("/courses-skills", getSkillsPerCourse);

module.exports = router;
