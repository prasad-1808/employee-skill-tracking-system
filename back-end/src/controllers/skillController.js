// controllers/skillController.js
const prisma = require("../utils/db");

// Add a new skill
const addSkill = async (req, res) => {
  const { EmployeeID, CourseID, Score, Proof } = req.body;

  try {
    const skill = await prisma.skill.create({
      data: {
        EmployeeID,
        CourseID,
        Score,
        Proof,
      },
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit an existing skill
const editSkill = async (req, res) => {
  const { SkillID } = req.params;
  const { Score, Proof, Verified } = req.body;

  try {
    const skill = await prisma.skill.update({
      where: { id: parseInt(SkillID) },
      data: {
        Score,
        Proof,
        Verified,
      },
    });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a skill
const removeSkill = async (req, res) => {
  const { SkillID } = req.params;

  try {
    await prisma.skill.delete({
      where: { id: parseInt(SkillID) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all skills
const getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single skill by ID
const getSkillById = async (req, res) => {
  const { SkillID } = req.params;

  try {
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(SkillID) },
    });

    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    res.json(skill);
  } catch (error) {
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
