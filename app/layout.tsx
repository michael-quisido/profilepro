import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProfilePro - Jhona Aima C. Quisido",
  description: "Expert Web Research Specialist",
  icons: {
    icon: "/icon/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}