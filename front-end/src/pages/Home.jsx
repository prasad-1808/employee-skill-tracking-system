import React from "react";

const Home = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-90">
      <div
        className="card p-4 shadow-sm shadow"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h1 className="display-4 mb-4 text-center">
          Welcome to Expense Tracker
        </h1>
        <p className="lead text-center">
          Track your daily expenses easily and efficiently.
        </p>
      </div>
    </div>
  );
};

export default Home;
