// controllers/assessmentScoreController.js
const prisma = require("./../utils/db"); // Adjust path as necessary

// Create a new assessment score
const createAssessmentScore = async (req, res) => {
  const { AssessmentCode, EmployeeID, CourseID, ObtainedMarks } = req.body;
  try {
    const score = await prisma.assessmentScore.create({
      data: {
        AssessmentCode,
        EmployeeID,
        CourseID,
        ObtainedMarks,
      },
    });
    res.status(201).json(score);
  } catch (error) {
    res.status(500).json({ error: "Error creating assessment score" });
  }
};

// Get all scores for a specific assessment
const getScoresByAssessment = async (req, res) => {
  const { AssessmentCode } = req.params;
  try {
    const scores = await prisma.assessmentScore.findMany({
      where: { AssessmentCode },
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving scores" });
  }
};

// Export the controller functions
module.exports = {
  createAssessmentScore,
  getScoresByAssessment,
};
