import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Loading.css";

function Loading() {
  // Dimensions du conteneur et du carré
  const containerWidth = 300;
  const containerHeight = 300;
  const squareSize = 50;

  // Position initiale centrée
  const [position, setPosition] = useState({
    top: (containerHeight - squareSize) / 2,
    left: (containerWidth - squareSize) / 2,
  });
  // Indique si le carré doit continuer à bouger
  const [running, setRunning] = useState(true);
  // Indique si l'animation de sortie (vers la droite) doit démarrer
  const [exitAnim, setExitAnim] = useState(false);

  // Boucle de déplacement aléatoire (toutes les 300ms)
  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => {
        setPosition({
          top: Math.floor(Math.random() * (containerHeight - squareSize)),
          left: Math.floor(Math.random() * (containerWidth - squareSize)),
        });
      }, 300);
    }
    return () => clearInterval(intervalId);
  }, [running]);

  // Après 2 secondes, arrêter le mouvement et déclencher l'animation de sortie
  useEffect(() => {
    const timer = setTimeout(() => {
      setRunning(false);
      setExitAnim(true);
    }, 2000); // ⬅ 2 SECONDES
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-container">
      <motion.div
        className="game-container"
        style={{
          position: "relative",
          width: containerWidth,
          height: containerHeight,
          border: "2px solid #ccc",
          margin: "20px auto",
        }}
        animate={exitAnim ? { x: window.innerWidth + 300, opacity: 0 } : {}}
        transition={exitAnim ? { duration: 1, ease: "easeInOut" } : {}}
      >
        {!exitAnim && (
          <motion.div
            className="game-square"
            animate={{ top: position.top, left: position.left }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              width: squareSize,
              height: squareSize,
              backgroundColor: "#D32F2F",
              cursor: "pointer",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default Loading;
