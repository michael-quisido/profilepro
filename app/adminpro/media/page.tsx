"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaHome, FaTrash, FaUpload } from "react-icons/fa";

interface ImageFile {
  name: string;
  url: string;
  size: number;
}

export default function MediaPage() {
  const router = useRouter();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setImages(data.images || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await fetchImages();
      }
    } catch (error) {
      console.error("Error uploading:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Delete "${filename}"?`)) return;

    try {
      const res = await fetch(`/api/media?file=${encodeURIComponent(filename)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages(images.filter(img => img.name !== filename));
        setShowLightbox(false);
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px'
        }}>
          <span onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '40px', cursor: 'pointer', position: 'absolute', top: '20px', right: '20px' }}>×</span>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><FaHome /> Home</Link>
          <Link href="/adminpro/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Edit Profile</Link>
          <Link href="/adminpro/content" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Content</Link>
          <Link href="/adminpro/media" onClick={() => setMenuOpen(false)} style={{ color: '#c9a227', fontSize: '24px', textDecoration: 'none' }}>Media</Link>
          <Link href="/adminpro/credentials" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Credentials</Link>
          <Link href="/adminpro/monitoring" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Monitoring</Link>
          <button onClick={() => { setMenuOpen(false); router.push("/adminpro"); }} style={{ padding: '10px 20px', background: '#c9a227', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}>Logout</button>
        </div>
      )}

      <nav style={{ background: "#333", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            <Link href="/adminpro/media" style={{ color: "#c9a227", textDecoration: "none" }}>Media</Link>
            <Link href="/adminpro/credentials" style={{ color: "white", textDecoration: "none" }}>Credentials</Link>
            <Link href="/adminpro/monitoring" style={{ color: "white", textDecoration: "none" }}>Monitoring</Link>
            <button onClick={() => router.push("/adminpro")} style={{ background: "#c9a227", border: "none", padding: "8px 15px", borderRadius: "5px", color: "white", cursor: "pointer" }}>Logout</button>
          </div>
        )}
      </nav>

      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Media Gallery</h2>

        <div style={{ background: "white", padding: "20px", borderRadius: "15px", marginBottom: "30px" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: uploading ? "#999" : "#c9a227", color: "white", borderRadius: "8px", cursor: uploading ? "not-allowed" : "pointer", fontSize: "16px" }}>
            <FaUpload />
            {uploading ? "Uploading..." : "Upload Images"}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : images.length === 0 ? (
          <p style={{ color: "#666" }}>No images yet. Upload some images to get started.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {images.map((img) => (
              <div
                key={img.name}
                onClick={() => { setSelectedImage(img); setShowLightbox(true); }}
                style={{ background: "white", borderRadius: "10px", overflow: "hidden", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
              >
                <div style={{ height: "150px", overflow: "hidden", background: "#f0f0f0" }}>
                  <img src={img.url} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "10px" }}>
                  <p style={{ margin: 0, fontSize: "14px", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.name}</p>
                  <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#888" }}>{formatSize(img.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLightbox && selectedImage && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex",
          flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}>
          <button
            onClick={() => setShowLightbox(false)}
            style={{ position: "absolute", top: "20px", right: "20px", background: "none", border: "none", color: "white", fontSize: "40px", cursor: "pointer" }}
          >
            ×
          </button>
          <img src={selectedImage.url} alt={selectedImage.name} style={{ maxWidth: "90%", maxHeight: "80%", objectFit: "contain" }} />
          <div style={{ marginTop: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
            <p style={{ color: "white", margin: 0 }}>{selectedImage.name} ({formatSize(selectedImage.size)})</p>
            <button
              onClick={() => handleDelete(selectedImage.name)}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "#dc3545", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '10px', right: '20px', fontSize: '12px', color: '#888' }}>
        Powered by: kmcq-whs.agila
      </div>
    </div>
  );
}