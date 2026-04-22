"use client";

import { useState, useEffect } from "react";
import IDCard from "../components/IDCard";

interface Project {
  id: number;
  title: string;
  description: string;
}

const defaultProjects: Project[] = [];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
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

  return (
    <div className="brick-wall" style={{ minHeight: '1200px', padding: '200px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IDCard customContent={
            loading ? (
              <div style={{ color: '#666', fontSize: '16px' }}>Loading...</div>
            ) : projects.length === 0 ? (
              <div style={{ color: '#666', fontSize: '16px' }}>No projects available</div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                {projects.map((project) => (
                  <span key={project.id} style={{ 
                    background: '#333', 
                    color: 'white', 
                    padding: '10px 15px', 
                    borderRadius: '8px', 
                    fontSize: '14px'
                  }}>
                    {project.title}
                  </span>
                ))}
              </div>
            )
          } />
        </div>
    </div>
  );
}