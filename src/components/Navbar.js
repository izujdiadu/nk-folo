import React, { useState } from "react";
import "../styles/Navbar.css";
import NKlogo from "../images/NKlogo.png";
import { FaBars, FaTimes } from "react-icons/fa"; // Ajout de FaTimes pour la croix
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  const randomPosition = () => {
    const x = Math.floor(Math.random() * 100) + 1; // Position aléatoire entre 1 et 100
    const y = Math.floor(Math.random() * 100) + 1;
    return { x, y };
  };

  const randomColor = () => {
    const colors = ['#FFD700', '#D32F2F', '#303F9F']; // Choix de couleurs
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleLogoClick = () => {
    const headerHeight = document.querySelector('.navbar-container').offsetHeight;
    // Vérifie si l'utilisateur est déjà en haut de la page
    if (window.scrollY !== 0) {
      window.scrollTo({
        top: -headerHeight, // Décale pour compenser la navbar
        behavior: "smooth"
      });
    }
  };

  // Fonction qui scroll vers la section cible après la fermeture du menu
  const handleMenuItemClick = (sectionId, e) => {
    e.preventDefault();
    setMenuOpen(false); // Ferme le menu
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 500); // Délai pour synchroniser l'animation
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-tab">
          <div className="navbar-logo" onClick={handleLogoClick}>
            <img src={NKlogo} alt="NK Logo" className="nk-logo" />
          </div>
          <div className="navbar-menu" onClick={handleMenuClick}>
            <FaBars className="menu-icon" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            onClick={handleMenuClick}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.5, ease: "easeInOut" } }}
          >
            <div className="menu-content">
              <div className="close-menu" onClick={handleMenuClick}>
                <FaTimes className="close-icon" />
              </div>
              <a
                href="#about"
                className="menu-item"
                onClick={(e) => handleMenuItemClick("about", e)}
                onMouseEnter={(e) => {
                  const { x, y } = randomPosition();
                  const color = randomColor();
                  const word = document.createElement("span");
                  word.textContent = "ABOUT";
                  word.style.position = "absolute";
                  word.style.left = `${x}%`;
                  word.style.top = `${y}%`;
                  word.style.fontSize = "60px";
                  word.style.color = color;
                  word.style.fontWeight = "bold";
                  word.style.zIndex = -99;
                  e.target.appendChild(word);
                }}
              >
                ABOUT
              </a>
              <a
                href="#projects"
                className="menu-item"
                onClick={(e) => handleMenuItemClick("projects", e)}
                onMouseEnter={(e) => {
                  const { x, y } = randomPosition();
                  const color = randomColor();
                  const word = document.createElement("span");
                  word.textContent = "PROJECTS";
                  word.style.position = "absolute";
                  word.style.left = `${x}%`;
                  word.style.top = `${y}%`;
                  word.style.fontSize = "60px";
                  word.style.color = color;
                  word.style.fontWeight = "bold";
                  word.style.zIndex = -99;
                  e.target.appendChild(word);
                }}
              >
                PROJECTS
              </a>
              <a
                href="#languages"
                className="menu-item"
                onClick={(e) => handleMenuItemClick("languages", e)}
                onMouseEnter={(e) => {
                  const { x, y } = randomPosition();
                  const color = randomColor();
                  const word = document.createElement("span");
                  word.textContent = "LANGUAGES";
                  word.style.position = "absolute";
                  word.style.left = `${x}%`;
                  word.style.top = `${y}%`;
                  word.style.fontSize = "60px";
                  word.style.color = color;
                  word.style.fontWeight = "bold";
                  word.style.zIndex = -99;
                  e.target.appendChild(word);
                }}
              >
                LANGUAGES
              </a>
              <a
                href="#contact"
                className="menu-item"
                onClick={(e) => handleMenuItemClick("contact", e)}
                onMouseEnter={(e) => {
                  const { x, y } = randomPosition();
                  const color = randomColor();
                  const word = document.createElement("span");
                  word.textContent = "CONTACT";
                  word.style.position = "absolute";
                  word.style.left = `${x}%`;
                  word.style.top = `${y}%`;
                  word.style.fontSize = "60px";
                  word.style.color = color;
                  word.style.fontWeight = "bold";
                  word.style.zIndex = -99;
                  e.target.appendChild(word);
                }}
              >
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
