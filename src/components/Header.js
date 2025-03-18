import React, { useEffect, useRef, useState } from "react";
import "../styles/Header.css";
import codingvid from "../videos/codingvid.mp4";
import newvideo from "../images/newvideo.jpeg";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import throttle from "lodash.throttle";

function Header() {
  // On utilise un ref pour détecter si l'écran est mobile
  const isMobileRef = useRef(window.innerWidth <= 480);
  const headerContainerRef = useRef(null);
  const catchphraseRef = useRef(null);
  const creditRef = useRef(null);
  const videoRef = useRef(null);

  // Mettre à jour la détection mobile sur resize
  useEffect(() => {
    const handleResize = () => {
      isMobileRef.current = window.innerWidth <= 480;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateStyles = () => {
      const scrollY = window.scrollY;
      // Calcul de l'opacité et des couleurs en fonction du scroll
      const opacityValue = Math.min(scrollY / 500, 1);
      const r = Math.floor(48 * opacityValue);
      const g = Math.floor(63 * opacityValue);
      const b = Math.floor(159 * opacityValue);

      // Mise à jour du fond du conteneur
      if (headerContainerRef.current) {
        headerContainerRef.current.style.backgroundColor =
          scrollY > 0 ? `rgb(${r}, ${g}, ${b})` : "transparent";
      }
      // Mise à jour du texte (catchphrase et crédit)
      if (catchphraseRef.current) {
        catchphraseRef.current.style.color =
          scrollY > 0 ? `rgb(${255 - r}, ${255 - g}, ${255 - b})` : "#212121";
      }
      if (creditRef.current) {
        creditRef.current.style.color =
          scrollY > 0 ? `rgb(${255 - r}, ${255 - g}, ${255 - b})` : "#212121";
      }

      // Mise à jour du style du média (vidéo ou image)
      if (videoRef.current) {
        if (!isMobileRef.current) {
          // Sur desktop/tablette : effets complets
          const videoOpacity = Math.min(scrollY / 400, 1);
          const videoTransform = `scale(1.1) translateY(${Math.min(
            scrollY / 3,
            100
          )}px) rotate(${scrollY / 30}deg)`;
          const videoBlur = Math.max(5 - scrollY / 50, 0);
          const videoBrightness = Math.min(1 + scrollY / 500, 1.5);
          const videoShadow = `0 0 ${Math.min(scrollY / 3, 30)}px rgba(0, 0, 0, 0.7)`;
          const videoHue = (scrollY / 5) % 360;
          videoRef.current.style.opacity = videoOpacity;
          videoRef.current.style.transform = videoTransform;
          videoRef.current.style.filter = `blur(${videoBlur}px) brightness(${videoBrightness}) hue-rotate(${videoHue}deg)`;
          videoRef.current.style.boxShadow = videoShadow;
        } else {
          // Sur mobile : effets simplifiés
          videoRef.current.style.opacity = 1;
          videoRef.current.style.transform = "scale(1) translateY(0)";
          videoRef.current.style.filter = "none";
          videoRef.current.style.boxShadow = "none";
        }
      }
    };

    const throttledUpdate = throttle(updateStyles, 150);
    window.addEventListener("scroll", throttledUpdate, { passive: true });
    throttledUpdate();
    return () => {
      window.removeEventListener("scroll", throttledUpdate);
      throttledUpdate.cancel();
    };
  }, []);

  return (
    <div className="header-container" ref={headerContainerRef}>
      <div className="header-tab">
        <div className="header-phrase">
          <div className="header-catchphrase" ref={catchphraseRef}>
            <h1>"TO SOLVE THE <span id="problem">PROBLEM</span>, YOU HAVE</h1>
            <h1>TO BE THE <span id="problem">PROBLEM.</span>"</h1>
          </div>
          <div className="header-credit" ref={creditRef}>
            <h2>- IDK.</h2>
          </div>
        </div>

        <div className="header-video" style={{ marginBottom: "80px" }}>
          {isMobileRef.current ? (
            <img
              src={newvideo}
              alt="Header"
              ref={videoRef}
              style={{
                width: "100%",
                height: "auto",
                pointerEvents: "none",
                willChange: "transform, opacity",
              }}
            />
          ) : (
            <video autoPlay muted loop ref={videoRef} style={{ pointerEvents: "none" }}>
              <source src={codingvid} type="video/mp4" />
            </video>
          )}
        </div>

        <div className="header-banderole">
          <div className="banderole-content">
            <span id="item-failure">
              FAILURE <FaTimes className="failure-icon" />
            </span>
            <span id="item-failure">
              FAILURE <FaTimes className="failure-icon" />
            </span>
            <span id="item-failure">
              FAILURE <FaTimes className="failure-icon" />
            </span>
            <span id="item-success">
              SUCCESS <FaCheckCircle className="success-icon" />
            </span>
            <span id="item-failure">
              FAILURE <FaTimes className="failure-icon" />
            </span>
            <span id="item-failure">
              FAILURE <FaTimes className="failure-icon" />
            </span>
            <span id="item-failure">
              FAILURE <FaTimes className="failure-icon" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
