import React, { useEffect, useRef, useState } from "react";

const Para = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer to detect when the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section px-0 py-5" style={{ overflow: "hidden",backgroundColor: "#f5fbfa",  }}>
      <div ref={sectionRef} className="container-lg about-section py-5 px-3">
        <div id="about" className="row align-items-center">
          {/* Left Section */}
          <div
            className={`col-12 col-md-6 mb-4 mb-md-0 ${inView ? "animate-from-bottom" : "invisible"}`}
          >
            <h2
              className="about-heading"
              style={{
                fontWeight: "bold",
                fontSize: "2.5rem",
                color: "#343a40",
              }}
            >
              About EventSync
            </h2>
            <p
              className="about-text mt-3"
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.8",
                color: "#6c757d",
              }}
            >
              EventSync is your ultimate partner in organizing, managing, and synchronizing events
              effortlessly. From small gatherings to grand celebrations, we ensure everything is
              seamless and unforgettable. We provide a platform where users can manage events of any
              size, ensuring a smooth experience from start to finish.
            </p>
          </div>

          {/* Right Section */}
          <div
            className={`col-12 col-md-6 stats-container ${inView ? "animate-from-bottom delay-2" : "invisible"}`}
          >
            <div className="row text-center">
              {/* Stats Boxes */}
              {[ 
                { value: "1000+", label: "Events Hosted", color: "#007bff" },
                { value: "4.9/5", label: "User Ratings", color: "#28a745" },
                { value: "200k+", label: "Happy Users", color: "#ffc107" },
                { value: "500+", label: "Service Providers", color: "#6f42c1" },
                { value: "98%", label: "Customer Satisfaction", color: "#e83e8c" },
                { value: "24/7", label: "Customer Support", color: "#17a2b8" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`col-6 col-md-4 mb-3  ${inView ? `animate-from-bottom delay-${index + 3}` : "invisible"}`}
                >
                  <div
                    className="stat-box p-4 rounded"
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3
                      className="stat-value mb-2"
                      style={{
                        fontSize: "1.8rem",
                        color: stat.color,
                        fontWeight: "bold",
                      }}
                    >
                      {stat.value}
                    </h3>
                    <p
                      className="stat-label"
                      style={{ fontSize: "1rem", color: "#6c757d" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inline Styles for Animations */}
        <style>
          {`
            .animate-from-bottom {
              transform: translateY(50px);
              opacity: 0;
              animation: slide-up 1s ease-out forwards; /* Increased duration for smoother effect */
            }

            .invisible {
              opacity: 0;
            }

            .delay-1 {
              animation-delay: 0.3s; /* Adjusted delay */
            }
            .delay-2 {
              animation-delay: 0.6s; /* Adjusted delay */
            }
            .delay-3 {
              animation-delay: 0.9s; /* Adjusted delay */
            }
            .delay-4 {
              animation-delay: 1.2s; /* Adjusted delay */
            }
            .delay-5 {
              animation-delay: 1.5s; /* Adjusted delay */
            }

            @keyframes slide-up {
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Para;
