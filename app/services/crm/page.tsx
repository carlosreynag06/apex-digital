// app/services/crm/page.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  LuUsers,
  LuLayoutList,
  LuGitMerge,
  LuSquareKanban,
  LuChartBar,
} from "react-icons/lu";

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

// Data for "The Solution" (Core Pillars) section
const differentiators = [
  {
    icon: LuGitMerge,
    title: "Seamless Integration",
    content:
      "Designed to work perfectly with the websites and software we build, our CRM creates a single, unified view of all customer interactions.",
  },
  {
    icon: LuLayoutList,
    title: "Radical Simplicity",
    content:
      "We stripped away the clutter of legacy CRMs. Our interface is clean, fast, and intuitive, so your team can focus on building relationships.",
  },
  {
    icon: LuUsers,
    title: "Built for Growth",
    content:
      "Designed specifically for SMB workflows, our CRM provides the powerful features you need to scale without the enterprise-level complexity you don't.",
  },
];

// Data for "How It Works" (Conceptual Features) section
const capabilities = [
  {
    icon: LuUsers,
    title: "Unified Contact View",
    description:
      "See every touchpoint, from website visits to emails and meetings, in a single, chronological timeline. Get the full context on every lead, instantly.",
  },
  {
    icon: LuSquareKanban,
    title: "Visual Sales Pipeline",
    description:
      "Manage your sales process with a clear, drag-and-drop pipeline. Easily track deals, forecast revenue, and identify bottlenecks before they become problems.",
  },
  {
    icon: LuChartBar,
    title: "Intelligent Dashboards",
    description:
      "Get a real-time overview of your business performance. Our dashboards automatically highlight key metrics, sales activity, and team performance.",
  },
];

export default function CrmPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const problemRef = useRef<HTMLElement | null>(null);
  const pillarsRef = useRef<HTMLElement | null>(null);
  const capabilitiesRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const problemInView = useInView(problemRef, { once: true, amount: 0.2 });
  const pillarsInView = useInView(pillarsRef, { once: true, amount: 0.2 });
  const capabilitiesInView = useInView(capabilitiesRef, {
    once: true,
    amount: 0.2,
  });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <>
      {/* 1. Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-start pt-32 md:pt-40"
      >
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto w-full max-w-[1024px] px-[24px] text-center md:px-[32px]"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-[48px] leading-[1.2] md:text-[52px]"
          >
            Engineered for Your Workflow,
            <span className="block">Not Everyone Else's</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-balance text-lg text-foreground"
          >
            A powerful, intuitive platform designed to be the central hub for
            your customer data, seamlessly integrated with your website.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-block w-full rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100 sm:w-auto"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="#key-features"
              className="inline-block w-full rounded-lg border border-border bg-transparent px-8 py-4 font-medium uppercase tracking-wider text-text-heading transition-colors hover:border-text-body hover:bg-surface sm:w-auto"
            >
              See Key Features
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. The Problem Section */}
      <section ref={problemRef} className="bg-background-alt py-20 lg:py-24">
        <motion.div
          initial="hidden"
          animate={problemInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto max-w-3xl px-[24px] text-center md:px-[32px]"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-3xl md:text-4xl"
          >
            Generic CRMs Weren't Built For You
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-foreground"
          >
            Off-the-shelf CRMs are often bloated with features you'll never
            use, yet they lack the specific tools you actually need. This
            leads to clunky workarounds, frustrated teams, and a disconnected
            view of your customer relationships.
          </motion.p>
        </motion.div>
      </section>

      {/* 3. The Solution (Core Pillars) - CORRECTED */}
      <section ref={pillarsRef} className="py-20 lg:py-24">
        <motion.div
          initial="hidden"
          animate={pillarsInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-[24px] md:grid-cols-3 md:px-[32px]"
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="rounded-2xl p-8 text-white shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #3B82F6 0%, #4F46E5 100%)",
              }}
            >
              <item.icon className="h-8 w-8 text-white/80" />
              <h3 className="mt-4 font-heading text-2xl text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-white/80">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Vertical Rhythm Spacer */}
      <div className="h-[80px] lg:h-[120px]" />

      {/* 4. How It Works (Conceptual Features) */}
      <section
        id="key-features"
        ref={capabilitiesRef}
        className="mx-auto max-w-[1024px] scroll-mt-24 px-[24px] pb-20 md:px-[32px] lg:pb-24"
      >
        <motion.div
          initial="hidden"
          animate={capabilitiesInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-3xl md:text-4xl"
          >
            A Clearer View of Your Business
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-3xl text-balance text-lg text-foreground"
          >
            Our CRM is designed for clarity. Every feature is built to give
            you immediate context and control over your business
            relationships, without the clutter.
          </motion.p>
          <div className="mt-16 space-y-12 text-left">
            {capabilities.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="grid items-center gap-8 md:grid-cols-3"
              >
                <div className="flex items-center gap-4 md:col-span-1">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-surface">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading text-2xl">{feature.title}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="text-lg text-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. Final CTA - CORRECTED */}
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
          className="mx-auto max-w-[1024px] px-[24px] text-center md:px-[32px]"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-3xl md:text-4xl"
          >
            Ready to Build Your Perfect CRM?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-foreground"
          >
            A brief, no-obligation call is the best way to understand your
            unique workflow. Let's design a CRM that gives your team a true
            competitive advantage.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100"
            >
              Book a Discovery Call
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}