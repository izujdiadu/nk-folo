import React, { useRef, useState, useEffect } from "react";
import "../styles/Languages.css";
import { motion } from "framer-motion";
import throttle from "lodash.throttle";

// Import des images
import pythonIcon from "../images/python.png";
import pythonBg from "../images/pythonpic2.jpeg";
import jsIcon from "../images/js.png";
import jsBg from "../images/jspic.jpeg";
import wdIcon from "../images/webdlogo.png";
import wdBg from "../images/webdpic.jpeg";
import cyberIcon from "../images/cyberlogo.png";
import cyberBg from "../images/cyberpic.jpeg";
import sqlIcon from "../images/sql.png";
import sqlBg from "../images/sqlpic.jpeg";

const languagesData = [
  {
    id: 0,
    name: "PYTHON",
    icon: pythonIcon,
    description:
      "PYTHON - I MAINLY USE IT FOR DEVELOPING GAMES, TESTING APIS, AND AUTOMATING VARIOUS TASKS.",
    bg: pythonBg,
  },
  {
    id: 1,
    name: "JAVASCRIPT",
    icon: jsIcon,
    description:
      "JAVASCRIPT - I LEVERAGE IT TO BUILD DYNAMIC WEB APPLICATIONS, ENHANCE USER INTERFACES, AND HANDLE CLIENT-SIDE LOGIC.",
    bg: jsBg,
  },
  {
    id: 2,
    name: "Web Design",
    icon: wdIcon,
    description:
      "WEB DESIGN - I SPECIALIZE IN CREATING VISUALLY APPEALING, USER-FRIENDLY WEBSITES USING THE LATEST DESIGN PRINCIPLES AND RESPONSIVE LAYOUTS.",
    bg: wdBg,
  },
  {
    id: 3,
    name: "Cyber Security",
    icon: cyberIcon,
    description:
      "CYBER SECURITY - I FOCUS ON ENSURING THE PROTECTION OF SYSTEMS AND NETWORKS BY IDENTIFYING VULNERABILITIES AND IMPLEMENTING SECURITY MEASURES.",
    bg: cyberBg,
  },
  {
    id: 4,
    name: "Database",
    icon: sqlIcon,
    description:
      "DATABASE - I DESIGN AND MANAGE DATABASES TO EFFICIENTLY STORE, RETRIEVE, AND MANIPULATE DATA USING SQL AND OTHER DATABASE MANAGEMENT SYSTEMS.",
    bg: sqlBg,
  },
];

function Languages() {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [isInView, setIsInView] = useState(false);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const checkIfInView = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setIsInView(rect.top <= windowHeight && rect.bottom >= 0);
    };

    const throttledCheck = throttle(checkIfInView, 100);
    window.addEventListener("scroll", throttledCheck, { passive: true });
    throttledCheck();
    return () => {
      window.removeEventListener("scroll", throttledCheck);
      throttledCheck.cancel();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const updateSections = () => {
      const windowHeight = window.innerHeight;
      const containerTop = container.getBoundingClientRect().top;
      const totalHeight = container.scrollHeight;
      const progress = Math.max(0, -containerTop) / (totalHeight - windowHeight);
      const activeIndex = Math.min(
        languagesData.length - 1,
        Math.floor(progress * languagesData.length)
      );
      const offset = progress * languagesData.length - activeIndex;

      sectionRefs.current.forEach((section, index) => {
        if (index === activeIndex) {
          section.style.transform = `translateY(-${offset * 100}%)`;
          section.style.opacity = 1 - offset;
        } else if (index === activeIndex + 1) {
          section.style.transform = `translateY(${(1 - offset) * 100}%)`;
          section.style.opacity = offset;
        } else {
          section.style.transform = `translateY(0%)`;
          section.style.opacity = 0;
        }
      });
    };

    const throttledUpdate = throttle(updateSections, 100);
    window.addEventListener("scroll", throttledUpdate, { passive: true });
    throttledUpdate();
    return () => {
      window.removeEventListener("scroll", throttledUpdate);
      throttledUpdate.cancel();
    };
  }, []);

  return (
    <div id="languages" className="languages-container">
      <div className="languages-tab">
        <motion.div 
          className="languages-title"
          initial={{ x: "100%", opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>
            I FORGOT... HERE ARE MY <span id="problem">SKILLS</span>
          </h1>
        </motion.div>
      </div>

      <div
        className="subtabs-container"
        ref={containerRef}
        style={{ height: `${languagesData.length * 100}vh` }}
      >
        {languagesData.map((language) => (
          <div
            key={language.id}
            className="languages-subtab"
            ref={addToRefs}
            style={{
              backgroundImage: `url(${language.bg})`,
              position: "absolute",
              top: `${(language.id / languagesData.length) * 100}%`,
              left: 0,
              width: "100%",
              height: "100vh",
              transition: "transform 0.2s linear, opacity 0.2s linear",
            }}
          >
            <div className="languages-subtab-pic">
              <img src={language.icon} alt={language.name} />
            </div>
            <div className="languages-subtab-desc">
              <h2>{language.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;
