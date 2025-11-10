// src/App.jsx
import React from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import About from './Components/About';
import Portfolio from './Components/Portfolio';
import Experiences from './Components/Services';
import Certifications from './Components/Contact';
import Footer from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

function App() {
  return (
    <div>
      <Header />
      <div id="home" style={{ marginTop: '80px' }}></div>
      <Home />
      <About />
      <Portfolio />
      <Experiences />
      <Certifications />
      <Footer />
    </div>
  );
}

export default App;
