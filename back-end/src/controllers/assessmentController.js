// controllers/assessmentController.js
const prisma = require("../prismaClient"); // Adjust path as necessary

// Create a new assessment
const createAssessment = async (req, res) => {
  const { AssessmentCode, AssessmentQuestions } = req.body;
  try {
    const assessment = await prisma.assessment.create({
      data: {
        AssessmentCode,
        AssessmentQuestions,
      },
    });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ error: "Error creating assessment" });
  }
};

// Edit an existing assessment
const editAssessment = async (req, res) => {
  const { id } = req.params;
  const { AssessmentCode, AssessmentQuestions } = req.body;
  try {
    const assessment = await prisma.assessment.update({
      where: { id: parseInt(id) },
      data: {
        AssessmentCode,
        AssessmentQuestions,
      },
    });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: "Error updating assessment" });
  }
};

// Calculate total marks based on assessment questions
const calculateTotalMarks = (AssessmentQuestions) => {
  return AssessmentQuestions.reduce((total, question) => {
    return total + (question.mark || 0);
  }, 0);
};

// Get assessment details
const getAssessmentDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    const totalMarks = calculateTotalMarks(assessment.AssessmentQuestions);
    res.json({ ...assessment, totalMarks });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving assessment details" });
  }
};

// Export the controller functions
module.exports = {
  createAssessment,
  editAssessment,
  getAssessmentDetails,
};
