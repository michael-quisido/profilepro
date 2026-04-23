"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

interface Credentials {
  username: string;
  password: string;
  verification_email: string;
}

export default function Credentials() {
  const defaultCreds: Credentials = { username: "admin", password: "admin123", verification_email: "mike082112@gmail.com" };
  const [creds, setCreds] = useState<Credentials>(defaultCreds);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
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
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const res = await fetch("/api/credentials");
      if (res.ok) {
        const data = await res.json();
        setCreds({ 
          username: data.username, 
          password: data.password,
          verification_email: data.verification_email || "mike082112@gmail.com"
        });
      }
    } catch (error) {
      console.error('Error fetching credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("/api/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
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
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Change Username & Password</h2>
        
        {loading ? (
          <div style={{ background: "white", padding: "30px", borderRadius: "15px", textAlign: "center" }}>
            Loading...
          </div>
        ) : (
          <div style={{ background: "white", padding: "30px", borderRadius: "15px" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "600" }}>Username</label>
              <input
                type="text"
                value={creds.username}
                onChange={(e) => setCreds({ ...creds, username: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "600" }}>Password</label>
              <input
                type="password"
                value={creds.password}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "600" }}>Verification Email</label>
              <input
                type="email"
                value={creds.verification_email}
                onChange={(e) => setCreds({ ...creds, verification_email: e.target.value })}
                placeholder="Email for receiving verification codes"
                style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={handleSave}
                style={{
                  padding: "12px 30px",
                  background: "#c9a227",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Save Credentials
              </button>
              {saved && <span style={{ color: "green" }}>Saved successfully!</span>}
            </div>
          </div>
        )}
      </div>
      <div style={{ position: 'fixed', bottom: '10px', right: '20px', fontSize: '12px', color: '#888' }}>
        Powered by: kmcq-whs.agila
      </div>
    </div>
  );
}