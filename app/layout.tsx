import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Sabio al Vivir — Claridad, calma y propósito",
  description:
    "Acompañamiento profesional y recursos prácticos para vivir con mayor claridad, calma y propósito. Enfoque humano, accesible y realista para tu bienestar.",
  icons: { icon: "/favicon.ico" },
  keywords: [
    "bienestar",
    "crecimiento personal",
    "hábitos",
    "estrés",
    "atención plena",
    "vida con propósito",
    "República Dominicana",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sabio al Vivir",
    description:
      "Guía práctica para vivir con claridad, calma y propósito.",
    url: "/",
    siteName: "Sabio al Vivir",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        {/* Header fijo con blur; alto definido en CSS vars */}
        <Header />
        <main id="contenido" className="main-with-sticky">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
