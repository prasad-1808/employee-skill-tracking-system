import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "linear-gradient(135deg, #e0eafc, #cfdef3)", // Matching background gradient
        backgroundColor: "white"
      }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{
          maxWidth: "600px",
          width: "100%",
          borderRadius: "15px", // Rounded corners
          backgroundColor: "#8d0cc8",
          transition: "transform 0.3s ease", // Smooth animation
        }}
      >
        {/* Custom styled JElite logo */}
        <h1 className="display-4 mb-4 text-center">
          <span style={{ color: "#f40986", fontWeight:"bold" }}>J</span>
          <span style={{ color: "#fff", fontWeight:"bold" }}>Elite</span>
        </h1>

        <p className="lead text-center" style={{ color: "white"}}>
          A comprehensive employee management system that bridges the gap
          between employees and admin, enabling clear insight into individual
          skills, assigning tasks efficiently, and fostering professional growth
          across the organization.
        </p>

        {/* CTA Button with custom style */}
        <div className="text-center mt-4">
          <Link
            to="/dashboard"
            className="custom-button d-inline-flex align-items-center"
            style={{
              backgroundColor:"white",
              // background: "linear-gradient(135deg, #6a00f4, #c100e1)", // Gradient background
              color: "#fff", // Text color
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              position: "relative",
              display: "inline-block",
              transform: "skewX(-15deg)", // Skew for slanted effect
            }}
          >
            <span
              style={{
                transform: "skewX(15deg)", // Reset text skew
                color: "#ff69b4",
                marginRight: "10px",
              }}
            >
              Start Your Journey
            </span>
            <span
              className="circle"
              style={{
                transform: "skewX(15deg)", // Reset skew for icon
                backgroundColor: "#ff69b4", // Pink background for circle
                borderRadius: "50%",
                padding: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "35px",
                width: "35px",
              }}
            >
              <FaArrowRight style={{ color: "white" }} />
            </span>
          </Link>
        </div>
      </div>

      {/* CSS for hover and dynamic effect */}
      <style>
        {`
          .custom-button:hover {
            transform: scale(1.05) skewX(-15deg); /* Enlarge on hover */
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          }

          .circle {
            transition: background-color 0.3s ease;
          }

          .custom-button:hover .circle {
            background-color: #f40986; /* Change circle color on hover */
          }
        `}
      </style>
    </div>
  );
};

export default Home;
