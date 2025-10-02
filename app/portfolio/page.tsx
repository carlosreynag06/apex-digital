// app/portfolio/page.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as const },
  },
};

// Data for the logo-based testimonials
const logoTestimonials = [
  {
    quote:
      "Our digital presence was nonexistent. IQ Integrations built us a professional website system that has become our primary source of new client consultations, increasing our qualified leads by over 22%.",
    name: "Lorna Alvarado",
    company: "The Law Firm",
    imageSrc: "/law-firm.svg",
    imageAlt: "The Law Firm Logo",
  },
  {
    quote:
      "Our new website makes booking appointments effortless for our patients, which has dramatically reduced no-shows. The professional design has also given our clinic a huge boost in credibility online.",
    name: "Dr. Emily White",
    company: "Hanover and Tyke",
    imageSrc: "/physical-therapy.svg",
    imageAlt: "Hanover and Tyke Logo",
  },
  {
    quote:
      "In the luxury real estate market, image is everything. IQ Integrations delivered a sophisticated, high-end website that perfectly captures our brand and showcases our properties with stunning visuals.",
    name: "Rita Mae",
    company: "Luxury Estate",
    imageSrc: "/real-state-logo.svg",
    imageAlt: "Luxury Estate Logo",
  },
  {
    quote:
      "We needed a website that was as beautiful as our food. IQ Integrations delivered a visually stunning site with an integrated online ordering system that has increased our takeout revenue by 30%.",
    name: "Kimberly Vang",
    company: "KIM'S Restaurant",
    imageSrc: "/restaurant-logo.svg",
    imageAlt: "KIM'S Restaurant Logo",
  },
];

export default function PortfolioPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const testimonialsRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.1,
  });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <>
      {/* 1. Hero - CORRECTED */}
      <section
        ref={heroRef}
        className="relative flex items-center pt-32 pb-20 md:pt-40 lg:pb-24"
      >
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-[24px] md:grid-cols-2 md:px-[32px]"
        >
          {/* Left Column: Text */}
          <motion.div variants={itemVariants}>
            <h1 className="font-heading text-[48px] leading-[1.2] md:text-[60px]">
              Engineered for Measurable Results
            </h1>
            <p className="mt-4 max-w-xl text-balance text-lg text-foreground">
              Our systems are designed to create a decisive operational
              advantage. See how we've helped our partners transform their
              businesses.
            </p>
            <motion.div variants={itemVariants} className="mt-8">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100"
              >
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Featured Testimonial */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-8 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #3B82F6 0%, #4F46E5 100%)",
            }}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 flex-shrink-0">
                <Image
                  src="/sara-headshot.jpg"
                  alt="Headshot of Sarah Jenkins"
                  fill
                  className="rounded-full object-cover"
                  sizes="80px"
                />
              </div>
              <div>
                <h6 className="text-lg font-semibold text-white">
                  Sarah Jenkins
                </h6>
                <p className="text-sm text-white/80">Grove Logistics</p>
              </div>
            </div>
            <blockquote className="mt-6 text-xl font-light italic text-white">
              &ldquo;The website system IQ Integrations built for us is more
              than a brochure—it's a lead-generation machine. Our consultation
              bookings have increased by 40%, and the investment paid for
              itself in under six months.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Testimonials List */}
      <section
        ref={testimonialsRef}
        className="mx-auto max-w-[1024px] px-[24px] py-20 md:px-[32px] lg:py-24"
      >
        <motion.div
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-center font-heading text-[36px] leading-[1.3] md:text-[40px]"
          >
            From Our Partners
          </motion.h2>
          <div className="mt-12 space-y-8">
            {logoTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="flex flex-col items-start gap-6 rounded-2xl bg-surface p-8 shadow-lg sm:flex-row sm:gap-8"
              >
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.imageAlt}
                    fill
                    className="object-contain grayscale brightness-[0.4] contrast-[2] transition-all duration-300 hover:grayscale-0 hover:brightness-100 hover:contrast-100"
                    sizes="96px"
                  />
                </div>
                <div className="flex-grow">
                  <blockquote className="text-xl font-light italic text-text-heading">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-text-muted">
                    <span className="font-semibold text-text-heading">
                      {testimonial.name}
                    </span>
                    , {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. Final CTA */}
      <section
        ref={ctaRef}
        className="py-20 lg:py-24"
        style={{
          background:
            "radial-gradient(circle at top left, #E0E7FF 0%, #F9FAFB 40%)",
        }}
      >
        <motion.div
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto max-w-[1280px] px-[24px] text-center md:px-[32px]"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-[36px] leading-[1.3] text-text-heading md:text-[40px]"
          >
            Ready to Engineer Your Advantage?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-foreground"
          >
            A brief, no-obligation call is the first step toward building a
            true digital asset for your business.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100"
            >
              Schedule a No-Obligation Call
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}