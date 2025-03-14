import React, { useRef, useEffect } from "react";
import "../styles/Contact.css";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

function Contact() {
  const lineRef = useRef(null);
  const oopsRef = useRef(null);
  const forgotRef = useRef(null);
  const h3Ref = useRef(null);

  // Fonction pour calculer la taille du texte en fonction de la largeur de l'écran
  const getResponsiveFontSize = (screenWidth) => {
    if (screenWidth <= 480) {
      return 40; // Taille de police pour les téléphones
    } else if (screenWidth <= 768) {
      return 60; // Taille de police pour les tablettes
    } else if (screenWidth <= 1024) {
      return 80; // Taille de police pour les petits écrans
    } else {
      return 120; // Taille de police pour les grands écrans
    }
  };

  // Fonction pour animer les éléments en fonction du scroll
  const handleScroll = () => {
    const screenWidth = window.innerWidth; // Taille de l'écran
    const fontSize = getResponsiveFontSize(screenWidth); // Calcul de la taille du texte selon la taille de l'écran

    // Animation des éléments pendant le scroll
    if (oopsRef.current) {
      const rect = oopsRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
      const newFontSize = fontSize + (100 - fontSize) * progress; // Animation dynamique
      oopsRef.current.style.fontSize = `${newFontSize}px`;
      oopsRef.current.style.color = progress > 0.5 ? "white" : "transparent";
    }

    if (forgotRef.current) {
      const rect = forgotRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
      const newFontSize = fontSize + (100 - fontSize) * progress; // Animation dynamique
      forgotRef.current.style.fontSize = `${newFontSize}px`;
      forgotRef.current.style.color = progress > 0.5 ? "white" : "transparent";
    }

    if (h3Ref.current) {
      const rect = h3Ref.current.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / window.innerHeight, 0), 1);
      const newFontSize = fontSize + (100 - fontSize) * progress; // Animation dynamique
      h3Ref.current.style.fontSize = `${newFontSize}px`;
    }
  };

  // Ajout du listener de scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Applique une première exécution au montage

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation de la ligne via IntersectionObserver
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
