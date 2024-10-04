const prisma = require("../utils/db");

// Get summary of total employees, courses, and skills
const getDashboardSummary = async (req, res) => {
  try {
    const totalEmployees = await prisma.employee.count();
    const totalCourses = await prisma.course.count();
    const totalSkills = await prisma.skill.count();

    res.json({
      totalEmployees,
      totalCourses,
      totalSkills,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching dashboard summary data" });
  }
};

// Get skills by employee
const getSkillsByEmployee = async (req, res) => {
  try {
    const skillsByEmployee = await prisma.employee.findMany({
      include: {
        skills: true,
      },
    });

    const data = skillsByEmployee.map((employee) => ({
      employeeName: `${employee.Firstname} ${employee.Lastname}`,
      skillCount: employee.skills.length,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills by employee" });
  }
};

// Get skills per course
const getSkillsPerCourse = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        skills: true,
      },
    });

    const data = courses.map((course) => ({
      courseName: course.CourseName,
      courseCode: course.CourseCode,
      employeeCount: course.skills.length,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills per course" });
  }
};

module.exports = {
  getDashboardSummary,
  getSkillsByEmployee,
  getSkillsPerCourse,
};
