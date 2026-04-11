"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Visitor {
  id: string;
  ip: string;
  region: string;
  country: string;
  timestamp: string;
}

export default function Monitoring() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => setVisitors(data));
  }, []);

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
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>Visitor Monitoring</div>
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

      <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "30px", color: "#333" }}>Visitor Log</h2>
        
        <div style={{ background: "white", padding: "20px", borderRadius: "15px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Date and Time</th>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>IP Address</th>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Region</th>
                <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Country</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#888" }}>
                    No visitors yet
                  </td>
                </tr>
              ) : (
                visitors.map((visitor) => (
                  <tr key={visitor.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "15px" }}>{new Date(visitor.timestamp).toLocaleString()}</td>
                    <td style={{ padding: "15px" }}>{visitor.ip}</td>
                    <td style={{ padding: "15px" }}>{visitor.region || "Unknown"}</td>
                    <td style={{ padding: "15px" }}>{visitor.country || "Unknown"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}