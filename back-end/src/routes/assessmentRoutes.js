const express = require("express");
const {
  addAssessment,
  getAllAssessments,
  getAssessmentById,
  editAssessment,
  deleteAssessment,
} = require("../controllers/assessmentController");

const router = express.Router();

router.post("/", addAssessment); // Add new assessment
router.get("/", getAllAssessments); // Get all assessments
router.get("/:id", getAssessmentById); // Get specific assessment by ID
router.put("/:id", editAssessment); // Edit an assessment by ID
router.delete("/:id", deleteAssessment); // Delete an assessment by ID

module.exports = router;
