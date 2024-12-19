import React, { useState } from "react";
import Navbar from "./Navbar";
import Intro from "./Intro";
import Features from "./Features";
import Gallery from "./Gallery";
import Para from "./Para";
import Services from "./Services";
import Footer from "./Footer";
import LoginModal from "./LoginModal";
import Reviews from "./Reviews";


export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  
  return (
    <div>
      <div className={isLoginOpen ? "blurred-content" : ""}>
        <Navbar onLoginClick={handleLoginOpen} />
        <Intro onLoginClick={handleLoginOpen} />
        <Para />
        <Gallery />
        <Features />
        <Services />
        <Reviews/>
        <Footer />
      </div>

      {isLoginOpen && <LoginModal onClose={handleLoginClose} />}
      
    </div>
  );
}
