import React, { useEffect, useState, useRef } from "react";

const Features = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 } // Increased threshold to trigger earlier
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Discover Perfect Matches",
      description: "Find ideal event venues, hosts, and service providers effortlessly.",
      icon: "fa-search",
    },
    {
      title: "Seamless Booking",
      description: "Book services with instant confirmations and real-time availability.",
      icon: "fa-calendar-check",
    },
    {
      title: "Customizable Options",
      description: "Tailor your event to perfection with wide customization options.",
      icon: "fa-sliders-h",
    },
    {
      title: "Real-Time Notifications",
      description: "Stay informed with instant notifications for bookings and updates.",
      icon: "fa-bell",
    },
    {
      title: "Secure Payments",
      description: "Enjoy hassle-free, secure payments for all transactions.",
      icon: "fa-lock",
    },
    {
      title: "24/7 Customer Support",
      description: "Get assistance anytime from our dedicated support team.",
      icon: "fa-headset",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="features-section pt-4"
      style={{
        background: "linear-gradient(to right, #f5fbf9 0%, #f5fbf9 100%)",
        padding: "3rem 0",
      }}
    >
      <div className="container " >
        {/* Section Heading */}
        <h2
          className={`text-center fw-bold mb-5 section-heading ${inView ? "animate-heading" : "invisible"}`}
          style={{ color: "black", fontSize: "2.5rem" }}
        >
          Why Choose Us
        </h2>
        <div className="row">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`col-md-6 mb-4 feature-card-container ${inView ? `animate-feature-${index}` : "invisible"}`}
            >
              <div
                className="feature-card p-4 h-100 d-flex align-items-center"
                style={{
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.5s ease",
                  background: "#ffffff",
                }}
              >
                {/* Circular Background Icon */}
                <div
                  className="icon-wrapper d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    flexShrink: 0,
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <i
                    className={`fa ${feature.icon} icon`}
                    style={{
                      fontSize: "1.8rem",
                      color: "#ed5b91",
                      transition: "color 0.3s ease",
                    }}
                  ></i>
                </div>
                {/* Text Section */}
                <div>
                  <h4 className="fw-semibold text-dark">{feature.title}</h4>
                  <p className="text-secondary">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .invisible {
            opacity: 0;
            transform: translateY(70px);
          }

          .feature-card-container {
            transition: all 1.8s ease-out; /* Increased transition duration */
          }

          .section-heading {
            transition: all 1.8s ease-out; /* Increased transition duration */
          }

          ${Array.from({ length: 6 }, (_, index) => {
            return `
              .animate-feature-${index} {
                animation: fade-in 1.5s ease-out ${index * 0.7}s forwards; /* Increased delay for earlier appearance */
              }
            `;
          }).join("")}

          .animate-heading {
            animation: fade-in 1.8s ease-out 0s forwards; /* Increased duration for heading */
          }

          @keyframes fade-in {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .feature-card {
            transition: background-color 0.3s ease;
          }

          .feature-card:hover {
            background: linear-gradient(to right, #ed5b91, #f79dba); /* Gradient on hover */
            color: #ffffff; /* Make text white on hover */
          }

          .feature-card:hover .icon-wrapper {
            background-color: #ed5b91;
          }

          .feature-card:hover .icon {
            color: #ffffff;
          }
        `}
      </style>
    </div>
  );
};

export default Features;
