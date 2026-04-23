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
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px', 
                alignItems: 'center',
                width: '100%'
              }}>
                {projects.map((project) => (
                  <div key={project.id} style={{ 
                    background: '#333', 
                    color: 'white', 
                    padding: '15px', 
                    borderRadius: '8px',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{project.title}</div>
                    <div 
                      style={{ fontSize: '14px', lineHeight: '1.5' }}
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>
                ))}
              </div>
            )
          } />
        </div>
    </div>
  );
}