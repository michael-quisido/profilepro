"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const defaultContact = `<p><strong>Phone:</strong> 09940487911</p>
<p><strong>Email:</strong> jhonaimaquisido@gmail.com</p>
<p><strong>Email:</strong> mike082112@gmail.com</p>
<p><strong>Address:</strong> Your Address Here</p>`;

export default function Contact() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contact, setContact] = useState(defaultContact);
  const [saved, setSaved] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('contactContent');
    if (stored) {
      setContact(stored);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('contactContent', contact);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleContentChange = (content: string) => {
    setContact(content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px"
        }}>
          <span onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "40px", cursor: "pointer", position: "absolute", top: "20px", right: "20px" }}>×</span>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}><FaHome /> Home</Link>
          <Link href="/adminpro/dashboard" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Edit Profile</Link>
          <Link href="/adminpro/content" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Content</Link>
          <Link href="/adminpro/credentials" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Credentials</Link>
          <Link href="/adminpro/monitoring" onClick={() => setMenuOpen(false)} style={{ color: "white", fontSize: "24px", textDecoration: "none" }}>Monitoring</Link>
        </div>
      )}

      <nav style={{
        background: "#333",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link href="/adminpro/content" style={{ color: "white", fontSize: "20px" }}><FaArrowLeft /></Link>
          <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Contact</div>
        </div>

        {isMobile ? (
          <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "5px" }}>
            <span style={{ display: "block", width: "25px", height: "3px", background: "white", margin: "5px 0" }}></span>
            <span style={{ display: "block", width: "25px", height: "3px", background: "white", margin: "5px 0" }}></span>
            <span style={{ display: "block", width: "25px", height: "3px", background: "white", margin: "5px 0" }}></span>
          </button>
        ) : (
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link href="/" style={{ color: "white", textDecoration: "none", fontSize: "20px" }}><FaHome /></Link>
            <Link href="/adminpro/dashboard" style={{ color: "white", textDecoration: "none" }}>Edit Profile</Link>
            <Link href="/adminpro/content" style={{ color: "white", textDecoration: "none" }}>Content</Link>
            <Link href="/adminpro/credentials" style={{ color: "white", textDecoration: "none" }}>Credentials</Link>
            <Link href="/adminpro/monitoring" style={{ color: "white", textDecoration: "none" }}>Monitoring</Link>
          </div>
        )}
      </nav>

      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ background: "white", padding: "30px", borderRadius: "15px" }}>
          <h2 style={{ marginBottom: "20px", color: "#333" }}>Contact Page Content</h2>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#333" }}>Content</label>
            <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
              <ReactQuill
                ref={quillRef}
                value={contact}
                onChange={handleContentChange}
                modules={modules}
                theme="snow"
                style={{ minHeight: "400px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
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
      <div style={{ position: "fixed", bottom: "10px", right: "20px", fontSize: "12px", color: "#888" }}>
        Powered by: kmcq-whs.agila
      </div>
    </div>
  );
}