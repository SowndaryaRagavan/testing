import React, { useEffect } from "react";
import "../assets/css/style.css";

const Services = () => {
  useEffect(() => {
    // Scroll animation for experience cards
    const cards = document.querySelectorAll(".experience-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <section id="services">
      <h2>Work Experience</h2>
      <div className="experience-container">
        {/* Mavenir Systems */}
        <div className="experience-card">
          <h3>Mavenir Systems, Inc</h3>
          <a href="https://www.mavenir.com/" target="_blank" rel="noreferrer">mavenir.com</a>
          <p className="experience-duration">Senior Software Engineer | Sep 2021 – Oct 2024</p>
          <p className="experience-details">
            Designed and built scalable <b>microservices</b> using <b>Python (FastAPI/Django)</b> and <b>React</b>. 
            Automated deployments via <b>Docker</b>, <b>Kubernetes (EKS/AKS)</b>, and <b>CI/CD pipelines</b> in Azure DevOps & GitHub Actions. Developed serverless workflows with <b>AWS Lambda</b> and <b>Terraform</b>. Mentored developers and drove DevOps best practices.
          </p>
        </div>

        {/* Informatica */}
        <div className="experience-card">
          <h3>Informatica</h3>
          <a href="https://www.informatica.com" target="_blank" rel="noreferrer">informatica.com</a>
          <p className="experience-duration">Software Developer | Jul 2019 – Sep 2021</p>
          <p className="experience-details">
            Engineered responsive web apps using <b>React</b> and <b>REST APIs</b>. Automated build and deployment pipelines in Azure DevOps, containerized services with Docker, and optimized <b>Kubernetes (AKS)</b> performance. Implemented ETL data workflows with Pandas.
          </p>
        </div>

        {/* National Engineering College */}
        <div className="experience-card">
          <h3>National Engineering College</h3>
          <a href="https://nec.edu.in" target="_blank" rel="noreferrer">nec.edu.in</a>
          <p className="experience-duration">DevOps / Automation Engineer | Mar 2017 – Nov 2018</p>
          <p className="experience-details">
            Automated system operations using <b>Python</b> and <b>Bash scripts</b>. Managed Linux servers, configured Docker environments, and set up virtual labs for faculty and students.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
