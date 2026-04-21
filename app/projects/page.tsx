"use client";

import { useState, useEffect } from "react";
import IDCard from "../components/IDCard";

const defaultProjects = [
  "Company projects1", "Company projects2", "Company projects3", "Company projects4", "Company projects5",
  "Company projects6", "Company projects7", "Company projects8", "Company projects9", "Company projects10",
  "Company projects11", "Company projects12", "Company projects13", "Company projects14", "Company projects15",
  "Company projects16", "Company projects17", "Company projects18", "Company projects19", "Company projects20"
];

export default function Projects() {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/db/projects");
        const data = await res.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects.map((p: any) => p.name));
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    }
    loadProjects();
  }, []);

  const projectTags = projects.map((project, index) => (
    <span key={index} style={{ 
      background: '#333', 
      color: 'white', 
      padding: '10px 15px', 
      borderRadius: '8px', 
      fontSize: '14px'
    }}>
      {project}
    </span>
  ));

  return (
    <div className="brick-wall" style={{ minHeight: '1200px', padding: '200px 20px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IDCard customContent={
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            {projectTags}
          </div>
        } />
      </div>
    </div>
  );
}