import React, { useEffect, useState, useRef } from "react";
import "../assets/css/style.css";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const scrollRefs = useRef({}); // store refs for auto-scroll

  // Fetch projects from FastAPI backend
  useEffect(() => {
    fetch("https://myfolio-backend-a6o6.onrender.com/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  // Auto-scroll effect with hover pause
  useEffect(() => {
    const intervals = [];

    projects.forEach((proj) => {
      const scrollContainer = scrollRefs.current[proj.id];
      if (scrollContainer) {
        let isHovered = false;

        scrollContainer.addEventListener("mouseenter", () => {
          isHovered = true;
        });
        scrollContainer.addEventListener("mouseleave", () => {
          isHovered = false;
        });

        intervals.push(
          setInterval(() => {
            if (!isHovered) {
              if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
              } else {
                scrollContainer.scrollLeft += 1; // adjust speed here
              }
            }
          }, 20)
        );
      }
    });

    return () => intervals.forEach((i) => clearInterval(i));
  }, [projects]);

  return (
    <section
      id="portfolio"
      className="portfolio-section"
      style={{ backgroundColor: "#111", padding: "60px 0" }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#FFD700",
          marginBottom: "50px",
          fontSize: "2rem",
          letterSpacing: "1px",
        }}
      >
        Portfolio
      </h2>

      <div className="portfolio-container">
        {projects.length === 0 && (
          <p style={{ textAlign: "center", color: "#ccc" }}>No projects yet.</p>
        )}

        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            className="portfolio-card-split"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Left side - Project info */}
            <div className="portfolio-info">
              <h3 style={{ color: "#FFD700", marginBottom: "10px" }}>
                {proj.title}
              </h3>
              <p style={{ color: "#ccc", marginBottom: "10px" }}>
                {proj.description}
              </p>
              {proj.tech_stack && (
                <p style={{ fontWeight: "bold", color: "#aaa" }}>
                  Tech: {proj.tech_stack}
                </p>
              )}
              <div className="portfolio-links">
                {proj.github_link && (
                  <a
                    href={proj.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    GitHub
                  </a>
                )}
                {proj.demo_link && (
                  <a
                    href={proj.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>

            {/* Right side - Auto-scrolling images */}
            <div
              className="portfolio-images"
              ref={(el) => (scrollRefs.current[proj.id] = el)}
            >
              {proj.image_url ? (
                (() => {
                  let images = [];
                  try {
                    images = JSON.parse(proj.image_url);
                    if (!Array.isArray(images)) images = [proj.image_url];
                  } catch {
                    images = [proj.image_url];
                  }

                  return (
                    <div className="image-scroll">
                      {images.concat(images).map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${proj.title}-${index}`}
                        />
                      ))}
                    </div>
                  );
                })()
              ) : (
                <p style={{ color: "#555" }}>No images available</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
