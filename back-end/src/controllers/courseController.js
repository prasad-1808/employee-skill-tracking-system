// controllers/courseController.js
const prisma = require("../utils/db");

// Add a new course
const addCourse = async (req, res) => {
  const { CourseName, Level } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        CourseName,
        Level,
      },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit an existing course
const editCourse = async (req, res) => {
  const { CourseID } = req.params;
  const { CourseName, Level } = req.body;

  try {
    const course = await prisma.course.update({
      where: { CourseID: parseInt(CourseID) },
      data: {
        CourseName,
        Level,
      },
    });
    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a course
const removeCourse = async (req, res) => {
  const { CourseID } = req.params;

  try {
    await prisma.course.delete({
      where: { CourseID: parseInt(CourseID) },
    });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
  const { CourseID } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { CourseID: parseInt(CourseID) },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addCourse,
  editCourse,
  removeCourse,
  getCourses,
  getCourseById,
};
