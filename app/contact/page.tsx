"use client";

import { useState, useEffect } from "react";
import IDCard from "../components/IDCard";

const defaultContact = `Phone Contact: 09940487911
Email:         jhonaimaquisido@gmail.com
               mike082112@gmail.com`;

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(defaultContact);

  useEffect(() => {
    const stored = localStorage.getItem('pageContent');
    if (stored) {
      const content = JSON.parse(stored);
      if (content.contact) {
        setContactInfo(content.contact);
      }
    }
  }, []);

  return (
    <div className="brick-wall" style={{ minHeight: '100vh', padding: '200px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IDCard customContent={
            <p style={{ fontSize: '16px', color: '#333', whiteSpace: 'pre-line', lineHeight: '2' }}>{contactInfo}</p>
          } />
        </div>
    </div>
  );
}