import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Reusable Card Component
const CourseCard = ({ course }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{course.CourseName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{course.CourseCode}</h6>
          <p className="card-text">Level: {course.Level}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
