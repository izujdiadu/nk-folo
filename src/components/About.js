import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/About.css";
import CatchGame from "./CatchGame";

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
  const [backgroundColor, setBackgroundColor] = useState("rgb(48,63,159)");
  const [titlePosition, setTitlePosition] = useState(0);
  const [backgroundWidth, setBackgroundWidth] = useState(0);
  const [textProgress, setTextProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateStyles = () => {
      const scrollY = window.scrollY;
      setTitlePosition(scrollY / 10);
      setBackgroundWidth(Math.min(scrollY / 3, 100));

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = rect.height;
        const tBg = Math.min(Math.max((containerHeight - rect.bottom) / containerHeight, 0), 1);
        const start = { r: 48, g: 63, b: 159 };
        const end = { r: 33, g: 33, b: 33 };
        const r = Math.floor(start.r + tBg * (end.r - start.r));
        const g = Math.floor(start.g + tBg * (end.g - start.g));
        const b = Math.floor(start.b + tBg * (end.b - start.b));
        setBackgroundColor(`rgb(${r}, ${g}, ${b})`);

        const progress = Math.min(Math.max((containerHeight - rect.bottom) / (containerHeight * 0.8), 0), 1);
        setTextProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateStyles();
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateStyles(); // exécution initiale
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const h2Text =
    "FULL STACK WEB DEVELOPER WHO LOVES TURNING IDEAS INTO FUNCTIONAL, CREATIVE DESIGNS, AND SOLVING PROBLEMS WITH CODE";

  return (
    <div id="about" className="about-container" ref={containerRef}>
      <div
        className="about-tab"
        style={{ backgroundColor, transition: "background-color 0.5s ease-out" }}
      >
        <div
          className="about-title"
          style={{
            transform: `translateX(${titlePosition}px)`,
            backgroundColor: "#D32F2F",
            width: `${backgroundWidth}%`,
            transition: "width 0.3s ease",
          }}
        >
          <h1>ABOUT ME</h1>
        </div>
        <div className="about-desc">
          <h2>
            <AnimatedText text={h2Text} progress={textProgress} />
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
