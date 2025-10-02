"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

// SVG Icon Components
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Nav Items
const NAV_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about-us", label: "About" },
  { href: "/prices", label: "Pricing" },
  { href: "/services/crm", label: "CRM" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-background-alt/80 backdrop-blur-lg transition-colors duration-300 ${
        hasScrolled ? "border-b border-border" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-[24px] md:px-[32px]">
        <Link href="/" aria-label="Return to homepage">
          <Image
            src="/logo.svg"
            alt="IQ Integrations Logo"
            width={88}
            height={32}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 transition-all duration-200 hover:scale-105 hover:text-accent focus-visible:text-accent focus-visible:outline-none ${
                  isActive ? "text-accent" : "text-text-body"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-accent px-6 py-3 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100"
          >
            Book A Call
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon className="h-6 w-6 text-text-heading" />
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-20 items-center justify-between px-6">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Return to homepage"
                >
                  <Image
                    src="/logo.svg"
                    alt="IQ Integrations Logo"
                    width={88}
                    height={32}
                    priority
                  />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <XIcon className="h-6 w-6 text-text-heading" />
                </button>
              </div>
              <nav className="mt-8 flex flex-1 flex-col items-center gap-6">
                {[
                  { href: "/", label: "Home" },
                  ...NAV_ITEMS,
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl text-text-heading transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-6">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-lg bg-accent px-8 py-4 text-center font-medium uppercase tracking-wider text-accent-foreground"
                >
                  Book A Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}