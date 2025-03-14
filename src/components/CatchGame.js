import React, { useState } from "react";
import "../styles/About.css"; // Ou le fichier CSS approprié pour le style

function CatchGame() {
  // Dimensions du conteneur et du carré
  const containerWidth = 300;  // largeur en px
  const containerHeight = 300; // hauteur en px
  const squareSize = 50;       // taille du carré en px

  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({
    top: (containerHeight - squareSize) / 2,
    left: (containerWidth - squareSize) / 2,
  });

  // Fonction pour générer une position aléatoire dans le conteneur
  const randomPosition = () => {
    const maxTop = containerHeight - squareSize;
    const maxLeft = containerWidth - squareSize;
    return {
      top: Math.floor(Math.random() * maxTop),
      left: Math.floor(Math.random() * maxLeft),
    };
  };

  // Déplacement du carré au survol, tant que le compteur est inférieur à 10
  const handleMouseOver = () => {
    if (clickCount < 10) {
      setPosition(randomPosition());
    }
  };

  // Incrémentation du compteur au clic
  const handleClick = () => {
    if (clickCount < 10) {
      setClickCount(clickCount + 1);
    }
  };

  return (
    <div
      className="game-container"
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        border: "2px solid #ccc",
        margin: "20px auto",
      }}
    >
      {clickCount >= 10 && (
        <h1
          style={{
            position: "absolute",
            top: "-80px",
            width: "100%",
            textAlign: "center",
            color: "#66BB6A",
          }}
        >
          CONGRATULATION U UNLOCKED THE SECRET PASS
        </h1>
      )}
      <div
        className="game-square"
        onMouseOver={handleMouseOver}
        onClick={handleClick}
        style={{
          position: "absolute",
          width: squareSize,
          height: squareSize,
          backgroundColor: "#D32F2F",
          top: position.top,
          left: position.left,
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default CatchGame;
