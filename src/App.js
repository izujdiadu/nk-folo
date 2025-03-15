import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Languages from "./components/Languages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loading from "./components/Loading"; // Import du composant de chargement
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule un chargement de 2 secondes avant d'afficher l'application
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="project-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Header />
          <About />
          <Projects />
          <Languages />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
