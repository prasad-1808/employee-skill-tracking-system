const express = require("express");
const {
  addQuestion,
  getQuestions,
  getQuestionsOnAssessmentID,
} = require("../controllers/questionController"); // Import the controller functions

const router = express.Router();

// Route to add a new question
router.post("/", addQuestion);

// Route to get all questions
router.get("/", getQuestions);

// Route to get questions by assessment ID
router.get("/assessment/:assessmentId", getQuestionsOnAssessmentID);

module.exports = router;
