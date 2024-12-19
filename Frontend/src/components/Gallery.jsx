import React, { useEffect, useRef, useState } from "react";

const Gallery = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);

  // Intersection Observer to detect when the gallery section is in view
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

  // Intersection Observer for each individual image
  useEffect(() => {
    imageRefs.current.forEach((imageRef, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-from-bottom");
            entry.target.style.animationDelay = `${index * 0.3}s`; // Add delay for staggered effect
          }
        },
        { threshold: 0.1 }
      );
      if (imageRef) observer.observe(imageRef);
      return () => observer.disconnect();
    });
  }, []);

  return (
    <div
      className="section py-5"
      ref={sectionRef}
      style={{
        backgroundColor: "#f8f9fa", // Optional: Add a background color for contrast
      }}
    >
      <div className="container">
        <div className="row">
          {/* Left Column: Big photo */}
          <div className="col-lg-6 py-2">
            <div
              className="hover-zoom"
              ref={(el) => (imageRefs.current[0] = el)}
              style={{
                height: "516px",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <img
                src="/assets/Gallery/2.jpg"
                alt="Big photo"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          {/* Right Column: Small photos */}
          <div className="col-lg-6">
            <div className="row justify-content-around">
              {[1, 3, 4, 5].map((num, index) => (
                <div className="col-6 px-2 py-2" key={num}>
                  <div
                    className="hover-zoom"
                    ref={(el) => (imageRefs.current[index + 1] = el)}
                    style={{
                      height: "250px",
                      borderRadius: "15px",
                      overflow: "hidden",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <img
                      src={`/assets/Gallery/${num}.jpg`}
                      alt={`Photo ${num}`}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect CSS */}
      <style>
        {`
          .hover-zoom {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-zoom:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          }

          .animate-from-bottom {
            transform: translateY(60px);
            opacity: 0;
            animation: slide-up 1.8s ease-out forwards; /* Increased animation duration */
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
  );
};

export default Gallery;
