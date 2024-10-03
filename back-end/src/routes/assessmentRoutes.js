// routes/assessmentRoutes.js
const express = require("express");
const {
  createAssessment,
  editAssessment,
  getAssessmentDetails,
} = require("../controllers/assessmentController");

const router = express.Router();

// Define routes for assessment
router.post("/", createAssessment);
router.put("/:id", editAssessment);
router.get("/:id", getAssessmentDetails);

module.exports = router;
