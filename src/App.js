// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import About from "./Components/About";
import Portfolio from "./Components/Portfolio";
import Experiences from "./Components/Services";
import Certifications from "./Components/Contact";
import Footer from "./Components/Footer";
import TypeScriptDemo from "./Components/TypeScriptDemo.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import ProjectDetail from "./Components/ProjectDetail.tsx";


function App() {
  return (
    <Routes>
      {/* Homepage route */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <div id="home" style={{ marginTop: "80px" }}></div>
            <Home />
            <About />
            <Portfolio />
            <Experiences />
            <Certifications />
            <Footer />
          </>
        }
      />

      {/* TypeScript Demo route */}
      <Route
        path="/typescript-demo"
        element={<TypeScriptDemo />}
      />

    {/* Project detail route */}
    <Route path="/project/:id" element={<ProjectDetail />} /> 
    </Routes>
  );
}

export default App;
