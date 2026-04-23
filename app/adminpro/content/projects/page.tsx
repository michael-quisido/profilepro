"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface Project {
  id: number;
  title: string;
  description: string;
  display_order: number;
}

const defaultProjects: Project[] = [];

export default function Projects() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [saved, setSaved] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedProject) return;
    try {
      if (selectedProject.id) {
        await fetch(`/api/projects/${selectedProject.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedProject.title,
            description: selectedProject.description,
          }),
        });
      } else {
        await fetch("/api/projects/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selectedProject.title,
            description: selectedProject.description,
          }),
        });
      }
      await fetchProjects();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: 0,
      title: `New Project ${projects.length + 1}`,
      description: "<p>Enter project details...</p>",
      display_order: projects.length,
    };
    setSelectedProject(newProject);
  };

  const handleDeleteProject = async (id: number) => {
    if (!id) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      await fetchProjects();
      setSelectedProject(null);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleProjectChange = (field: string, value: string) => {
    if (!selectedProject) return;
    const updated = { ...selectedProject, [field]: value };
    setSelectedProject(updated);
  };

  const handleContentChange = (content: string) => {
    if (!selectedProject) return;
    const updated = { ...selectedProject, description: content };
    setSelectedProject(updated);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#333", fontSize: "18px" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px"
        }}>
          <span onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "40px", cursor: "pointer", position: "absolute", top: "20px", right: "20px" }}>×</span>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}><FaHome /> Home</Link>
          <Link href="/adminpro/dashboard" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Edit Profile</Link>
          <Link href="/adminpro/content" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Content</Link>
          <Link href="/adminpro/credentials" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Credentials</Link>
          <Link href="/adminpro/monitoring" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Monitoring</Link>
          <button onClick={() => { setMenuOpen(false); router.push("/adminpro"); }} style={{ padding: '10px 20px', background: '#c9a227', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}>Logout</button>
        </div>
      )}

      <nav style={{
        background: "#333",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link href="/adminpro/content" style={{ color: "white", fontSize: "20px" }}><FaArrowLeft /></Link>
          <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Projects</div>
        </div>

        {isMobile ? (
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "5px" }}>
            <span style={{ display: "block", width: "25px", height: "3px", background: "white", margin: "5px 0" }}></span>
            <span style={{ display: "block", width: "25px", height: "3px", background: "white", margin: "5px 0" }}></span>
            <span style={{ display: "block", width: "25px", height: "3px", background: "white", margin: "5px 0" }}></span>
          </button>
        ) : (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link href="/" style={{ color: "white", textDecoration: "none", fontSize: "20px" }}><FaHome /></Link>
            <Link href="/adminpro/dashboard" style={{ color: "white", textDecoration: "none" }}>Edit Profile</Link>
            <Link href="/adminpro/content" style={{ color: "white", textDecoration: "none" }}>Content</Link>
            <Link href="/adminpro/credentials" style={{ color: "white", textDecoration: "none" }}>Credentials</Link>
            <Link href="/adminpro/monitoring" style={{ color: "white", textDecoration: "none" }}>Monitoring</Link>
            <button onClick={() => router.push("/adminpro")} style={{ background: "#c9a227", border: "none", padding: "8px 15px", borderRadius: "5px", color: "white", cursor: "pointer" }}>Logout</button>
          </div>
        )}
      </nav>

      <div style={{ padding: "40px", display: "flex", gap: "30px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ flex: "0 0 300px", background: "white", padding: "20px", borderRadius: "15px", height: "fit-content" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ color: "#333", margin: 0 }}>Projects List</h3>
            <button
              onClick={handleAddProject}
              style={{
                background: "#c9a227",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              + Add
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                style={{
                  padding: "15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: selectedProject?.id === project.id ? "#c9a227" : "#f5f5f5",
                  color: selectedProject?.id === project.id ? "white" : "#333",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span style={{ fontWeight: "500" }}>{project.title}</span>
                {project.id > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: selectedProject?.id === project.id ? "white" : "#666",
                      cursor: "pointer",
                      fontSize: "18px"
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, background: "white", padding: "30px", borderRadius: "15px" }}>
          {selectedProject ? (
            <>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Project Title</label>
                <input
                  type="text"
                  value={selectedProject.title}
                  onChange={(e) => handleProjectChange("title", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Description</label>
                <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                  <ReactQuill
                    ref={quillRef}
                    value={selectedProject.description}
                    onChange={handleContentChange}
                    modules={modules}
                    theme="snow"
                    style={{ minHeight: "300px" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", color: "#888", padding: "50px" }}>
              Select a project to edit or add a new one
            </div>
          )}

          {selectedProject && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
              <button
                onClick={handleSave}
                style={{
                  padding: "12px 30px",
                  background: "#c9a227",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Save Changes
              </button>
              {saved && <span style={{ color: "green" }}>Saved successfully!</span>}
            </div>
          )}
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "10px", right: "20px", fontSize: "12px", color: "#888" }}>
        Powered by: kmcq-whs.agila
      </div>
    </div>
  );
}