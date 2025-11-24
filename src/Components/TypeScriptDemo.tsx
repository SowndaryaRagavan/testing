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

// Backend URL
const BACKEND_URL = "https://myfolio-backend-a6o6.onrender.com/demo-projects";


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
  const [uploading, setUploading] = useState(false);

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

    setUploading(true);
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
    } finally {
      setUploading(false);
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
    </>
  );
};

export default TypeScriptDemo;
