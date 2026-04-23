"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope } from "react-icons/fa";

export default function ContentHub() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { href: "/adminpro/content/projects", icon: <FaProjectDiagram />, label: "Projects" },
    { href: "/adminpro/content/about", icon: <FaUser />, label: "About" },
    { href: "/adminpro/content/contact", icon: <FaEnvelope />, label: "Contact" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px'
        }}>
          <span onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '40px', cursor: 'pointer', position: 'absolute', top: '20px', right: '20px' }}>×</span>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><FaHome /> Home</Link>
          <Link href="/adminpro/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Edit Profile</Link>
          <Link href="/adminpro/content" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Content</Link>
          <Link href="/adminpro/credentials" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Credentials</Link>
          <Link href="/adminpro/monitoring" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Monitoring</Link>
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
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Admin Dashboard</div>
        
        {isMobile ? (
          <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
            <span style={{ display: 'block', width: '25px', height: '3px', background: 'white', margin: '5px 0' }}></span>
            <span style={{ display: 'block', width: '25px', height: '3px', background: 'white', margin: '5px 0' }}></span>
            <span style={{ display: 'block', width: '25px', height: '3px', background: 'white', margin: '5px 0' }}></span>
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

      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Content Management</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "25px",
                background: "white",
                borderRadius: "15px",
                textDecoration: "none",
                color: "#333",
                fontSize: "18px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, boxShadow 0.2s"
              }}
            >
              <span style={{ color: "#c9a227", fontSize: "24px" }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '10px', right: '20px', fontSize: '12px', color: '#888' }}>
        Powered by: kmcq-whs.agila
      </div>
    </div>
  );
}