import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import "./MainPage.css";
import "./SingleService.css";

export default function SingleService() {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("singleservice");
  const [showServices, setShowServices] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [chatProvider, setChatProvider] = useState(null); // State for the chat

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "home") {
      navigate("/mainpage");
    } else if (buttonName === "myevents") {
      navigate("/myevents");
    } else if (buttonName === "profile") {
      navigate("/profile");
    } else if (buttonName === "listEvent") {
      navigate("/eventlist");
    }
  };

  const services = [
    "Catering",
    "Photography",
    "Decor",
    "Music",
    "Transport",
    "Venue",
    "DJ",
    "Lighting",
    "Flowers",
    "Sound Systems",
    "Bartending",
    "Security",
    "Makeup Artist",
    "Event Planners",
  ];

  const serviceProviders = Array.from({ length: 20 }, (_, index) => ({
    name: `Service Provider ${index + 1}`,
    service: services[Math.floor(Math.random() * services.length)],
    rating: (Math.random() * (5 - 3) + 3).toFixed(1),
    availability: Math.random() > 0.5 ? "Available" : "Booked",
  }));

  const filteredProviders = selectedService
    ? serviceProviders.filter((provider) => provider.service === selectedService)
    : serviceProviders;

  return (
    <>
      <Navbar2 />
      <div className="main-page-container">
        {/* Vertical Buttons */}
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
            className={`main-button ${activeButton === "singleservice" ? "active" : ""}`}
            onClick={() => handleButtonClick("singleservice")}
          >
            <i className="fas fa-concierge-bell"></i> Single Services
          </button>
          <button
            className={`main-button ${activeButton === "profile" ? "active" : ""}`}
            onClick={() => handleButtonClick("profile")}
          >
            <i className="fas fa-user-cog"></i> Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="live-events-section">
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#2d2d2d",
                fontFamily: "'Poppins', sans-serif",
                textAlign: "center", // Center the heading
              }}
            >
              Single <span style={{ color: "#f473c4" }}>Services</span>
            </h2>

            {/* Toggle Services */}
            <button
              className="toggle-button"
              onClick={() => {
                setShowServices((prev) => !prev);
                setSelectedService(null); // Reset selection when toggling
              }}
            >
              {showServices ? "Hide Services" : "Show Services"}
            </button>

            {showServices && (
              <div className="services-buttons-container">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className={`service-button ${
                      selectedService === service ? "active-service" : ""
                    }`}
                    onClick={() =>
                      setSelectedService(selectedService === service ? null : service)
                    }
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}

            {/* Reset Button */}
            {selectedService && (
              <button
                className="reset-button"
                onClick={() => setSelectedService(null)}
              >
                Reset Services
              </button>
            )}

            {/* Service Providers */}
            <div className="service-providers-container">
              {filteredProviders.map((provider, index) => (
                <div className="provider-card" key={index}>
                  <div className="provider-avatar">
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        Math.random() > 0.5 ? "men" : "women"
                      }/${index + 1}.jpg`}
                      alt={`${provider.name}`}
                    />
                  </div>
                  <div className="provider-info">
                    <h3>{provider.name}</h3>
                    <p>
                      <b>Service:</b> {provider.service}
                    </p>
                    <p>
                      <b>Rating:</b> ⭐ {provider.rating}
                    </p>
                    <p>
                      <b>Status:</b> {provider.availability}
                    </p>
                    <button
                      className="contact-button"
                      onClick={() => setChatProvider(provider)}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ChatBox */}
      {chatProvider && (
        <ChatBox
          provider={chatProvider}
          onClose={() => setChatProvider(null)}
        />
      )}

      <Footer />
    </>
  );
}
