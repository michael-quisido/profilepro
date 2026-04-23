"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Credentials {
  username: string;
  password: string;
  verification_email: string;
}

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [emailCode, setEmailCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dbCreds, setDbCreds] = useState<Credentials>({ username: "admin", password: "admin123", verification_email: "mike082112@gmail.com" });
  const router = useRouter();

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const res = await fetch("/api/credentials");
      if (res.ok) {
        const data = await res.json();
        setDbCreds(data);
        setVerificationEmail(data.verification_email || "");
      }
    } catch (error) {
      console.error('Error fetching credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!verificationEmail) {
      setError("Please enter a verification email");
      return;
    }

    setSending(true);
    setError("");

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: verificationEmail, code }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.dev) {
          alert(`[DEV MODE] Your verification code is: ${code}\n\nIn production, this will be sent to: ${verificationEmail}`);
        } else {
          alert(`Verification code sent to ${verificationEmail}`);
        }
      } else {
        setError("Failed to send verification code");
      }
    } catch (error) {
      console.error('Error sending code:', error);
      setError("Failed to send verification code");
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === dbCreds.username && password === dbCreds.password) {
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
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
        ) : step === 1 && (
          <form onSubmit={handleVerifyCode}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Verification Email</label>
              <input
                type="email"
                value={verificationEmail}
                onChange={(e) => setVerificationEmail(e.target.value)}
                placeholder="Enter your email"
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
                  disabled={sending || !verificationEmail}
                  style={{
                    padding: "10px 15px",
                    background: "#c9a227",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: sending || !verificationEmail ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    opacity: sending || !verificationEmail ? 0.6 : 1
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