// routes/assessmentScoreRoutes.js
const express = require("express");
const {
  createAssessmentScore,
  getScoresByAssessment,
} = require("../controllers/assessmentScoreController");

const router = express.Router();

// Define routes for assessment scores
router.post("/", createAssessmentScore);
router.get("/:AssessmentCode", getScoresByAssessment);

module.exports = router;
