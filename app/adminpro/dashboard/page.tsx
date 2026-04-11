"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    email: "admin@jhona-quisido.com",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  });
  const [saved, setSaved] = useState(false);
  const [creds, setCreds] = useState({ username: "admin", password: "admin123" });
  const [credsSaved, setCredsSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('adminCreds');
    if (stored) {
      setCreds(JSON.parse(stored));
    }
  }, []);

  const handleSave = async () => {
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    localStorage.setItem('profileData', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCredsSave = () => {
    localStorage.setItem('adminCreds', JSON.stringify(creds));
    setCredsSaved(true);
    setTimeout(() => setCredsSaved(false), 2000);
  };

  const handleLogout = () => {
    router.push("/adminpro");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <nav style={{
        background: "#333",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Admin Dashboard</div>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/adminpro/dashboard" style={{ color: "white", textDecoration: "none" }}>Edit Profile</Link>
          <Link href="/adminpro/monitoring" style={{ color: "white", textDecoration: "none" }}>Monitoring</Link>
          <button onClick={handleLogout} style={{ 
            background: "#c9a227", 
            border: "none", 
            padding: "8px 15px", 
            borderRadius: "5px", 
            color: "white", 
            cursor: "pointer" 
          }}>Logout</button>
        </div>
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

        <h2 style={{ margin: "40px 0 30px", color: "#333" }}>Change Username & Password</h2>
        
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={handleCredsSave}
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
            {credsSaved && <span style={{ color: "green" }}>Saved successfully!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}