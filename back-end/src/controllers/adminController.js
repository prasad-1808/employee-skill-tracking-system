const prisma = require("../utils/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin
// const adminregister = async (req, res) => {
//   console.log(req.body);
//   let { AdminID, AdminName, AdminEmail, AdminPassword } = req.body;
//   const hashedPassword = await bcrypt.hash(AdminPassword, 10);

//   try {
//     const admin = await prisma.admin.create({
//       data: {
//         AdminID,
//         AdminName,
//         AdminEmail,
//         AdminPassword: hashedPassword,
//       },
//     });

//     res.status(201).json(admin);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const adminregister = async (req, res) => {
  console.log(req.body);
  let { AdminID, AdminName, AdminEmail, AdminPassword } = req.body;

  // Regular expression to check password: 6-12 characters, at least 1 uppercase letter and 1 number
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/;

  // Validate password strength
  if (!passwordRegex.test(AdminPassword)) {
    return res.status(400).json({
      error:
        "Password must be 6-12 characters long, contain at least 1 uppercase letter, and at least 1 number.",
    });
  }

  const hashedPassword = await bcrypt.hash(AdminPassword, 10);

  try {
    const admin = await prisma.admin.create({
      data: {
        AdminID,
        AdminName,
        AdminEmail,
        AdminPassword: hashedPassword,
      },
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login Admin
const adminlogin = async (req, res) => {
  console.log(req.body);
  const { AdminID, AdminPassword } = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: { AdminID },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid Admin ID or password" });
    }

    const passwordMatch = await bcrypt.compare(
      AdminPassword,
      admin.AdminPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Admin ID or password" });
    }

    const token = jwt.sign({ AdminID: admin.AdminID }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { adminregister, adminlogin };
