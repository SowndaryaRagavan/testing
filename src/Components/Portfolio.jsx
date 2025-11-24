import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/projects`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError("Unable to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Skeleton loader
  if (loading) {
    return (
      <div className="portfolio-container">
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
      </div>
    );
  }

  // Error case
  if (error) {
    return <p className="error-text">{error}</p>;
  }

  // Empty case
  if (!projects || projects.length === 0) {
    return <p className="empty-text">No projects found.</p>;
  }

  return (
    <div className="portfolio-container">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="project-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={project.image_url} // 👈 Works perfectly when TEXT
            alt={project.title}
            className="project-image"
            onError={(e) => (e.target.src = "/fallback-image.png")}
          />

          <h3 className="project-title">{project.title}</h3>

          <p className="project-tech-stack">
            {Array.isArray(project.tech_stack)
              ? project.tech_stack.join(", ")
              : project.tech_stack}
          </p>

          {project.doc_url && (
            <a
              href={project.doc_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-doc-link"
            >
              View Documentation
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Portfolio;
