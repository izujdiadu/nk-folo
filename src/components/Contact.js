import React, { useRef, useEffect, useCallback } from "react";
import "../styles/Contact.css";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

function Contact() {
  const lineRef = useRef(null);
  const oopsRef = useRef(null);
  const forgotRef = useRef(null);
  const h3Ref = useRef(null);

  const getResponsiveFontSize = useCallback((screenWidth) => {
    if (screenWidth <= 480) {
      return 20; // Téléphones
    } else if (screenWidth <= 768) {
      return 40; // Tablettes
    } else if (screenWidth <= 1024) {
      return 60; // Petits écrans
    } else {
      return 120; // Grands écrans
    }
  }, []);

  // Ref pour éviter des appels multiples
  const tickingRef = useRef(false);

  const updateFontStyles = useCallback(() => {
    const screenWidth = window.innerWidth;
    const fontSize = getResponsiveFontSize(screenWidth);

    if (oopsRef.current) {
      const rect = oopsRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
      const newFontSize = fontSize + (100 - fontSize) * progress;
      oopsRef.current.style.fontSize = `${newFontSize}px`;
      oopsRef.current.style.color = progress > 0.5 ? "white" : "transparent";
    }

    if (forgotRef.current) {
      const rect = forgotRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
      const newFontSize = fontSize + (100 - fontSize) * progress;
      forgotRef.current.style.fontSize = `${newFontSize}px`;
      forgotRef.current.style.color = progress > 0.5 ? "white" : "transparent";
    }

    if (h3Ref.current) {
      const rect = h3Ref.current.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
      const newFontSize = fontSize + (100 - fontSize) * progress;
      h3Ref.current.style.fontSize = `${newFontSize}px`;
    }
    tickingRef.current = false;
  }, [getResponsiveFontSize]);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      window.requestAnimationFrame(updateFontStyles);
    }
  }, [updateFontStyles]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Première exécution au montage
    updateFontStyles();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, updateFontStyles]);

  useEffect(() => {
    const lineElement = lineRef.current;
    if (!lineElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            lineElement.classList.add("animate");
            observer.unobserve(lineElement);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(lineElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="contact" className="contact-container">
      <div className="contact-tab">
        <div className="contact-title">
          <h1>I GUESS THAT'S IT</h1>
          <h2 ref={oopsRef}>OOPsS..</h2>
          <h2 ref={forgotRef}>FORGOT ONE THING</h2>
          <h3 ref={h3Ref}>
            <span id="blue">CONTACT ME DOWN BELOW!</span>
          </h3>
        </div>
        <div className="line" ref={lineRef}>
          <div className="icons">
            <a href="https://github.com/izujdiadu" target="_blank" rel="noopener noreferrer">
              <FaGithub className="icon" />
            </a>
            <a href="mailto:nngkvl@gmail.com">
              <FaEnvelope className="icon" />
            </a>
            <a href="https://www.linkedin.com/in/noa-kivuila-190135220/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
          </div>
          <h1 className="end-message">MY BAD, THAT WAS TOO FAR...</h1>
        </div>
      </div>
    </div>
  );
}

export default Contact;
