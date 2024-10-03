const prisma = require("../utils/db"); // Adjust this import to your Prisma client setup

// Add a new skill
const addSkill = async (req, res) => {
  const {
    EmployeeID,
    CourseID,
    Proficiency,
    SkillType,
    CertificateLink,
    ScoreObtained,
  } = req.body;

  // Log the request body to check the incoming data
  console.log("Request Body:", req.body);

  try {
    const data = {
      EmployeeID,
      CourseID: parseInt(CourseID), // Ensure CourseID is an integer
      Proficiency, // Should be a string like "Basic", "Intermediate", "Advanced"
      SkillType, // "CERTIFICATE" or "ASSESSMENT"
      Verified: false, // Default verified status
    };

    // Conditionally add CertificateLink or ScoreObtained based on SkillType
    if (SkillType === "CERTIFICATE") {
      data.CertificateLink = CertificateLink; // Only add the certificate link for certificates
    } else if (SkillType === "ASSESSMENT") {
      data.ScoreObtained = parseInt(ScoreObtained); // Only add the score for assessments
    }

    const skill = await prisma.skill.create({
      data,
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error("Error in addSkill:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Edit an existing skill's verification status
const editSkill = async (req, res) => {
  const { SkillID } = req.params;
  const { Verified } = req.body;

  try {
    const skill = await prisma.skill.update({
      where: { id: parseInt(SkillID) }, // Ensure SkillID is an integer
      data: {
        Verified: !!Verified, // Ensure Verified is a boolean
      },
    });

    res.json(skill);
  } catch (error) {
    console.error("Error in editSkill:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Remove a skill
const removeSkill = async (req, res) => {
  const { SkillID } = req.params;

  try {
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(SkillID) }, // Ensure SkillID is an integer
    });

    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

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

// Function to get skills by EmployeeID
const getSkillsByEmployeeID = async (req, res) => {
  const { EmployeeID } = req.params;

  try {
    const skills = await prisma.skill.findMany({
      where: { EmployeeID },
      include: {
        course: true, // Optional: to fetch course details along with skill
      },
    });

    if (skills.length > 0) {
      res.json(skills);
    } else {
      res.status(404).json({ message: "No skills found for this employee" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills" });
  }
};

module.exports = {
  addSkill,
  editSkill,
  removeSkill,
  getSkills,
  getSkillById,
  getSkillsByEmployeeID,
};
