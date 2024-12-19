import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import './MainPage.css';
import axios from "axios";

export default function MainPage() {
  const [events, setEvents] = useState([]); // Initialize events state
  const [activeButton, setActiveButton] = useState("home");
  const [interestedEvents, setInterestedEvents] = useState({}); // Track button state per event
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors during API call

  const navigate = useNavigate();

  // Fetch events from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        setEvents(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Error fetching events."); 
        setLoading(false);
      });
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "myevents") {
      navigate("/myevents");
    } else if (buttonName === "profile") {
      navigate("/profile");
    }
    else if (buttonName === "singleservice") {
      navigate("/singleservice");
    }
  };

  const handleListEventClick = () => {
    navigate("/eventlist");
  };

  const handleInterestedClick = (eventId) => {
    // Toggle the button state (just for UI purposes)
    setInterestedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId], // Toggle state
    }));
  
    // Make the API request to add the user to the event's serviceProviderIds
    axios
      .post(`http://localhost:5000/api/events/${eventId}/participate`)
      .then((response) => {
        console.log("User added to event:", response.data.message);
      })
      .catch((error) => {
        console.error("Error adding user to event:", error.response?.data?.message || error);
      });
  };
  
  

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            onClick={handleListEventClick}
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
            <i className="fas fa-calendar-check"></i> Single Services
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
          <div className="live-events-section text-center">
            <h2
              style={{
                fontSize: "2.5rem",
                color: "#2d2d2d",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Live <span style={{ color: "#f473c4" }}>Events</span>
            </h2>
            <div className="event-cards-container">
              {events.length === 0 ? (
                <p>No events available at the moment.</p>
              ) : (
                events.map((event) => (
                  <div className="event-card" key={event._id}>
                    <h2 className="">{event.type}</h2>
                    <p className="pbg  py-2">{event.description}</p>
                    <p><b>Hosted by:</b> {event.host}</p>
                    <p><b>Location:</b> {event.location}</p>
                    <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
                    <button
                      className={`event-button ${interestedEvents[event._id] ? "participated" : ""}`}
                      onClick={() => handleInterestedClick(event._id)}
                    >
                      {interestedEvents[event._id] ? (
                        <span className="tick">&#10003; Participated</span>
                      ) : (
                        "Participate Now"
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
