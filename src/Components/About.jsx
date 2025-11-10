// src/components/About.jsx
import React from "react";
import "../assets/css/style.css";
import profilePic from "../assets/images/profile.jpg"; // Replace with your photo path
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={profilePic} alt="Sowndarya" />
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2>About Me</h2>
          <p>
            I’m <b>Sowndarya</b> — a passionate <b>Full Stack Developer</b> and
            <b> DevOps Engineer</b> with expertise in automation, cloud-native
            development, and scalable systems design. I thrive on solving
            complex challenges and bringing innovative solutions to life using
            technologies like <b>Python</b>, <b>React</b>, <b>Docker</b>, and
            <b> Kubernetes</b>.
          </p>
          <p>
            I enjoy blending creativity and logic to build seamless digital
            experiences, automate deployments, and craft robust backend systems.
            Currently based in <b>Australia</b>, I’m exploring exciting tech
            opportunities and projects that make a real impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
