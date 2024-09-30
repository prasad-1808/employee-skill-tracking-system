const prisma = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new employee
const register = async (req, res) => {
  console.log(req.body);
  let {
    EmployeeID,
    Firstname,
    Lastname,
    Designation,
    YearOfJoining,
    Password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    const employee = await prisma.employee.create({
      data: {
        EmployeeID,
        Firstname,
        Lastname,
        Designation,
        YearOfJoining,
        Password: hashedPassword,
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login employee
const login = async (req, res) => {
  console.log(req.body);
  const { EmployeeID, Password } = req.body;

  try {
    const employee = await prisma.employee.findUnique({
      where: { EmployeeID },
    });

    if (!employee) {
      return res.status(401).json({ error: "Invalid Employee ID or password" });
    }

    const passwordMatch = await bcrypt.compare(Password, employee.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Employee ID or password" });
    }

    const token = jwt.sign(
      { EmployeeID: employee.EmployeeID },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update employee details
const updateEmployee = async (req, res) => {
  const employeeId = req.params.EmployeeID;
  const { Firstname, Lastname, Designation, YearOfJoining } = req.body;

  try {
    const employee = await prisma.employee.findUnique({
      where: { EmployeeID: employeeId },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const updatedEmployee = await prisma.employee.update({
      where: { EmployeeID: employeeId },
      data: {
        Firstname,
        Lastname,
        Designation,
        YearOfJoining,
      },
    });

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get employee data
const getEmployeeData = async (req, res) => {
  const { EmployeeID } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { EmployeeID },
    });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, getEmployeeData, updateEmployee };
