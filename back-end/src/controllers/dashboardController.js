const prisma = require("../utils/db");

// Get summary of total employees, courses, and skills (only active employees and verified skills)
const getDashboardSummary = async (req, res) => {
  try {
    const totalEmployees = await prisma.employee.count({
      where: {
        status: true, // Only count active employees
      },
    });
    
    const totalCourses = await prisma.course.count();
    
    const totalSkills = await prisma.skill.count({
      where: {
        Verified: true, // Only count verified skills
      },
    });

    res.json({
      totalEmployees,
      totalCourses,
      totalSkills,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching dashboard summary data" });
  }
};

// Get skills by employee (for active employees and verified skills only)
const getSkillsByEmployee = async (req, res) => {
  try {
    const skillsByEmployee = await prisma.employee.findMany({
      where: {
        status: true, // Only include active employees
      },
      include: {
        skills: {
          where: {
            Verified: true, // Only include verified skills
          },
        },
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

// Get skills per course (for verified skills only)
const getSkillsPerCourse = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        skills: {
          where: {
            Verified: true, // Only include verified skills
          },
        },
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
