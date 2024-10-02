// routes/skillRoutes.js
const express = require("express");
const {
  addSkill,
  editSkill,
  removeSkill,
  getSkills,
  getSkillById,
  getSkillsByEmployeeID,
} = require("../controllers/skillController");
const authMiddleware = require("../middlewares/authMiddleware"); // Optional: use if you want to protect these routes

const router = express.Router();

// Route to add a new skill
router.post("/", authMiddleware, addSkill); // Protect route if needed

// Route to edit an existing skill
router.put("/:SkillID", authMiddleware, editSkill); // Protect route if needed

// Route to remove a skill
router.delete("/:SkillID", authMiddleware, removeSkill); // Protect route if needed

// Route to get all skills
router.get("/", getSkills);

// Route to get a single skill by ID
router.get("/:SkillID", getSkillById);

// Route to get all skills for a specific employee
router.get("/employee/:EmployeeID", getSkillsByEmployeeID);

module.exports = router;
