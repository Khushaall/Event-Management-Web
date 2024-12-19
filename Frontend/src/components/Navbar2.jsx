import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar2.css";

const Navbar2 = () => {
  const navigate = useNavigate();

  const Move = () => {
    navigate("/");
  };

  return (
    <nav className="navbar2">
      <div className="navbar2-container">
        {/* Logo on the Left */}
        <div className="navbar2-brand-container">
          <a className="navbar2-brand" href="#">
            <i className="fas fa-calendar-check"></i> Event <span style={{ color: "#f473c4" }}>Sync </span>
          </a>
        </div>

        {/* Centered Heading */}
        <div className="navbar2-heading">
          <h1>EventSync</h1>
        </div>

        {/* Logout Button on the Right */}
        <div className="logout-container">
          <button className="logout-button" onClick={Move}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
