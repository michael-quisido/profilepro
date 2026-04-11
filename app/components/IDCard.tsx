"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

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

const defaultProfile: ProfileData = {
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
};

export default function IDCard() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('profileData');
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          setProfile(data);
          localStorage.setItem('profileData', JSON.stringify(data));
        })
        .catch(() => setProfile(defaultProfile));
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About me", href: "/about" },
    { name: "Contact me", href: "/contact" },
  ];

  if (!profile) {
    return null;
  }

  const socialIcons = [
    { name: "Facebook", url: profile.socialLinks.facebook, icon: FaFacebook },
    { name: "Twitter", url: profile.socialLinks.twitter, icon: FaTwitter },
    { name: "Instagram", url: profile.socialLinks.instagram, icon: FaInstagram },
    { name: "LinkedIn", url: profile.socialLinks.linkedin, icon: FaLinkedin },
    { name: "GitHub", url: profile.socialLinks.github, icon: FaGithub },
  ];

  return (
    <>
      {menuOpen && (
        <div className="mobile-menu active">
          <span className="close-btn" onClick={() => setMenuOpen(false)}>×</span>
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {isMobile ? (
        <div className="id-card" style={{ marginTop: '80px', position: 'relative' }}>
          <button 
            className="burger-menu" 
            onClick={() => setMenuOpen(true)}
            style={{ position: 'absolute', top: '10px', left: '10px', display: 'block', zIndex: 10 }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div style={{ padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <img 
              src={profile.photo} 
              alt={profile.name}
              className="owner-photo"
              style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover' }}
            />
            
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{profile.name}</h2>
            
            <p style={{ fontSize: '16px', color: '#666', fontStyle: 'italic' }}>{profile.title}</p>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {socialIcons.map((social) => (
                social.url && (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ width: '40px', height: '40px' }}
                  >
                    {social.icon && <social.icon size={20} />}
                  </a>
                )
              ))}
            </div>
            
            <div style={{ width: '100%', textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: '#333' }}>{profile.email}</p>
            </div>
            
            <div style={{ width: '100%', textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: '#888' }}>Powered by: kmcq-whs.agila</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="id-card swing-animation" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cpath d='M0 600 C 200 400, 300 500, 400 300 C 500 100, 600 200, 800 0 L 800 600 Z' fill='%23c9a227' fill-opacity='0.15'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover',
              pointerEvents: 'none',
            }} />
            
            <div style={{ padding: '0 30px', position: 'relative', zIndex: 1 }}>
              <nav className="desktop-menu" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', paddingTop: '30px' }}>
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`menu-item ${pathname === item.href ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="id-card-content" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <img 
                  src={profile.photo} 
                  alt={profile.name}
                  className="owner-photo"
                  style={{ width: '150px', height: '150px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }}
                />
                
                <div className="info-section" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '70px' }}>
                  <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>{profile.name}</h2>
                  <p style={{ fontSize: '18px', color: '#666', fontStyle: 'italic', marginTop: '-3px' }}>{profile.title}</p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
                {socialIcons.map((social) => (
                  social.url && (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      {social.icon && <social.icon size={28} />}
                    </a>
                  )
                ))}
              </div>

              <div className="email-section" style={{ textAlign: 'right', marginTop: '20px' }}>
                <p style={{ fontSize: '14px', color: '#333' }}>{profile.email}</p>
              </div>

              <div className="powered-section" style={{ textAlign: 'right', marginTop: '10px', marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', color: '#888' }}>Powered by: kmcq-whs.agila</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}