import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://myfolio-backend-a6o6.onrender.com/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
          fontSize: "2.5rem",
          letterSpacing: "1px",
        }}
      >
        Portfolio
      </h2>

      <div className="portfolio-container">
        {/* Skeleton Loader */}
        {loading &&
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="portfolio-card-split skeleton-card">
              <div className="skeleton skeleton-text title"></div>
              <div className="skeleton skeleton-text description"></div>
              <div className="skeleton skeleton-img"></div>
            </div>
          ))}

        {/* No projects */}
        {!loading && projects.length === 0 && (
          <p style={{ textAlign: "center", color: "#ccc" }}>No projects yet.</p>
        )}

        {/* Render projects */}
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            className="portfolio-card-split"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Project Info */}
            <motion.div className="portfolio-info" whileHover={{ scale: 1.02 }}>
              <h3 className="portfolio-title">{proj.title}</h3>
              <p className="portfolio-desc">{proj.description}</p>

              {proj.tech_stack && (
                <p className="portfolio-tech">Tech: {proj.tech_stack}</p>
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
            </motion.div>

            {/* Carousel */}
            <div className="portfolio-carousel">
              <div className="carousel-track">
                {proj.image_url &&
                  (() => {
                    let images = [];
                    try {
                      images = JSON.parse(proj.image_url);
                      if (!Array.isArray(images)) images = [proj.image_url];
                    } catch {
                      images = [proj.image_url];
                    }

                    return [...images, ...images].map((img, index) => (
                      <motion.div
                        key={index}
                        className="carousel-card"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img src={img} alt={`${proj.title}-${index}`} />
                      </motion.div>
                    ));
                  })()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
