import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Languages from "./components/Languages";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import './App.css';


function App() {
  return (
    <div className="project-container">
      <Navbar />
      <Header />
      <About />
      <Projects />
      <Languages />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
