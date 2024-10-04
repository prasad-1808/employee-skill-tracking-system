const prisma = require("../utils/db");

const addQuestion = async (req, res) => {
  const { questionText, options, correctAnswer, assessmentId } = req.body; // Use the right variable names

  try {
    // First, check if the assessment exists by fetching it from the database
    const assessment = await prisma.assessment.findUnique({
      where: { id: Number(assessmentId) }, // Ensure the assessmentId is a number
    });

    // If the assessment doesn't exist, return a 404 error
    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    // Create the new question associated with the assessment
    const questionData = await prisma.question.create({
      data: {
        questionText,
        options, // `options` is already an array, so you can pass it directly
        correctAnswer,
        assessmentId: Number(assessmentId), // Link the question to the correct assessment
      },
    });

    // Respond with the newly created question
    res.status(201).json({
      message: "Question added successfully",
      question: questionData,
    });
  } catch (error) {
    // Catch any errors and return a 400 error with the error message
    res.status(400).json({ error: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    // Fetch all questions from the database
    const questions = await prisma.question.findMany({
      include: {
        assessment: true, // Assuming you have an assessment relationship in your question model
      },
    });

    // Check if there are questions
    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    // Return the fetched questions
    res.status(200).json(questions);
  } catch (error) {
    // Catch any errors and return a 400 error with the error message
    res.status(400).json({ error: error.message });
  }
};

const getQuestionsOnAssessmentID = async (req, res) => {
  const { assessmentId } = req.params; // Extract assessment ID from request parameters

  try {
    // Fetch questions associated with the specified assessment ID
    const questions = await prisma.question.findMany({
      where: { assessmentId: Number(assessmentId) }, // Ensure assessmentId is parsed as an integer
    });

    // Check if questions exist for the given assessment ID
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this assessment" });
    }

    // Return the fetched questions
    res.status(200).json(questions);
  } catch (error) {
    // Catch any errors and return a 400 error with the error message
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  getQuestionsOnAssessmentID,
};
