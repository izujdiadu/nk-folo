import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import codingvid from "../videos/codingvid.mp4";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

function Header() {
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [textColor, setTextColor] = useState("#212121");  // Couleur du texte
  const [isVisible, setIsVisible] = useState(false);
  const [videoStyle, setVideoStyle] = useState({
    opacity: 0,
    transform: "scale(1.1)", // Taille augmentée à 110%
    filter: "blur(5px) brightness(0.5)",
    boxShadow: "0 0 30px rgba(0, 0, 0, 0.7)",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacityValue = Math.min(scrollY / 500, 1);

      const r = Math.floor(48 * opacityValue);
      const g = Math.floor(63 * opacityValue);
      const b = Math.floor(159 * opacityValue);

      if (scrollY > 0) {
        setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
        // Plus on descend, plus le texte devient blanc
        setTextColor(`rgb(${255 - r}, ${255 - g}, ${255 - b})`);
      } else {
        setBackgroundColor("transparent");
        setTextColor("#212121"); // Retour à la couleur d'origine
      }

      // Effet vidéo avec taille augmentée et flou modéré
      const videoOpacity = Math.min(scrollY / 400, 1);
      const videoTransform = `scale(1.1) translateY(${Math.min(scrollY / 3, 100)}px) rotate(${scrollY / 30}deg)`; // Taille augmentée à 110%
      const videoBlur = Math.max(5 - scrollY / 50, 0);
      const videoBrightness = Math.min(1 + scrollY / 500, 1.5);
      const videoShadow = `0 0 ${Math.min(scrollY / 3, 30)}px rgba(0, 0, 0, 0.7)`; // Ombre douce

      // Effet de saturation et teinte
      const videoHue = (scrollY / 5) % 360;

      setVideoStyle({
        opacity: videoOpacity,
        transform: videoTransform,
        filter: `blur(${videoBlur}px) brightness(${videoBrightness}) hue-rotate(${videoHue}deg)`,
        boxShadow: videoShadow,
      });
    };

    window.addEventListener("scroll", handleScroll);

    setIsVisible(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="header-container" style={{ backgroundColor: backgroundColor }}>
      <div className="header-tab">
        <div className="header-phrase">
          <div className={`header-catchphrase ${isVisible ? 'animate' : ''}`} style={{ color: textColor }}>
            <h1>"TO SOLVE THE <span id="problem">PROBLEM</span>, YOU HAVE</h1>
            <h1>TO BE THE <span id="problem">PROBLEM.</span>"</h1>
          </div>
          <div className="header-credit" style={{ color: textColor }}>
            <h2>- IDK.</h2>
          </div>
        </div>

        <div className="header-video" style={videoStyle}>
          <video autoPlay muted loop>
            <source src={codingvid} type="video/mp4" />
          </video>
        </div>

        <div className="header-banderole">
          <div className="banderole-content">
            <span id="item-failure">FAILURE <FaTimes className="failure-icon" /></span>
            <span id="item-failure">FAILURE <FaTimes className="failure-icon" /></span>
            <span id="item-failure">FAILURE <FaTimes className="failure-icon" /></span>
            <span id="item-success">SUCCESS <FaCheckCircle className="success-icon" /></span>
            <span id="item-failure">FAILURE <FaTimes className="failure-icon" /></span>
            <span id="item-failure">FAILURE <FaTimes className="failure-icon" /></span>
            <span id="item-failure">FAILURE <FaTimes className="failure-icon" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
