import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [activeButton, setActiveButton] = useState("settings");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "home") navigate("/mainpage");
    else if (buttonName === "listEvent") navigate("/eventlist");
    else if (buttonName === "myEvents") navigate("/myevents");
    else if (buttonName === "settings") navigate("/profile");
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/serviceprovider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        alert("Service provider data saved successfully!");
      } else {
        alert(result.message || "Failed to save data!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="main-page-container">
        <div className="side-buttons">
          <button
            className={`main-button ${activeButton === "home" ? "active" : ""}`}
            onClick={() => handleButtonClick("home")}
          >
            <i className="fas fa-home"></i> Home
          </button>
          <button
            className={`main-button ${
              activeButton === "listEvent" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("listEvent")}
          >
            <i className="fas fa-calendar-plus"></i> List an Event
          </button>
          <button
            className={`main-button ${
              activeButton === "myEvents" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("myEvents")}
          >
            <i className="fas fa-calendar-check"></i> My Events
          </button>
          <button
            className={`main-button ${
              activeButton === "settings" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("settings")}
          >
            <i className="fas fa-user-cog"></i> Profile
          </button>
        </div>

        <div className="main-content p-5">
          <h2 className="text-center profile-title">
            Service Provider <span>Profile</span>
          </h2>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name:</label>
              <input
                type="text"
                id="company"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Offered:</label>
              <input
                type="text"
                id="service"
                placeholder="Enter the service you provide"
                value={formData.service}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="profile-submit-button">
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
