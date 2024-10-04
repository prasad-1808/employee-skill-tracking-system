const prisma = require("../utils/db");

// Add a new assessment
const addAssessment = async (req, res) => {
  const { AssessmentCode } = req.body;

  try {
    // Check if an assessment with the same code already exists
    const existingAssessment = await prisma.assessment.findUnique({
      where: { AssessmentCode },
    });

    if (existingAssessment) {
      return res
        .status(400)
        .json({ message: "Assessment with this code already exists" });
    }

    // Create a new assessment
    const newAssessment = await prisma.assessment.create({
      data: { AssessmentCode },
    });

    // Respond with the created assessment
    res.status(201).json({
      message: "Assessment created successfully",
      assessment: newAssessment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all assessments
const getAllAssessments = async (req, res) => {
  try {
    const assessments = await prisma.assessment.findMany();

    if (assessments.length === 0) {
      return res.status(404).json({ message: "No assessments found" });
    }

    res.status(200).json(assessments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific assessment by ID
const getAssessmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(id) }, // Make sure ID is converted to a number
    });

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(assessment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit an existing assessment
const editAssessment = async (req, res) => {
  const { id } = req.params;
  const { AssessmentCode } = req.body;

  try {
    // Check if the assessment exists
    const existingAssessment = await prisma.assessment.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Update the assessment
    const updatedAssessment = await prisma.assessment.update({
      where: { id: Number(id) },
      data: { AssessmentCode },
    });

    res.status(200).json({
      message: "Assessment updated successfully",
      assessment: updatedAssessment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an assessment
const deleteAssessment = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the assessment exists
    const existingAssessment = await prisma.assessment.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAssessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    // Delete the assessment
    await prisma.assessment.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Assessment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addAssessment,
  getAllAssessments,
  getAssessmentById,
  editAssessment,
  deleteAssessment,
};
