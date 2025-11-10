// src/components/Home.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { ReactTyped } from 'react-typed'; // ✅ fixed import
//import logo from '../assets/images/logo.png';
import '../assets/css/style.css';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <section
      id="home"
      className="home-banner d-flex align-items-center justify-content-center"
    >
      <Container className="text-center position-relative">
        {/* Logo with fade-in */}
        <motion.div
          className="logo mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
         
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="display-4 fw-bold text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Hi, I’m Sowndarya Ragavan
        </motion.h1>

        {/* Subheading with typing animation */}
        <motion.h2
          className="text-light mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <ReactTyped
            strings={[
              'Full-Stack Developer 💻',
              'Automation Expert ⚙️',
              'Cloud Enthusiast ☁️',
              'Lifelong Learner 🌱',
            ]}
            typeSpeed={80}
            backSpeed={50}
            loop
          />
        </motion.h2>

        {/* Buttons */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Button
            href="#portfolio"
            variant="primary"
            className="btn-lg shadow-lg me-3"
          >
            View My Work
          </Button>
          <Button
            href="#about"
            variant="outline-light"
            className="btn-lg shadow-lg"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Floating accent circles */}
        <div className="home-accents">
          <span className="accent-circle accent-circle1"></span>
          <span className="accent-circle accent-circle2"></span>
          <span className="accent-circle accent-circle3"></span>
        </div>
      </Container>
    </section>
  );
};

export default Home;
