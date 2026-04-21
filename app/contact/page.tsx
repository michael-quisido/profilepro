"use client";

import { useState, useEffect } from "react";
import IDCard from "../components/IDCard";

const defaultContact = `Phone Contact: 09940487911
Email:         jhonaimaquisido@gmail.com
               mike082112@gmail.com`;

export default function Contact() {
  const [contactInfo, setContactInfo] = useState(defaultContact);

  useEffect(() => {
    async function loadContact() {
      try {
        const res = await fetch("/api/db/contact");
        const data = await res.json();
        if (data.content) {
          setContactInfo(data.content);
        }
      } catch (error) {
        console.error("Error loading contact:", error);
      }
    }
    loadContact();
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