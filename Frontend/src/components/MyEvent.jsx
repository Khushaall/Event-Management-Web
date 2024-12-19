import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import axios from "axios"; 
import './MyEvent.css';

export default function MyEvent() {
  const [activeButton, setActiveButton] = useState("myEvents");
  const [liveEvents, setLiveEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/eventssep");
        const allEvents = response.data;

      
        const live = allEvents.filter(event => event.live === true);
        const completed = allEvents.filter(event => event.live === false);

        setLiveEvents(live);
        setCompletedEvents(completed);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === "home") {
      navigate("/mainpage");
    } else if (buttonName === "listEvent") {
      navigate("/eventlist");
    } else if (buttonName === "profile") {
      navigate("/profile");
    }
  };

  const deleteLiveEvent = (eventId) => {
    console.log("Live event deleted with ID:", eventId);
    setLiveEvents(liveEvents.filter(event => event._id !== eventId));
  };

  const deleteCompletedEvent = (eventId) => {
    console.log("Completed event deleted with ID:", eventId);
    setCompletedEvents(completedEvents.filter(event => event._id !== eventId));
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
            className={`main-button ${activeButton === "listEvent" ? "active" : ""}`}
            onClick={() => handleButtonClick("listEvent")}
          >
            <i className="fas fa-calendar-plus"></i> List an Event
          </button>
          <button className="main-button active">
            <i className="fas fa-calendar-check"></i> My Events
          </button>
          <button
            className={`main-button ${activeButton === "profile" ? "active" : ""}`}
            onClick={() => handleButtonClick("profile")}
          >
            <i className="fas fa-user-cog"></i> Profile
          </button>
        </div>

        <div className="main-content p-5">
          <h2 className="text-center" style={{ fontSize: "2.5rem", color: "#2d2d2d", fontFamily: "'Poppins', sans-serif" }}>
            My <span style={{ color: "#f473c4" }}>Events</span>
          </h2>

          {/* Live Events Section */}
          <div className="live-events-section mb-5">
            <h3 className="section-title">Live</h3>
            {liveEvents.length > 0 ? (
              liveEvents.map(event => (
                <div key={event._id} className="live-event-card">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-details"><strong>Host:</strong> {event.host}</p>
                  <p className="event-details"><strong>Location:</strong> {event.location}</p>
                  <p className="event-details"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p className="event-description">{event.description}</p>
                  <button className="delete-live-button" onClick={() => deleteLiveEvent(event._id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No live events available.</p>
            )}
          </div>

          {/* Completed Events Section */}
          <div className="completed-events-section">
            <h3 className="section-title">Completed Events</h3>
            {completedEvents.length > 0 ? (
              completedEvents.map(event => (
                <div key={event._id} className="completed-event-card">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-details"><strong>Host:</strong> {event.host}</p>
                  <p className="event-details"><strong>Location:</strong> {event.location}</p>
                  <p className="event-details"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p className="event-description">{event.description}</p>
                  <button className="delete-completed-button" onClick={() => deleteCompletedEvent(event._id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No completed events available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
