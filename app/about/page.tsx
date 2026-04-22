"use client";

import { useState, useEffect } from "react";
import IDCard from "../components/IDCard";

const defaultAbout = `<p>I excel in crafting and cultivating high-quality lists that drive exceptional results. With a keen eye for detail and an unwavering commitment to excellence, I employ my expertise in email search techniques to locate elusive contacts and valuable leads.</p>
<p>I am dedicated to helping businesses reach new heights by providing them with the most accurate and targeted lists possible.</p>
<p>Let me be your guide in building a robust network and maximizing your outreach potential.</p>`;

export default function About() {
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch('/api/about');
      if (res.ok) {
        const data = await res.json();
        setAboutText(data.content || defaultAbout);
      } else {
        setAboutText(defaultAbout);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
      setAboutText(defaultAbout);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brick-wall" style={{ minHeight: '100vh', padding: '200px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IDCard customContent={
            loading ? (
              <div style={{ color: '#666', fontSize: '16px' }}>Loading...</div>
            ) : (
              <div 
                style={{ fontSize: '16px', color: '#333', whiteSpace: 'pre-line', lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: aboutText }}
              />
            )
          } />
        </div>
    </div>
  );
}