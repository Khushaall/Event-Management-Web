import React from 'react';

const Intro = ({onLoginClick}) => {
  return (
    <div className="container-fluid intro-container d-flex align-items-center py-0 px-0">
      {/* Row to hold both sections */}
      <div className="row w-100 mx-0 h-100">

        <div className="col-2 d-none d-xxl-block"></div>
        {/* Left Section (contained inside container-lg) */}
        <div className="left-section text-center text-container col-12 col-xxl-5 container-lg">
          <h1 className="intro-heading">Welcome, <br />to EventSync</h1>
          <p className="intro-text">
            Your one-stop solution for managing and synchronizing unforgettable events.
          </p>
          <button
            onClick={onLoginClick}
            className="btn intro-btn py-0 px-0 mx-auto"
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = 'black';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              const arrow = e.target.querySelector('span');
              if (arrow) {
                arrow.style.backgroundColor="transparent";
                arrow.style.color="black";     
                arrow.style.transform = 'translateX(5px)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'black';
              e.target.style.color = 'white';
              e.target.style.boxShadow = 'none';
              const arrow = e.target.querySelector('span');
              if (arrow) {
                arrow.style.backgroundColor="transparent";
                arrow.style.color="white";     
                arrow.style.transform = 'translateX(0)';
              }
            }}
          >
            Explore Now
            <span className="fs-3" style={{ marginLeft: '8px', transition: 'transform 0.3s ease' }}>&#8594;</span> {/* Right arrow */}
          </button>
        </div>

        {/* Right Section (stays in container-fluid, full width) */}
        <div className="right-section col-12 col-xxl-5 p-0 position-relative overflow-hidden h-100">
          <img
            src="assets/Gallery/intro.jpg"
            alt="Event"
            className="img-fluid w-100 h-100 object-fit-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
