"use client";

import { useState, useEffect } from "react";
import IDCard from "../components/IDCard";

const defaultContact = `<p><strong>Phone:</strong> 09940487911</p>
<p><strong>Email:</strong> jhonaimaquisido@gmail.com</p>
<p><strong>Email:</strong> mike082112@gmail.com</p>`;

export default function Contact() {
  const [contactInfo, setContactInfo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setContactInfo(data.content || defaultContact);
      } else {
        setContactInfo(defaultContact);
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
      setContactInfo(defaultContact);
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
                style={{ fontSize: '16px', color: '#333', whiteSpace: 'pre-line', lineHeight: '2' }}
                dangerouslySetInnerHTML={{ __html: contactInfo }}
              />
            )
          } />
        </div>
    </div>
  );
}