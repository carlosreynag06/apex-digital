// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// A simple, organic SVG logo that uses the new brand colors
const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 2.00001C12.8337 5.21601 9.40371 10.664 16 16C22.5963 21.336 27.1663 26.784 16 30"
      stroke="rgb(var(--secondary))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2.00001C19.1663 5.21601 22.5963 10.664 16 16C9.40371 21.336 4.83371 26.784 16 30"
      stroke="rgb(var(--primary))"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.7"
    />
  </svg>
);

const NAV_ITEMS = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-lidia", label: "Sobre Lidia" },
  { href: "/servicios", label: "Servicios" },
  { href: "/testimonios", label: "Testimonios" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  // Close menu on route change (useful for single-page apps)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        elevated
          ? "bg-[rgb(var(--background))]/80 shadow-lg shadow-black/5 backdrop-blur-lg"
          : "bg-transparent shadow-none"
      }`}
      style={{ height: "var(--header-height-mobile)" }} // Reverted to use CSS var
    >
      <div className="container-padded flex h-full items-center justify-between">
        {/* Logo / Brand Name */}
        <Link href="/" className="flex items-center gap-2" aria-label="Volver al inicio">
          <Logo />
          <span className="font-lora text-lg font-medium text-[rgb(var(--text-primary))]">
            Sabio al Vivir
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="relative z-10 ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <div aria-hidden className="relative h-3.5 w-5">
            <span className={`absolute inset-x-0 top-0 h-0.5 bg-[rgb(var(--text-primary))] transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-1.5 h-0.5 bg-[rgb(var(--text-primary))] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 top-3 h-0.5 bg-[rgb(var(--text-primary))] transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Principal">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-[rgb(var(--text-primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))]">
              {item.label}
            </a>
          ))}
          <a href="/contacto" className="ml-4 inline-flex items-center rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgb(var(--primary))]">
            Agendar
          </a>
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 z-0 transform transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div 
          className="absolute inset-0 bg-[rgb(var(--background))]/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <nav className="container-padded relative z-10 mt-[var(--header-height-mobile)] flex h-full flex-col gap-4 py-8" aria-label="Principal móvil"> {/* Use var for margin-top */}
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-lg font-medium text-[rgb(var(--text-primary))] transition-colors hover:bg-[rgb(var(--accent))]">
              {item.label}
            </a>
          ))}
          <a href="/contacto" onClick={() => setOpen(false)} className="mt-6 inline-flex items-center justify-center rounded-full bg-[rgb(var(--primary))] px-6 py-3 text-lg font-medium text-white shadow-lg">
            Agendar conversación
          </a>
        </nav>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          header {
            height: var(--header-height-desktop);
          }
        }
      `}</style>
    </header>
  );
}