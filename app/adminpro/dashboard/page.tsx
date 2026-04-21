"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

interface ProfileData {
  photo: string;
  name: string;
  title: string;
  email: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

export default function AdminDashboard() {
  const [profile, setProfile] = useState<ProfileData>({
    photo: "/images/mommy_200x200.jpg",
    name: "Jhona Aima C. Quisido",
    title: "Expert/ Web Research Specialist",
    email: "mike082112@gmail.com",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  });
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
    async function loadProfile() {
      try {
        const res = await fetch("/api/db/profile");
        const data = await res.json();
        if (data) {
          setProfile({
            photo: data.photo || "/images/mommy_200x200.jpg",
            name: data.name || "",
            title: data.title || "",
            email: data.email || "",
            socialLinks: {
              facebook: data.facebook || "",
              twitter: data.twitter || "",
              instagram: data.instagram || "",
              linkedin: data.linkedin || "",
              github: data.github || "",
            },
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      await fetch("/api/db/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photo: profile.photo,
          name: profile.name,
          title: profile.title,
          email: profile.email,
          facebook: profile.socialLinks.facebook,
          twitter: profile.socialLinks.twitter,
          instagram: profile.socialLinks.instagram,
          linkedin: profile.socialLinks.linkedin,
          github: profile.socialLinks.github,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

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
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><FaHome /> Home</Link>
          <Link href="/adminpro/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Edit Profile</Link>
          <Link href="/adminpro/content" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Content</Link>
          <Link href="/adminpro/media" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Media</Link>
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
            <Link href="/adminpro/media" style={{ color: "white", textDecoration: "none" }}>Media</Link>
            <Link href="/adminpro/credentials" style={{ color: "white", textDecoration: "none" }}>Credentials</Link>
            <Link href="/adminpro/monitoring" style={{ color: "white", textDecoration: "none" }}>Monitoring</Link>
            <button onClick={() => router.push("/adminpro")} style={{ 
              background: "#c9a227", 
              border: "none", 
              padding: "8px 15px", 
              borderRadius: "5px", 
              color: "white", 
              cursor: "pointer" 
            }}>Logout</button>
          </div>
        )}
      </nav>

      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Edit Profile</h2>
        
        <div style={{ background: "white", padding: "30px", borderRadius: "15px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "600" }}>Photo URL</label>
            <input
              type="text"
              value={profile.photo}
              onChange={(e) => setProfile({ ...profile, photo: e.target.value })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "600" }}>Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "600" }}>Title/Occupation</label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333", fontWeight: "600" }}>Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <h3 style={{ margin: "20px 0 15px", color: "#333" }}>Social Media Links</h3>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Facebook URL</label>
            <input
              type="text"
              value={profile.socialLinks.facebook || ""}
              onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, facebook: e.target.value } })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Twitter URL</label>
            <input
              type="text"
              value={profile.socialLinks.twitter || ""}
              onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, twitter: e.target.value } })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Instagram URL</label>
            <input
              type="text"
              value={profile.socialLinks.instagram || ""}
              onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, instagram: e.target.value } })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>LinkedIn URL</label>
            <input
              type="text"
              value={profile.socialLinks.linkedin || ""}
              onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>GitHub URL</label>
            <input
              type="text"
              value={profile.socialLinks.github || ""}
              onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, github: e.target.value } })}
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
              Save Changes
            </button>
            {saved && <span style={{ color: "green" }}>Saved successfully!</span>}
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '10px', right: '20px', fontSize: '12px', color: '#888' }}>
        Powered by: kmcq-whs.agila
      </div>
    </div>
  );
}