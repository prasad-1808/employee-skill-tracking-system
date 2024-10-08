import React, { useState, useEffect } from "react";
import api from "../../services/api";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../../assets/AdminSkillData.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Pagination from "react-bootstrap/Pagination";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const course_categories = {
  Python: {
    prefix: "PY",
    courses: {
      Easy: [
        "Introduction to Python",
        "Python Basics for Beginners",
        "Python Scripting Essentials",
        "Python for Automation",
      ],
      Medium: [
        "Python for Data Analysis",
        "Intermediate Python Programming",
        "Object-Oriented Programming with Python",
        "Python for Web Scraping",
      ],
      Hard: [
        "Advanced Python Programming",
        "Python for Machine Learning",
        "Python for Software Design Patterns",
        "Python Performance Optimization",
      ],
    },
  },
  "Web Development": {
    prefix: "WD",
    courses: {
      Easy: [
        "Basic HTML and CSS",
        "Responsive Web Design with HTML and CSS",
        "HTML5 Fundamentals",
        "Introduction to Web Design",
      ],
      Medium: [
        "JavaScript and Front-End Development",
        "React for Beginners",
        "Intermediate CSS & Sass",
        "JavaScript: The DOM and Event Handling",
      ],
      Hard: [
        "Full Stack Web Development",
        "Building Web Apps with Node.js and Express",
        "Advanced JavaScript Frameworks (Vue, Angular, React)",
        "Web Performance Optimization",
      ],
    },
  },
  "Data Engineering": {
    prefix: "DE",
    courses: {
      Easy: [
        "Introduction to Data Pipelines",
        "Fundamentals of SQL",
        "Data Warehousing Basics",
        "Data Modeling for Beginners",
      ],
      Medium: [
        "ETL Processes and Tools",
        "Data Integration with Apache Kafka",
        "Data Lakes and Big Data Systems",
        "Advanced SQL for Data Engineering",
      ],
      Hard: [
        "Big Data and Distributed Systems",
        "Building Data Pipelines with Apache Airflow",
        "Data Engineering with Apache Spark",
        "Advanced ETL Design and Optimization",
      ],
    },
  },
  "Data Science": {
    prefix: "DS",
    courses: {
      Easy: [
        "Data Science Fundamentals",
        "Introduction to Data Visualization",
        "Statistics for Data Science",
        "Exploratory Data Analysis with Python",
      ],
      Medium: [
        "Machine Learning with Python",
        "Intermediate Data Visualization with Python",
        "Applied Data Science with R",
        "Data Wrangling and Preprocessing",
      ],
      Hard: [
        "Deep Learning and Neural Networks",
        "Reinforcement Learning with Python",
        "Natural Language Processing with Python",
        "Advanced Machine Learning Algorithms",
      ],
    },
  },
  "Cloud Computing": {
    prefix: "CC",
    courses: {
      Easy: [
        "Introduction to Cloud Computing",
        "Cloud Storage Fundamentals",
        "Getting Started with AWS",
        "Cloud Security Basics",
      ],
      Medium: [
        "AWS Solutions Architect: Associate",
        "Azure DevOps for Cloud Engineering",
        "Cloud Infrastructure Automation with Terraform",
        "Building Scalable Applications on AWS",
      ],
      Hard: [
        "AWS Solutions Architect: Professional",
        "Advanced Cloud Networking",
        "Cloud Security and Compliance",
        "Kubernetes in the Cloud",
      ],
    },
  },
  Cybersecurity: {
    prefix: "CS",
    courses: {
      Easy: [
        "Introduction to Cybersecurity",
        "Fundamentals of Ethical Hacking",
        "Cyber Threat Intelligence",
        "Network Security Essentials",
      ],
      Medium: [
        "Penetration Testing with Kali Linux",
        "Security Operations and Incident Response",
        "Intermediate Network Security",
        "Secure Coding Practices",
      ],
      Hard: [
        "Advanced Ethical Hacking",
        "Cybersecurity Risk Management",
        "Advanced Threat Hunting",
        "Cryptography and Security Protocols",
      ],
    },
  },
};

const AdminSkillData = () => {
  const [verifiedSkills, setVerifiedSkills] = useState([]);
  const [unVerifiedSkills, setUnVerifiedSkills] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Employees",
        data: [],
        backgroundColor: "#36b9cc",
        borderColor: "#4e73df",
        borderWidth: 1,
      },
    ],
  });
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    CourseName: "",
    EmployeeName: "",
    Proficiency: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const skillsPerPage = 10;

  const fetchSkills = async () => {
    try {
      const response = await api.get("/skills");
      const skills = response.data || [];
      const verified = skills.filter((skill) => skill.Verified);
      const unverified = skills.filter((skill) => !skill.Verified);
      setVerifiedSkills(verified);
      setUnVerifiedSkills(unverified);
      processChartData(verified);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const processChartData = (verifiedSkills) => {
    const courseCounts = {
      Python: 0,
      "Web Development": 0,
      "Data Engineering": 0,
      "Data Science": 0,
      "Cloud Computing": 0,
      Cybersecurity: 0,
    };

    verifiedSkills.forEach((skill) => {
      const courseName = skill.course.CourseName;
      Object.keys(course_categories).forEach((category) => {
        const courses = Object.values(
          course_categories[category].courses
        ).flat();
        if (courses.includes(courseName)) {
          courseCounts[category] += 1;
        }
      });
    });

    setChartData({
      labels: Object.keys(courseCounts),
      datasets: [
        {
          label: "Number of Employees",
          data: Object.values(courseCounts),
          backgroundColor: "#36b9cc",
          borderColor: "#4e73df",
          borderWidth: 1,
        },
      ],
    });
  };

  const verifySkill = async (skillId) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await api.put(
        `/skills/${skillId}`,
        { Verified: true },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      fetchSkills();
      toast.success("Skill verified successfully");
    } catch (error) {
      toast.error("Error verifying skill");
      console.error(
        "Error verifying skill:",
        error.response?.data || error.message
      );
    }
  };

  const deleteSkill = async (skillID) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/skills/${skillID}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      fetchSkills();
      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error("Error deleting skill");
      console.error(
        "Error deleting skill:",
        error.response?.data || error.message
      );
    }
  };

  const viewSkillDetails = (skill) => {
    setSelectedSkill(skill);
    setShowModal(true);
  };

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await api.post("/skills", newSkill, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        fetchSkills();
        toast.success("Skill added successfully!");
        setShowAddSkillModal(false);
        setNewSkill({ CourseName: "", EmployeeName: "", Proficiency: "" });
      } else {
        toast.error("Failed to add skill");
      }
    } catch (error) {
      toast.error("Error occurred while adding skill");
      console.error("Error adding skill:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Pagination logic
  const indexOfLastSkill = currentPage * skillsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
  const currentSkills = unVerifiedSkills.slice(
    indexOfFirstSkill,
    indexOfLastSkill
  );
  const totalPages = Math.ceil(unVerifiedSkills.length / skillsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div className="container-fluid mt-5">
      <div className="text-center mb-4" style={{ marginTop: "5rem" }}>
        <h2 style={{ color: "#e62dd7" }}>Employees Skills Data</h2>
      </div>
      <div className="row" style={{ marginTop: "2rem" }}>
        <div className="col-md-5">
          <h3 style={{ color: "#e62dd7" }}>Unverified Skills</h3>
          {unVerifiedSkills.length > 0 ? (
            <>
              <table className="table table-striped table-hover table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Employee Name</th>
                    <th>Course Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSkills.map((skill) => (
                    <tr key={skill.id}>
                      <td>{`${skill.employee.Firstname} ${skill.employee.Lastname}`}</td>
                      <td>{skill.course.CourseName}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm mr-2"
                          onClick={() => verifySkill(skill.id)}
                        >
                          Verify
                        </button>{" "}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteSkill(skill.id)}
                        >
                          Delete
                        </button>{" "}
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => viewSkillDetails(skill)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                  />
                  {renderPaginationItems()}
                  <Pagination.Next
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </>
          ) : (
            <p>No unverified skills available.</p>
          )}
        </div>
        <div className="col-md-7">
          <h3 style={{ color: "#e62dd7" }}>Verified Skills</h3>
          {chartData.labels.length > 0 ? (
            <Bar data={chartData} />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </div>
      </div>

      {/* Skill Details Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Skill Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSkill && (
            <>
              <p>
                <strong>Employee Name:</strong>{" "}
                {`${selectedSkill.employee.Firstname} ${selectedSkill.employee.Lastname}`}
              </p>
              <p>
                <strong>Course Name:</strong> {selectedSkill.course.CourseName}
              </p>
              <p>
                <strong>Proficiency:</strong> {selectedSkill.Proficiency}
              </p>
              <p>
                <strong>Verified:</strong>{" "}
                {selectedSkill.Verified ? "Yes" : "No"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Skill Modal */}
      <Modal
        show={showAddSkillModal}
        onHide={() => setShowAddSkillModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Course Name</label>
              <input
                type="text"
                className="form-control"
                value={newSkill.CourseName}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, CourseName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                className="form-control"
                value={newSkill.EmployeeName}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, EmployeeName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Proficiency</label>
              <input
                type="text"
                className="form-control"
                value={newSkill.Proficiency}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, Proficiency: e.target.value })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddSkillModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminSkillData;
