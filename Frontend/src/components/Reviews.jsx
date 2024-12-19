import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const Reviews = () => {
  const reviews = [
    { name: "John Doe", text: "Flawless organization and great attention to detail!", rating: 5 },
    { name: "Jane Smith", text: "Amazing service! The team went above and beyond.", rating: 4.5 },
    { name: "Mike Johnson", text: "The decorations were stunning and on time.", rating: 5 },
    { name: "Emily Davis", text: "Professional and friendly staff. Highly recommend.", rating: 4 },
    { name: "Chris Brown", text: "Exceptional sound and lighting setup!", rating: 4.8 },
    { name: "Sarah Wilson", text: "The catering was delicious and perfectly managed.", rating: 5 },
  ];

  return (
    <div
      id="reviews"
      className="py-5"
      style={{
        backgroundColor: "#f5fbfa", // Light pastel background
      }}
    >
      <div className="container">
        <h2
          className="text-center fw-bold mb-4"
          style={{
            fontSize: "2.5rem",
            color: "#2d2d2d", // Dark gray for headings
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Customer <span style={{ color: "#f473c4" }}>Reviews</span>
        </h2>
        <div
          className="review-slider"
          style={{
            display: "flex",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            className="review-track"
            style={{
              display: "flex",
              animation: "scroll 15s linear infinite",
              width: `calc(300px * ${reviews.length * 2})`, // Dynamically set track width
            }}
          >
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={index}
                className="review-card"
                style={{
                  minWidth: "300px",
                  maxWidth: "300px",
                  margin: "0 15px",
                  height: "200px",
                  background: "#ffffff", // White background for cards
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    fontStyle: "italic",
                    color: "#555",
                  }}
                >
                  "{review.text}"
                </p>
                <h5
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "600",
                    color: "#2d2d2d",
                  }}
                >
                  - {review.name}
                </h5>
                <div
                  className="rating"
                  style={{
                    fontSize: "1.2rem",
                    color: "#f473c4", // Highlight color
                  }}
                >
                  {"★".repeat(Math.floor(review.rating)) +
                    (review.rating % 1 !== 0 ? "☆" : "")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0); /* Start at the beginning */
            }
            100% {
              transform: translateX(-50%); /* Scroll to halfway point */
            }
          }

          .review-slider {
            height: 230px; /* Increased height for larger cards */
          }

          .review-card {
            flex: none; /* Prevents cards from shrinking */
          }

          .review-track {
            display: flex;
            flex-wrap: nowrap;
          }
        `}
      </style>
    </div>
  );
};

export default Reviews;
