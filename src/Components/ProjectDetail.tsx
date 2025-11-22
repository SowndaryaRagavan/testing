import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface DemoProject {
  id: number;
  title: string;
  description: string;
  doc_url: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<DemoProject | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await axios.get<DemoProject>(`http://127.0.0.1:8000/demo-projects/${id}`);
      setProject(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching project:", err);
      setLoading(false);
    }
  };

  if (loading) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  if (!project) return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Project not found.</p>;

  const headerHeight = 60; // px

  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "#1e1e1e", display: "flex", flexDirection: "column" }}>
      {/* Fixed Transparent Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `${headerHeight}px`,
          backgroundColor: "rgba(51, 51, 51, 0.85)", // semi-transparent
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
          backdropFilter: "blur(5px)", // adds nice blur effect
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{project.title}</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#fff",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          Back
        </button>
      </div>

      {/* PDF Viewer */}
      <iframe
        src={project.doc_url}
        style={{
          marginTop: `${headerHeight}px`, // space for fixed header
          width: "90%",
          height: `calc(100vh - ${headerHeight}px)`,
          border: "2px solid #555",
          borderRadius: "8px",
          alignSelf: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          backgroundColor: "#fff",
        }}
        title={project.title}
      />
    </div>
  );
};

export default ProjectDetail;
