import React, { useEffect, useState, useRef } from "react";

const Services = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const services = [
    { name: "Lighting", icon: "🔦" },
    { name: "DJ Services", icon: "🎵" },
    { name: "Catering", icon: "🍴" },
    { name: "Photography", icon: "📸" },
    { name: "Decorations", icon: "🎨" },
    { name: "Venue Management", icon: "🏛️" },
    { name: "Security Services", icon: "🛡️" },
    { name: "Transportation", icon: "🚗" },
    { name: "Sound Systems", icon: "🔊" },
    { name: "Live Performances", icon: "🎤" },
    { name: "Florists", icon: "🌸" },
    { name: "Event Planning", icon: "📝" },
  ];

  return (
    <div
      id="services"
      style={{
        backgroundColor: "#f5fbfa", // Light pastel background to match theme
      }}
    >
      <div ref={sectionRef} className="container py-5">
        <h2
          className={`fw-bold mb-4 text-center ${
            inView ? "animate-heading" : "invisible"
          }`}
          style={{
            fontSize: "2.5rem",
            color: "#2d2d2d", // Dark gray for headings
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Our <span style={{ color: "#f473c4" }}>Services</span>
        </h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`col-12 col-sm-6 col-md-4 col-lg-3 ${
                inView ? `animate-service-${index}` : "invisible"
              }`}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="service-card p-4"
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "280px",
                }}
              >
                <div
                  className="icon mb-3"
                  style={{
                    fontSize: "2.5rem",
                    color: "#f473c4", // Soft pink for icons
                  }}
                >
                  {service.icon}
                </div>
                <h5
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "600",
                    color: "#2d2d2d", // Dark gray for text
                  }}
                >
                  {service.name}
                </h5>
              </div>
            </div>
          ))}
        </div>

        <style>
          {`
          .invisible {
            opacity: 0;
            transform: translateY(100px); /* Start off the page */
          }

          .animate-heading {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.8s ease-out;
          }

          ${services
            .map(
              (_, index) => `
            .animate-service-${index} {
              animation: slide-in 0.8s ease-out ${index * 0.2}s forwards;
            }
          `
            )
            .join("")}

          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateY(100px); /* Start below */
            }
            to {
              opacity: 1;
              transform: translateY(0); /* End at normal position */
            }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Services;
