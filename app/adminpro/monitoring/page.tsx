"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Visitor {
  id: string;
  ip: string;
  region: string;
  country: string;
  timestamp: string;
}

export default function Monitoring() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => setVisitors(data));
  }, []);

  const handleLogout = () => {
    router.push("/adminpro");
  };

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
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>🏠 Home</Link>
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
            <Link href="/" style={{ color: "white", textDecoration: "none", fontSize: "20px" }}>🏠</Link>
            <Link href="/adminpro/dashboard" style={{ color: "white", textDecoration: "none" }}>Edit Profile</Link>
            <Link href="/adminpro/content" style={{ color: "white", textDecoration: "none" }}>Content</Link>
            <Link href="/adminpro/credentials" style={{ color: "white", textDecoration: "none" }}>Credentials</Link>
            <Link href="/adminpro/monitoring" style={{ color: "white", textDecoration: "none" }}>Monitoring</Link>
            <button onClick={() => router.push("/adminpro")} style={{ background: "#c9a227", border: "none", padding: "8px 15px", borderRadius: "5px", color: "white", cursor: "pointer" }}>Logout</button>
          </div>
        )}
      </nav>

      <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Visitor Log</h2>
        
        <div style={{ background: "white", padding: "20px", borderRadius: "15px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Date and Time</th>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>IP Address</th>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Region</th>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Country</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#888" }}>
                    No visitors yet
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => (
                  <tr key={visitor.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "15px" }}>{new Date(visitor.timestamp).toLocaleString()}</td>
                    <td style={{ padding: "15px" }}>{visitor.ip}</td>
                    <td style={{ padding: "15px" }}>{visitor.region || "Unknown"}</td>
                    <td style={{ padding: "15px" }}>{visitor.country || "Unknown"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}