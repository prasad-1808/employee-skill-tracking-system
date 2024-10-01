const prisma = require("../utils/db"); // Adjust this import to your Prisma client setup

// Add a new skill
const addSkill = async (req, res) => {
  const { EmployeeID, CourseID, Proficiency, Score, Proof } = req.body;

  // Log the request body to check the incoming data
  console.log("Request Body:", req.body);

  try {
    const skill = await prisma.skill.create({
      data: {
        EmployeeID,
        CourseID: parseInt(CourseID), // Ensure CourseID is an integer
        Proficiency, // Should be a string like "Basic", "Intermediate", "Advanced"
        Score: parseInt(Score), // Ensure Score is an integer
        Proof,
      },
    });
    res.status(201).json(skill);
  } catch (error) {
    console.error("Error in addSkill:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Edit an existing skill
const editSkill = async (req, res) => {
  const { SkillID } = req.params;
  const { Score, Proof, Verified } = req.body;

  try {
    const skill = await prisma.skill.update({
      where: { id: parseInt(SkillID) }, // Ensure SkillID is an integer
      data: {
        Score: parseInt(Score), // Ensure Score is an integer
        Proof: Proof,
        Verified: !Verified, // Default to false if not provided
      },
    });
    res.json(skill);
  } catch (error) {
    console.error("Error in editSkill:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Remove a skill
// Remove a skill
const removeSkill = async (req, res) => {
  const { SkillID } = req.params;

  try {
    // Find the skill to check if it exists
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(SkillID) }, // Ensure SkillID is an integer
    });

    // Check if the skill exists before attempting to delete
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    // Delete the skill
    await prisma.skill.delete({
      where: { id: parseInt(SkillID) }, // Ensure SkillID is an integer
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error in removeSkill:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get all skills
const getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        employee: true, // Include related employee data
        course: true, // Include related course data
      },
    });
    res.json(skills);
  } catch (error) {
    console.error("Error in getSkills:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get a single skill by ID
const getSkillById = async (req, res) => {
  const { SkillID } = req.params;

  try {
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(SkillID) }, // Ensure SkillID is an integer
      include: {
        employee: true, // Include related employee data
        course: true, // Include related course data
      },
    });

    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    res.json(skill);
  } catch (error) {
    console.error("Error in getSkillById:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addSkill,
  editSkill,
  removeSkill,
  getSkills,
  getSkillById,
};
