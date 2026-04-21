"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Content() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/adminpro/content/projects");
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
      <p>Redirecting to Projects...</p>
    </div>
  );
}
