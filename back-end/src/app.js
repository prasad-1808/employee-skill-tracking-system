const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/course",courseRoutes);

module.exports = app;
