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
// AuthMiddleware is applied to protect the route (optional, depending on your setup)
router.post("/", authMiddleware, addSkill);

// Route to edit an existing skill (e.g., for verifying a skill)
router.put("/:SkillID", authMiddleware, editSkill);

// Route to remove a skill
router.delete("/:SkillID", authMiddleware, removeSkill);

// Route to get all skills (could be public or protected, depending on your needs)
router.get("/", getSkills);

// Route to get a single skill by its ID
router.get("/:SkillID", getSkillById);

// Route to get all skills associated with a specific employee (by EmployeeID)
router.get("/employee/:EmployeeID", getSkillsByEmployeeID);

module.exports = router;
