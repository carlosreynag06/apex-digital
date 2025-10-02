"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background-alt text-foreground">
      <div className="mx-auto max-w-[1280px] px-[24px] py-16 md:px-[32px]">
        <div className="grid items-start gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & Brand Statement */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Return to homepage" className="block">
              <Image
                src="/logo.svg"
                alt="IQ Integrations Logo"
                width={98}
                height={36}
                className="block"
              />
            </Link>
            <p className="mt-3 text-text-muted">
              Building intelligent website systems that function as 24/7 client acquisition machines.
            </p>
          </div>

          {/* Column 2: Sitemap */}
          <div>
            <h6 className="font-semibold uppercase text-text-heading">Sitemap</h6>
            <ul className="mt-4 space-y-3 text-text-muted">
              <li>
                <Link href="/services" className="transition-colors hover:text-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="transition-colors hover:text-accent">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="transition-colors hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/prices" className="transition-colors hover:text-accent">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/services/crm" className="transition-colors hover:text-accent">
                  CRM
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h6 className="font-semibold uppercase text-text-heading">Legal & Support</h6>
            <ul className="mt-4 space-y-3 text-text-muted">
              <li>
                <Link href="/faq" className="transition-colors hover:text-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="transition-colors hover:text-accent">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h6 className="font-semibold uppercase text-text-heading">Contact</h6>
            <ul className="mt-4 space-y-3 text-text-muted">
              <li>
                <a href="mailto:contact@iqintegrations.com" className="transition-colors hover:text-accent">
                  contact@iqintegrations.com
                </a>
              </li>
              <li>
                <a href="tel:223-237-5309" className="transition-colors hover:text-accent">
                  223-237-5309
                </a>
              </li>
            </ul>
            {/* Social links removed as requested */}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between border-t border-border pt-8 sm:flex-row">
          <p className="mt-4 text-sm text-text-muted sm:mt-0">
            &copy; {year} IQ Integrations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
