import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [skillsByEmployee, setSkillsByEmployee] = useState([]);
  const [skillsPerCourse, setSkillsPerCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resSummary = await fetch(
        "http://localhost:5000/api/dashboard/summary"
      );
      const dataSummary = await resSummary.json();
      setSummary(dataSummary);

      const resSkillsByEmployee = await fetch(
        "http://localhost:5000/api/dashboard/skills-by-employee"
      );
      const dataSkillsByEmployee = await resSkillsByEmployee.json();
      setSkillsByEmployee(dataSkillsByEmployee);

      const resSkillsPerCourse = await fetch(
        "http://localhost:5000/api/dashboard/courses-skills"
      );
      const dataSkillsPerCourse = await resSkillsPerCourse.json();
      setSkillsPerCourse(dataSkillsPerCourse);
    };

    fetchData();
  }, []);

  // Data for skills by employee with customized colors and width
  const employeeSkillData = {
    series: [
      {
        name: "Number of Skills",
        data: skillsByEmployee.map((emp) => emp.skillCount),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 400,
        width: "100%", // Ensure full-width responsiveness
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%", // Adjust the bar width here
          borderRadius: 5, // Smooth bar appearance
        },
      },
      colors: ["rgba(75, 192, 192, 0.6)"], // Match with Chart.js background color
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: skillsByEmployee.map((emp) => emp.employeeName),
        labels: {
          style: {
            colors: "#e62dd7", // Match x-axis tick color
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#e62dd7", // Match y-axis tick color
          },
          formatter: (value) => Math.round(value), // Ensure whole numbers
        },
      },
      tooltip: {
        theme: "light",
        style: {
          fontSize: "12px",
          color: "#e62dd7", // Match tooltip text color
        },
        fillSeriesColor: true,
      },
      legend: {
        labels: {
          colors: "#e62dd7", // Legend text color
        },
      },
    },
  };

  // Data for skills per course with customized colors and width
  const courseSkillData = {
    series: [
      {
        name: "Number of Employees",
        data: skillsPerCourse.map((course) => course.employeeCount),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 400,
        width: "100%", // Ensure full-width responsiveness
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%", // Adjust bar width
          borderRadius: 5, // Smooth bar appearance
        },
      },
      colors: ["rgba(153, 102, 255, 0.6)"], // Match with Chart.js background color
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: skillsPerCourse.map((course) => course.courseCode),
        labels: {
          style: {
            colors: "#e62dd7", // Match x-axis tick color
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#e62dd7", // Match y-axis tick color
          },
          formatter: (value) => Math.round(value),
        },
      },
      tooltip: {
        theme: "light",
        style: {
          fontSize: "12px",
          color: "#e62dd7", // Match tooltip text color
        },
        fillSeriesColor: true,
      },
      legend: {
        labels: {
          colors: "#e62dd7", // Legend text color
        },
      },
    },
  };

  return (
    <div
      className="container-fluid pt-3 text-white dashboard-container"
      style={{
        marginTop: "7rem",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
      }} // Adjusting width of the container to 100%
    >
      <h1 className="text-center mb-3" style={{ color: "#e62dd7" }}>
        Admin Dashboard
      </h1>

      {/* Summary Section */}
      <div className="row mb-4 justify-content-center">
        {/* Cards on the left side */}
        <div className="col-md-3">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body text-center">
              <h3>Total Employees</h3>
              <h4>{summary.totalEmployees}</h4>
            </div>
          </div>
          <div className="card bg-success text-white mb-3">
            <div className="card-body text-center">
              <h3>Total Courses</h3>
              <h4>{summary.totalCourses}</h4>
            </div>
          </div>
          <div className="card bg-info text-white mb-3">
            <div className="card-body text-center">
              <h3>Total Skills</h3>
              <h4>{summary.totalSkills}</h4>
            </div>
          </div>
        </div>

        {/* Charts on the right side */}
        <div className="col-md-9">
          <div className="row justify-content-center">
            <div className="col-10">
              {/* Bar Chart: Skills per Employee */}
              <div
                className="chart-container mb-4 text-center"
                style={{
                  width: "100%",
                  margin: "0 auto",
                  height: "400px",
                }}
              >
                <ReactApexChart
                  options={employeeSkillData.options}
                  series={employeeSkillData.series}
                  type="bar"
                  height={400}
                  width="1000px"
                />
              </div>

              {/* Bar Chart: Skills per Course */}
              <div
                className="chart-container mb-4 text-center"
                style={{
                  width: "100%",
                  margin: "0 auto",
                  height: "400px",
                }}
              >
                <ReactApexChart
                  options={courseSkillData.options}
                  series={courseSkillData.series}
                  type="bar"
                  height={400}
                  width="1000px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
