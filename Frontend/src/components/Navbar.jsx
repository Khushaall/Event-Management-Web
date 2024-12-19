import React from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = ({onLoginClick}) => {
  const navigate = useNavigate();

  const Move = ()=>{
    navigate("/login");
  }
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReviews = () => {
    document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient">
      <div className="container">
        {/* Brand Logo */}
        <a className="navbar-brand fw-bold fs-3" href="#">EventSync</a>

        {/* Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
              <button onClick={scrollToAbout} className="nav-link text-uppercase px-3 hover-effect" href="#about">About</button>
            </li>
            <li className="nav-item">
              <button onClick={scrollToServices} className="nav-link text-uppercase px-3 hover-effect" href="#services">Services</button>
            </li>
            
            <li className="nav-item">
              <button onClick={scrollToReviews} className="nav-link text-uppercase px-3 hover-effect" href="#reviews">Reviews</button>
            </li>
            <li className="nav-item">
              <button onClick={scrollToFooter} className="nav-link text-uppercase px-3 hover-effect" href="#contact">Contact Us</button>
            </li>
            <li className="nav-item">
              <button className="btn custom-btn ms-3" onClick={Move}>Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
