// TypeScriptDemo.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Code, Cpu, Boxes, Cloud, GitBranch, Database, Server } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

interface DemoProject {
  id: number;
  title: string;
  description: string;
  doc_url: string;
}

// Deployed backend URL
const BACKEND_URL = "https://myfolio-backend-a6o6.onrender.com/demo-projects";

const TypeScriptDemo: React.FC = () => {
  const { darkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<DemoProject[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState<{ title: string; description: string; file: File | null }>({ title: "", description: "", file: null });
  const [rowVisible, setRowVisible] = useState<number[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [techVisible, setTechVisible] = useState<number[]>([]);

  const techStack = [
    { title: "TypeScript", desc: "Strongly typed JS.", icon: <Code size={30} /> },
    { title: "React + JSX/TSX", desc: "Component-based UI.", icon: <Cpu size={30} /> },
    { title: "Zustand", desc: "Lightweight state-management.", icon: <Boxes size={30} /> },
    { title: "FastAPI (Python)", desc: "Modern Python backend.", icon: <Server size={30} /> },
    { title: "PostgreSQL / NeonDB", desc: "Relational DB.", icon: <Database size={30} /> },
    { title: "Vercel / Render", desc: "CI/CD & hosting.", icon: <Cloud size={30} /> },
    { title: "GitHub Actions", desc: "CI/CD workflows.", icon: <GitBranch size={30} /> },
    { title: "HTML / CSS / Bootstrap", desc: "UI styling.", icon: "🎨" },
  ];

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get<DemoProject[]>(BACKEND_URL);
      setProjects(res.data);

      setRowVisible([]);
      res.data.forEach((_, idx) => {
        setTimeout(() => setRowVisible((prev) => [...prev, idx]), idx * 100);
      });
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    techStack.forEach((_, idx) => {
      setTimeout(() => setTechVisible((prev) => [...prev, idx]), idx * 120);
    });
  }, []);

  // Add project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.file) {
      return alert("Fill all fields and upload a file.");
    }

    const formData = new FormData();
    formData.append("title", newProject.title);
    formData.append("description", newProject.description);
    formData.append("file", newProject.file);

    try {
      await axios.post(`${BACKEND_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewProject({ title: "", description: "", file: null });
      setShowAddModal(false);
      setNotification("Project added successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      fetchProjects();
      setShowTable(true);
    } catch (err) {
      console.error("Failed to add project:", err);
      setNotification("Failed to add project.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Delete project
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/${id}`);
      setNotification("Project deleted successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setNotification("Failed to delete project.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <>
      {showNotification && notification && (
        <div style={{ position: "fixed", top: 80, right: 20, padding: "12px 20px", borderRadius: 6, backgroundColor: "#6c5ce7", color: "#fff", fontWeight: 600, zIndex: 1000 }}>
          {notification}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 40px", backgroundColor: darkMode ? "#1a1a1a" : "#6c5ce7" }}>
        <button onClick={() => navigate("/")} style={{ padding: "8px 16px", borderRadius: 6, backgroundColor: "#ffffff", color: "#6c5ce7", fontWeight: 600, cursor: "pointer" }}>Back to Home</button>
        <button onClick={toggleTheme} style={{ padding: "8px 16px", borderRadius: 6, backgroundColor: "#ffffff", color: "#6c5ce7", fontWeight: 600, cursor: "pointer" }}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Main Section */}
      <section style={{ padding: "40px", minHeight: "100vh", backgroundColor: darkMode ? "#121212" : "#e7e3ff", color: darkMode ? "#fff" : "#1a1a1a" }}>
        {/* Add / Show buttons */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "30px" }}>
          <button onClick={() => { setShowTable(!showTable); if (!showTable) fetchProjects(); }} style={{ padding: "10px 20px", borderRadius: 8, backgroundColor: "#6c5ce7", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
            {showTable ? "Hide Projects" : "Show Projects"}
          </button>
          <button onClick={() => setShowAddModal(true)} style={{ padding: "10px 20px", borderRadius: 8, backgroundColor: "#00b894", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Add Project</button>
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
            <div style={{ backgroundColor: darkMode ? "#1f1f1f" : "#ffffff", padding: 30, borderRadius: 12, minWidth: 320 }}>
              <h3>Add Project</h3>
              <input type="text" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 6 }} />
              <input type="text" placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 6 }} />
              <input type="file" onChange={(e) => setNewProject({ ...newProject, file: e.target.files ? e.target.files[0] : null })} style={{ marginBottom: 10 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={handleAddProject} style={{ padding: "8px 16px", borderRadius: 6, backgroundColor: "#00b894", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Submit</button>
                <button onClick={() => setShowAddModal(false)} style={{ padding: "8px 16px", borderRadius: 6, backgroundColor: "#d63031", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Clear</button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Table */}
        {showTable && (
          <div style={{ maxWidth: 1000, margin: "0 auto", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: darkMode ? "#1a1a1a" : "#6c5ce7", color: "#fff" }}>
                  <th style={{ padding: "12px" }}>Title</th>
                  <th style={{ padding: "12px" }}>Description</th>
                  <th style={{ padding: "12px" }}>PDF</th>
                  <th style={{ padding: "12px" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p.id} style={{ backgroundColor: i % 2 === 0 ? (darkMode ? "#121212" : "#f0f0f0") : "transparent", opacity: rowVisible.includes(i) ? 1 : 0, transform: rowVisible.includes(i) ? "translateX(0)" : "translateX(-50px)", transition: "all 0.4s ease" }}>
                    <td style={{ padding: "10px" }}>{p.title}</td>
                    <td style={{ padding: "10px" }}>{p.description}</td>
                    <td style={{ padding: "10px" }}>
                      <button onClick={() => window.open(p.doc_url, "_blank")} style={{ padding: "6px 12px", borderRadius: 6, backgroundColor: "#6c5ce7", color: "#fff", cursor: "pointer" }}>View PDF</button>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: "6px 12px", borderRadius: 6, backgroundColor: "#d63031", color: "#fff", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tech Stack */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginTop: "50px" }}>
          {techStack.map((item, idx) => {
            const isVisible = techVisible.includes(idx);
            return (
              <div key={idx} style={{ padding: 20, borderRadius: 12, textAlign: "center", backgroundColor: darkMode ? "#1f1f1f" : "#ffffff", boxShadow: darkMode ? "0 6px 18px rgba(0,0,0,0.35)" : "0 6px 18px rgba(0,0,0,0.08)", transform: isVisible ? "translateY(0)" : "translateY(40px)", opacity: isVisible ? 1 : 0, transition: "all 0.6s ease" }}>
                <div style={{ marginBottom: 10 }}>{item.icon}</div>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <p style={{ fontSize: 14, opacity: 0.8 }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default TypeScriptDemo;
