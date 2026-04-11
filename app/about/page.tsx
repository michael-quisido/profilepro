"use client";

import { useState, useEffect } from "react";
import IDCard from "../components/IDCard";

const defaultAbout = `I excel in crafting and cultivating high-quality lists that drive exceptional results. With a keen eye for detail and an unwavering commitment to excellence, I employ my expertise in email search techniques to locate elusive contacts and valuable leads.
I am dedicated to helping businesses reach new heights by providing them with the most accurate and targeted lists possible.
Let me be your guide in building a robust network and maximizing your outreach potential. ;)`;

export default function About() {
  const [aboutText, setAboutText] = useState(defaultAbout);

  useEffect(() => {
    const stored = localStorage.getItem('pageContent');
    if (stored) {
      const content = JSON.parse(stored);
      if (content.about) {
        setAboutText(content.about);
      }
    }
  }, []);

  return (
    <div className="brick-wall" style={{ minHeight: '100vh', padding: '200px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IDCard customContent={
            <p style={{ fontSize: '16px', color: '#333', whiteSpace: 'pre-line', lineHeight: '1.8' }}>{aboutText}</p>
          } />
        </div>
    </div>
  );
}