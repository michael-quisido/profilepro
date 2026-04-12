"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

interface ContentData {
  projects: string[];
  about: string;
  contact: string;
}

const defaultContent: ContentData = {
  projects: [
    "Company projects1", "Company projects2", "Company projects3", "Company projects4", "Company projects5",
    "Company projects6", "Company projects7", "Company projects8", "Company projects9", "Company projects10",
    "Company projects11", "Company projects12", "Company projects13", "Company projects14", "Company projects15",
    "Company projects16", "Company projects17", "Company projects18", "Company projects19", "Company projects20"
  ],
  about: `I excel in crafting and cultivating high-quality lists that drive exceptional results. With a keen eye for detail and an unwavering commitment to excellence, I employ my expertise in email search techniques to locate elusive contacts and valuable leads.
I am dedicated to helping businesses reach new heights by providing them with the most accurate and targeted lists possible.
Let me be your guide in building a robust network and maximizing your outreach potential. ;)`,
  contact: `Phone Contact: 09940487911
Email:         jhonaimaquisido@gmail.com
               admin@jhona-quisido.com`
};

export default function Content() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('pageContent');
    if (stored) {
      setContent(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('pageContent', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Content Management</h2>
        
        <div style={{ background: "white", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>Projects (one per line)</h3>
          <textarea
            value={content.projects.join('\n')}
            onChange={(e) => setContent({ ...content, projects: e.target.value.split('\n').filter(p => p.trim()) })}
            rows={10}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
          />
        </div>

        <div style={{ background: "white", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>About</h3>
          <textarea
            value={content.about}
            onChange={(e) => setContent({ ...content, about: e.target.value })}
            rows={8}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
          />
        </div>

        <div style={{ background: "white", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>Contact</h3>
          <textarea
            value={content.contact}
            onChange={(e) => setContent({ ...content, contact: e.target.value })}
            rows={5}
            style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit" }}
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
            Save Changes
          </button>
          {saved && <span style={{ color: "green" }}>Saved successfully!</span>}
        </div>
      </div>
    </div>
  );
}