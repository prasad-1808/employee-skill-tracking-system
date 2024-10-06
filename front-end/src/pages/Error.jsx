import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-90">
      <div
        className="card p-4 shadow-sm shadow"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h1 className="display-4 mb-4 text-center">Sorry! Page Not Found</h1>
        <div className="text-center mt-4">
          <Link
            to="/"
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
              Home Page
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
    </div>
  );
};

export default Home;
