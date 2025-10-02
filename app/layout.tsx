import type { Metadata } from "next";
import "./globals.css";
import { Inter, DM_Serif_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif-display",
  weight: "400",
});

export const metadata: Metadata = {
  title: "IQ Integrations | Intelligent Luxury",
  description:
    "IQ Integrations transforms your online presence into a strategic, automated asset that works 24/7 to generate qualified leads and drive measurable growth.",
  icons: { icon: "/favicon.ico" },
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "IQ Integrations | Intelligent Luxury",
    description:
      "IQ Integrations transforms your online presence into a strategic, automated asset that works 24/7 to generate qualified leads and drive measurable growth.",
    url: "https://example.com",
    siteName: "IQ Integrations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQ Integrations | Intelligent Luxury",
    description:
      "IQ Integrations transforms your online presence into a strategic, automated asset that works 24/7 to generate qualified leads and drive measurable growth.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifDisplay.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute left-4 top-4 z-[100] rounded-md bg-accent px-3 py-2 text-accent-foreground"
        >
          Skip to content
        </a>
        <Header />
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}