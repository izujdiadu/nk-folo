import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/About.css";
import CatchGame from "./CatchGame";
import throttle from "lodash.throttle";

function AnimatedText({ text, progress }) {
  const { words, thresholds } = useMemo(() => {
    const wordsArr = text.split(" ");
    return {
      words: wordsArr,
      thresholds: wordsArr.map(() => Math.random()),
    };
  }, [text]);

  return (
    <span>
      {words.map((word, i) => {
        const threshold = thresholds[i];
        const style = {
          transition: "color 0.3s ease",
          color: progress >= threshold ? "white" : "transparent",
          WebkitTextStroke: progress >= threshold ? "0px" : "1px white",
        };
        return (
          <span key={i} style={style}>
            {word}{" "}
          </span>
        );
      })}
    </span>
  );
}

function About() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  
  // Mettre à jour les styles directement via refs pour éviter les re-renders
  useEffect(() => {
    const updateStyles = () => {
      const scrollY = window.scrollY;
      const titlePos = window.innerWidth <= 480 ? scrollY / 8 : scrollY / 10;
      const bgWidth = Math.min(scrollY / 3, 100);
      if (titleRef.current) {
        titleRef.current.style.transform = `translateX(${titlePos}px)`;
        titleRef.current.style.width = `${bgWidth}%`;
      }
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = rect.height;
        const tBg = Math.min(Math.max((containerHeight - rect.bottom) / containerHeight, 0), 1);
        const start = { r: 48, g: 63, b: 159 };
        const end = { r: 33, g: 33, b: 33 };
        const r = Math.floor(start.r + tBg * (end.r - start.r));
        const g = Math.floor(start.g + tBg * (end.g - start.g));
        const b = Math.floor(start.b + tBg * (end.b - start.b));
        containerRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Pour la progression du texte, si besoin vous pourriez aussi mettre à jour des styles via descRef
        // Ici nous laissons AnimatedText gérer son rendu via props, éventuellement vous pouvez l'optimiser.
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

  const h2Text =
    "FULL STACK WEB DEVELOPER WHO LOVES TURNING IDEAS INTO FUNCTIONAL, CREATIVE DESIGNS, AND SOLVING PROBLEMS WITH CODE";

  return (
    <div id="about" className="about-container" ref={containerRef}>
      <div className="about-tab" style={{ transition: "background-color 0.5s ease-out" }}>
        <div className="about-title" ref={titleRef} style={{ backgroundColor: "#D32F2F", transition: "width 0.3s ease" }}>
          <h1>ABOUT ME</h1>
        </div>
        <div className="about-desc" ref={descRef}>
          <h2>
            <AnimatedText text={h2Text} progress={0} />
          </h2>
          <h3>PROBABLY MORE</h3>
        </div>
        <div className="about-game">
          <div className="about-game-title">
            <h2>ANYWAY, TRY TO CATCH ME</h2>
          </div>
          <CatchGame />
        </div>
      </div>
    </div>
  );
}

export default About;
