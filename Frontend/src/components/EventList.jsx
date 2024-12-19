import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import axios from "axios";
import "./MainPage.css"; // Reuse MainPage CSS for buttons

export default function EventList() {
  const [formData, setFormData] = useState({
    type: "",
    host: "",
    location: "",
    date: "",
    description: "",
  });

  const [activeButton, setActiveButton] = useState("listEvent");
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "home") {
      navigate("/mainpage");
    } else if (buttonName === "myevents") {
      navigate("/myevents");
    } else if (buttonName === "profile") {
      navigate("/profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/events", formData);
      console.log("Event Created:", response.data);
      alert("Event created successfully!");
      setFormData({
        type: "",
        host: "",
        location: "",
        date: "",
        description: "",
        live:"",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="main-page-container">
        {/* Sidebar Buttons */}
        <div className="side-buttons">
          <button
            className={`main-button ${activeButton === "home" ? "active" : ""}`}
            onClick={() => handleButtonClick("home")}
          >
            <i className="fas fa-home"></i> Home
          </button>
          <button
            className={`main-button ${activeButton === "listEvent" ? "active" : ""}`}
            onClick={() => handleButtonClick("listEvent")}
          >
            <i className="fas fa-calendar-plus"></i> List an Event
          </button>
          <button
            className={`main-button ${activeButton === "myevents" ? "active" : ""}`}
            onClick={() => handleButtonClick("myevents")}
          >
            <i className="fas fa-calendar-check"></i> My Events
          </button>
          <button
            className={`main-button ${activeButton === "profile" ? "active" : ""}`}
            onClick={() => handleButtonClick("profile")}
          >
            <i className="fas fa-user-cog"></i> Profile
          </button>
        </div>

        {/* Main Content Section */}
        <div className="main-content p-5">
          {/* Event Form Section */}
          <div className="event-form-section">
            <h2
              className="text-center"
              style={{
                fontSize: "2.5rem",
                color: "#2d2d2d",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Host Your <span style={{ color: "#f473c4" }}>Event</span>
            </h2>
            <form className="event-form" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="eventType" className="form-label">
                  Event Type
                </label>
                <select
                  className="form-control"
                  id="eventType"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select an Event Type
                  </option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Concert">Concert</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Festival">Festival</option>
                  <option value="Networking Event">Networking Event</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Sports Event">Sports Event</option>
                  <option value="Fundraiser">Fundraiser</option>
                  <option value="Community Gathering">Community Gathering</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="host" className="form-label">
                  Organizer Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="host"
                  name="host"
                  placeholder="Organizer's Name"
                  value={formData.host}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="location" className="form-label">
                  Event Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  placeholder="Event Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="date" className="form-label">
                  Event Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">
                  Event Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
