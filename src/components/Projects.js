import React, { useState, useEffect } from "react";
import "../styles/Projects.css";
import ControllerPic from "../images/controller.png";
import PythonPic from "../images/pythonpic.jpeg";
import python from "../images/python.png";
import ecommerce from "../images/ecommerce.png";
import react from "../images/react.png";
import app from "../images/app.png";
import ecommercepic from "../images/ecommercepic.jpeg";
import php from "../images/php.png";
import reactpic from "../images/reactpic.jpeg";
import apppic from "../images/apppic.jpeg";
import java from "../images/java.png";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const projectData = [
  {
    id: 0,
    title: "PYGAME VIDEO GAME",
    imagePic: ControllerPic,
    screenshot: PythonPic,
    description:
      "A FULL PYGAME VIDEO GAME INSPIRED BY ONE OF MY FAVORITE ANIMATED SERIES — MY FIRST MAJOR PROJECT!",
    languages: python,
  },
  {
    id: 1,
    title: "E-COMMERCE WEBSITE",
    imagePic: ecommerce,
    screenshot: ecommercepic,
    description:
      "A FULLY FUNCTIONAL E-COMMERCE PLATFORM FEATURING A USER-FRIENDLY INTERFACE, SECURE PAYMENT INTEGRATION, AND AN ADMIN DASHBOARD FOR PRODUCT MANAGEMENT.",
    languages: php,
  },
  {
    id: 2,
    title: "REACT APP",
    imagePic: react,
    screenshot: reactpic,
    description:
      "A DYNAMIC SINGLE-PAGE APPLICATION BUILT WITH REACT, FEATURING SMOOTH ANIMATIONS, STATE MANAGEMENT, AND AN INTERACTIVE USER EXPERIENCE.",
    languages: react,
  },
  {
    id: 3,
    title: "MOBILE APP",
    imagePic: app,
    screenshot: apppic,
    description:
      "A CROSS-PLATFORM MOBILE APPLICATION DEVELOPED TO ENHANCE USER PRODUCTIVITY, FEATURING REAL-TIME DATA SYNCHRONIZATION AND A RESPONSIVE UI.",
    languages: java,
  },
];

function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [showDesc, setShowDesc] = useState(false);
  
  // États pour le titre et le fond
  const [titlePosition, setTitlePosition] = useState(0); 
  const [backgroundWidth, setBackgroundWidth] = useState(0); 

  // Optimisation du scroll avec requestAnimationFrame et listener passif
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Modification ici : ajustement selon la largeur de l'écran
          const position = window.innerWidth <= 480 ? scrollY / 8 : scrollY / 10;
          setTitlePosition(position);
          const newWidth = Math.min(scrollY / 3, 100);
          setBackgroundWidth(newWidth);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = projectData[currentProject];

  // Vous pouvez désormais utiliser titlePosition directement, sans ajustement additionnel
  // ou conserver un ajustement minimal si besoin.
  const adjustedTitlePosition = titlePosition;

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        delay: 0.3,
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleNextProject = () => {
    if (!showDesc) {
      setCurrentProject((prev) => (prev + 1) % projectData.length);
    } else {
      setShowDesc(false);
      setTimeout(() => {
        setCurrentProject((prev) => (prev + 1) % projectData.length);
        setShowDesc(true);
      }, 300);
    }
  };

  return (
    <div id="projects" className="projects-container">
      <div className="projects-tab">
        <div
          className="projects-title"
          style={{
            transform: `translateX(${adjustedTitlePosition}px)`,
            backgroundColor: "#D32F2F",
            width: `${backgroundWidth}%`,
            transition: "width 0.3s ease",
          }}
        >
          <h1>MY PROJECTS</h1>
        </div>

        <div className="projects-subtab">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              className="projects-subtab-img"
              onClick={() => setShowDesc(true)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.5, ease: "easeInOut" } }}
            >
              <img src={project.imagePic} alt="Project" />
            </motion.div>
          </AnimatePresence>

          <div className="projects-subtab-title">
            <h2>
              <span id="yellow">
                {project.title.split(" ")[0]}
              </span>{" "}
              {project.title.split(" ").slice(1).join(" ")}
            </h2>
          </div>

          <motion.span
            id="scroll"
            onClick={handleNextProject}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              opacity: showDesc ? 0 : 1,
              transform: showDesc ? "translateX(20px)" : "translateX(0)",
              transition: { duration: 0.3 },
            }}
          >
            &#8250;
          </motion.span>

          <AnimatePresence>
            {showDesc && (
              <motion.div
                className="projects-animated-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="projects-subtab-pic"
                  variants={childVariants}
                >
                  <img src={project.screenshot} alt="Project Screenshot" />
                </motion.div>

                <motion.div
                  className="projects-subtab-desc"
                  variants={childVariants}
                >
                  <h3>
                    {project.description.split(" — ")[0]} —{" "}
                    <span id="white">
                      {project.description.split(" — ")[1]}
                    </span>
                  </h3>
                </motion.div>

                <motion.div
                  className="projects-subtab2"
                  variants={childVariants}
                >
                  <div className="projects-subtab2-lang">
                    <h2>PROGRAMMING LANGUAGES:</h2>
                    <img src={project.languages} alt="Project Language" />
                  </div>
                  <div className="projects-subtab2-carousel">
                    <h2>PROJECT GALLERY:</h2>
                  </div>
                </motion.div>

                <motion.div
                  className="desc-close"
                  variants={childVariants}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={() => setShowDesc(false)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <FaTimes size={40} color="white" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Projects;
