import React, { useEffect, useState, useRef } from "react";

const Footer = () => {
  const [inView, setInView] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 } // Trigger when 30% of the section is in view
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="footer-section pb-0 pt-5"
      style={{
        backgroundColor:"#011126",
        color: "#fff",
        padding: "60px 0",
        fontFamily: "'Poppins', sans-serif",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      <div className="container" id="contact">
        {/* Footer Top Section */}
        <div className="row">
          <div className="col-md-4">
            <h4
              className={`footer-heading ${inView ? "animate-footer-heading" : "invisible"}`}
            >
              EventSync
            </h4>
            <p
              className={`footer-description ${inView ? "animate-footer-description" : "invisible"}`}
            >
              Your ultimate platform for event planning, management, and unforgettable experiences.
            </p>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4 text-start">
            <h5
              className={`footer-heading ${inView ? "animate-footer-heading" : "invisible"}`}
            >
              Contact Info
            </h5>
            <p
              className={`footer-description ${inView ? "animate-footer-description" : "invisible"}`}
            >
              Email: support@eventsync.com
            </p>
            <p
              className={`footer-description ${inView ? "animate-footer-description" : "invisible"}`}
            >
              Phone: +1 (800) 123-4567
            </p>
            <p
              className={`footer-description ${inView ? "animate-footer-description" : "invisible"}`}
            >
              Address: 123 Event St, Celebration City
            </p>
            {/* Social Media Icons */}
            <div className={`footer-icons ${inView ? "animate-footer-icons" : "invisible"}`}>
              <a href="https://facebook.com" className="text-white me-3">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom Section */}
        
        <div className="row justify-content-center mt-5" style={{backgroundColor:"#011126",}}>
        <div className="col-md-12 text-center py-3 px-0">
          <p className={`footer-description ${inView ? "animate-footer-description" : "invisible"}`}>
            &copy; 2024 EventSync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
