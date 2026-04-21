"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [emailCode, setEmailCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const handleSendCode = async () => {
    if (!userEmail) {
      alert("Please enter your email address");
      return;
    }
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setSending(true);
    
    try {
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, code }),
      });
      
      if (res.ok) {
        alert('Verification code sent to ' + userEmail);
      } else {
        alert('Code shown for testing: ' + code);
      }
    } catch {
      alert('Error. Code shown for testing: ' + code);
    } finally {
      setSending(false);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailCode === generatedCode && generatedCode !== "") {
      setStep(2);
      setError("");
    } else {
      setError("Invalid verification code");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('adminCreds') || '{"username":"admin","password":"admin123"}');
    if (username === stored.username && password === stored.password) {
      try {
        await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login' }),
          credentials: 'include',
        });
      } catch {}
      router.push("/adminpro/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#1a1a1a",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Admin Login</h1>
        
        {step === 1 && (
          <form onSubmit={handleVerifyCode}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Your Email Address</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginBottom: "10px"
                }}
              />
            </div>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Verification Code</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  placeholder="Enter code"
                  required
                  style={{
                    flex: 1,
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={sending}
                  style={{
                    padding: "10px 15px",
                    background: "#c9a227",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: sending ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    opacity: sending ? 0.7 : 1
                  }}
                >
                  {sending ? "Sending..." : "Send Code"}
                </button>
              </div>
            </div>
            
            {error && <p style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>{error}</p>}
            
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#c9a227",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Verify Code
            </button>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>
            
            {error && <p style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>{error}</p>}
            
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#c9a227",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Login
            </button>
          </form>
          )}
      </div>
      <div style={{ position: 'fixed', bottom: '10px', right: '20px', fontSize: '12px', color: '#888' }}>
        Powered by: kmcq-whs.agila
      </div>
    </div>
  );
}