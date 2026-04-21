"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

interface Image {
  name: string;
  url: string;
}

function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [images, setImages] = useState<Image[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [highlightPicker, setHighlightPicker] = useState(false);
  const [fontSize, setFontSize] = useState('14');
  const [highlightColor, setHighlightColor] = useState('#ffff00');
  const editorRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (editorRef.current && !initialized.current) {
      editorRef.current.innerHTML = value;
      initialized.current = true;
    }
  }, []);

  const execCommand = (command: string, val?: string) => {
    document.execCommand(command, false, val);
  };

  const insertImage = (url: string) => {
    execCommand('insertImage', url);
    setShowImagePicker(false);
  };

  const handleAlign = (align: string) => {
    if (editorRef.current) {
      editorRef.current.style.textAlign = align;
    }
  };

  const handleFontSize = (size: string) => {
    setFontSize(size);
    execCommand('fontSize', size);
  };

  const handleHighlight = (color: string) => {
    setHighlightColor(color);
    execCommand('hiliteColor', color);
  };

  const handleBlur = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px 8px 0 0',
        background: '#f5f5f5',
        padding: '8px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        alignItems: 'center',
        borderBottom: 'none'
      }}>
        <button type="button" onClick={() => execCommand('bold')} style={buttonStyle} title="Bold">B</button>
        <button type="button" onClick={() => execCommand('italic')} style={buttonStyle} title="Italic">I</button>
        <button type="button" onClick={() => execCommand('underline')} style={buttonStyle} title="Underline">U</button>
        
        <span style={{ width: '1px', height: '20px', background: '#ccc', margin: '0 5px' }}></span>
        
        <button type="button" onClick={() => handleAlign('left')} style={buttonStyle} title="Align Left">⫷</button>
        <button type="button" onClick={() => handleAlign('center')} style={buttonStyle} title="Align Center">≡</button>
        <button type="button" onClick={() => handleAlign('right')} style={buttonStyle} title="Align Right">⫸</button>
        
        <span style={{ width: '1px', height: '20px', background: '#ccc', margin: '0 5px' }}></span>
        
        <select value={fontSize} onChange={(e) => handleFontSize(e.target.value)} style={inputStyle}>
          <option value="1">8px</option>
          <option value="2">10px</option>
          <option value="3">12px</option>
          <option value="4">14px</option>
          <option value="5">18px</option>
          <option value="6">24px</option>
          <option value="7">36px</option>
        </select>

        <span style={{ width: '1px', height: '20px', background: '#ccc', margin: '0 5px' }}></span>

        <div style={{ position: 'relative' }}>
          <button type="button" onClick={() => { setHighlightPicker(!highlightPicker); setShowImagePicker(false); }} style={buttonStyle}><span style={{ background: highlightColor, padding: '2px 8px', borderRadius: '3px', border: '1px solid #333' }}>HL</span></button>
          {highlightPicker && (
            <input type="color" value={highlightColor} onChange={(e) => handleHighlight(e.target.value)} style={{ position: 'absolute', top: '100%', left: '0', marginTop: '5px' }} />
          )}
        </div>

        <span style={{ width: '1px', height: '20px', background: '#ccc', margin: '0 5px' }}></span>

        <div style={{ position: 'relative' }}>
          <button type="button" onClick={() => { setShowImagePicker(!showImagePicker); setHighlightPicker(false); }} style={buttonStyle}>📷</button>
          {showImagePicker && (
            <div style={{ position: 'absolute', top: '100%', left: '0', marginTop: '5px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', zIndex: 100, maxHeight: '300px', overflowY: 'auto', width: '250px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>Select Image</p>
              {images.length === 0 ? (
                <p style={{ color: '#666', fontSize: '12px' }}>No images available</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {images.map((img) => (
                    <div key={img.name} onClick={() => insertImage(img.url)} style={{ cursor: 'pointer', border: '2px solid transparent', borderRadius: '4px', padding: '4px' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c9a227')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}>
                      <img src={img.url} alt={img.name} style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                      <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div 
        ref={editorRef}
        contentEditable 
        suppressContentEditableWarning
        onBlur={handleBlur}
        style={{ 
          border: '1px solid #ddd', 
          borderRadius: '0 0 8px 8px', 
          padding: '15px', 
          minHeight: '200px', 
          maxHeight: '400px', 
          overflowY: 'auto', 
          outline: 'none', 
          background: 'white'
        }} 
      />
    </div>
  );
}

const buttonStyle: React.CSSProperties = { padding: '6px 12px', background: 'white', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', minWidth: '32px' };
const inputStyle: React.CSSProperties = { padding: '6px 8px', border: '1px solid #ddd', borderRadius: '4px', background: 'white', cursor: 'pointer' };

const defaultAbout = `I excel in crafting and cultivating high-quality lists that drive exceptional results. With a keen eye for detail and an unwavering commitment to excellence, I employ my expertise in email search techniques to locate elusive contacts and valuable leads.
I am dedicated to helping businesses reach new heights by providing them with the most accurate and targeted lists possible.
Let me be your guide in building a robust network and maximizing your outreach potential. ;)`

export default function AboutContent() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [content, setContent] = useState(defaultAbout);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch("/api/db/about");
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error("Error loading about:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAbout();
  }, []);

  const handleSave = async () => {
    try {
      await fetch("/api/db/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving about:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {menuOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <span onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '40px', cursor: 'pointer', position: 'absolute', top: '20px', right: '20px' }}>×</span>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><FaHome /> Home</Link>
          <Link href="/adminpro/dashboard" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Edit Profile</Link>
          <Link href="/adminpro/content" onClick={() => setMenuOpen(false)} style={{ color: '#c9a227', fontSize: '24px', textDecoration: 'none' }}>Content</Link>
          <Link href="/adminpro/media" onClick={() => setMenuOpen(false)} style={{ color: 'white', fontSize: '24px', textDecoration: 'none' }}>Media</Link>
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
            <Link href="/adminpro/content" style={{ color: "#c9a227", textDecoration: "none" }}>Content</Link>
            <Link href="/adminpro/media" style={{ color: "white", textDecoration: "none" }}>Media</Link>
            <Link href="/adminpro/credentials" style={{ color: "white", textDecoration: "none" }}>Credentials</Link>
            <Link href="/adminpro/monitoring" style={{ color: "white", textDecoration: "none" }}>Monitoring</Link>
            <button onClick={() => router.push("/adminpro")} style={{ background: "#c9a227", border: "none", padding: "8px 15px", borderRadius: "5px", color: "white", cursor: "pointer" }}>Logout</button>
          </div>
        )}
      </nav>

      <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "10px", color: "#333" }}>Edit About Page</h2>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <Link href="/adminpro/content/projects" style={{ padding: '8px 16px', background: '#666', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>Projects</Link>
          <Link href="/adminpro/content/about" style={{ padding: '8px 16px', background: '#c9a227', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>About</Link>
          <Link href="/adminpro/content/contact" style={{ padding: '8px 16px', background: '#666', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>Contact</Link>
        </div>
        
        <div style={{ background: "white", padding: "30px", borderRadius: "15px", marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>About Content</h3>
          <RichTextEditor
            value={content}
            onChange={setContent}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={handleSave} style={{ padding: "12px 30px", background: "#c9a227", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}>Save Changes</button>
          {saved && <span style={{ color: "green" }}>Saved successfully!</span>}
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '10px', right: '20px', fontSize: '12px', color: '#888' }}>Powered by: kmcq-whs.agila</div>
    </div>
  );
}