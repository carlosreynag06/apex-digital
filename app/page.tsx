"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { LuArrowUpRight, LuClock, LuTrendingUp, LuUsers } from "react-icons/lu";

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

const metricCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as const },
  },
};

// Data for the hero metric cards with updated brand gradients
const heroMetrics = [
  {
    icon: LuTrendingUp,
    value: "+20%",
    label: "Lead Increase",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #A78BFA 100%)",
  },
  {
    icon: LuArrowUpRight,
    value: "+15%",
    label: "Conversion Lift",
    gradient: "linear-gradient(135deg, #A78BFA 0%, #3B82F6 100%)",
  },
  {
    icon: LuClock,
    value: "+10",
    label: "Hours Saved Weekly",
    gradient: "linear-gradient(135deg, #E0E7FF 0%, #3B82F6 100%)",
  },
  {
    icon: LuUsers,
    value: "+25%",
    label: "Client Engagement",
    gradient: "linear-gradient(135deg, #DBEAFE 0%, #A78BFA 100%)",
  },
];

const unifiedGradient = "linear-gradient(135deg, #3B82F6 0%, #4F46E5 100%)";

// Data for Service Pillars, updated to three items with brand gradients
const servicePillars = [
  {
    title: "Intelligent Websites",
    description:
      "High-performance websites engineered to be your #1 salesperson, attracting qualified leads around the clock.",
    gradient: unifiedGradient,
  },
  {
    title: "AI Integrations",
    description:
      "Embed intelligent automation into your digital core, from smart chatbots to insightful dashboards.",
    gradient: unifiedGradient,
  },
  {
    title: "Custom CRM",
    description:
      "A powerful, intuitive platform to be the central hub for your customer data, seamlessly integrated with your business.",
    gradient: unifiedGradient,
  },
];

// Data for Process Overview with expanded descriptions
const processSteps = [
  {
    title: "01. DISCOVERY & STRATEGY",
    description:
      "We start with a deep dive into your business, target audience, and objectives. This ensures the strategic blueprint we create is perfectly aligned with your vision for growth.",
  },
  {
    title: "02. ARCHITECTURE & DEVELOPMENT",
    description:
      "Our team designs and develops a pixel-perfect, high-performance website system. We focus on clean code and a scalable foundation to create a reliable long-term asset for your business.",
  },
  {
    title: "03. REVISION & OPTIMIZATION",
    description:
      "We present the initial build for your feedback, collaborating closely to refine every detail. This iterative process ensures the final product exceeds your expectations.",
  },
  {
    title: "04. DEPLOYMENT & EVOLUTION",
    description:
      "We handle the full deployment process for a seamless launch. Afterward, we leverage analytics to provide continuous, data-driven improvements, ensuring your digital asset appreciates over time.",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const corePromiseRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const processRef = useRef<HTMLElement | null>(null);
  const finalCtaRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const corePromiseInView = useInView(corePromiseRef, {
    once: true,
    amount: 0.2,
  });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.5 });

  return (
    <>
      {/* 1. Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen w-full items-center"
        style={{
          background: "radial-gradient(circle at top left, #E0E7FF 0%, #F9FAFB 40%)",
        }}
      >
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-[24px] md:grid-cols-2 md:px-[32px]"
        >
          {/* Left Column */}
          <motion.div variants={itemVariants} className="text-left">
            <h1 className="font-heading text-[48px] leading-[1.2] md:text-[60px] lg:text-[72px]">
              <span className="whitespace-nowrap">Intelligent Websites</span>
              <span className="block">Client Acquisition Machines</span>
            </h1>
            <p className="mt-4 max-w-xl text-balance text-[16px] text-foreground md:text-[17px] lg:text-[18px]">
              IQ Integrations transforms your online presence into a strategic,
              automated asset that works 24/7 to generate qualified leads and
              drive measurable growth.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block w-full rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100 sm:w-auto"
              >
                Book A Call
              </Link>
              <Link
                href="/services"
                className="inline-block w-full rounded-lg border border-border bg-background-alt px-8 py-4 font-medium uppercase tracking-wider text-text-heading transition-colors hover:border-text-body hover:bg-white sm:w-auto"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex items-center justify-center">
            <motion.div
              variants={sectionVariants}
              className="grid max-w-sm grid-cols-2 gap-4 md:gap-6"
            >
              {heroMetrics.map((metric) => (
                <motion.div
                  key={metric.label}
                  variants={metricCardVariants}
                  className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl p-4 text-center text-white shadow-lg"
                  style={{ background: metric.gradient }}
                >
                  <metric.icon className="h-8 w-8" />
                  <p className="font-heading text-3xl md:text-4xl">
                    {metric.value}
                  </p>
                  <p className="text-sm opacity-80">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. Core Promise */}
      <section ref={corePromiseRef} className="bg-background-alt py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-[24px] md:px-[32px]">
          <motion.div
            initial="hidden"
            animate={corePromiseInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="grid items-center gap-12 md:grid-cols-2 md:gap-[80px]"
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-heading text-[36px] leading-[1.3] md:text-[48px] lg:text-[56px]">
                Beyond a Website. A Digital Ecosystem
              </h2>
              <p className="mt-4 text-[16px] text-foreground md:text-[17px] lg:text-[18px]">
                Most agencies deliver a beautiful but passive website.
                We build intelligent, integrated systems. Your website becomes
                the central hub of an automated machine designed to attract,
                engage, and convert your ideal clients, giving you a
                formidable competitive advantage.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Image
                src="/website-services.png"
                alt="Dashboard showing website analytics and lead data"
                width={800}
                height={450}
                className="h-auto w-full rounded-2xl object-cover shadow-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Service Pillars */}
      <section
        ref={servicesRef}
        className="mx-auto w-full px-[24px] py-20 md:px-[32px] lg:py-24"
      >
        <motion.div
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left Column: Text */}
          <motion.div variants={itemVariants} className="lg:pr-8">
            <h2 className="font-heading text-[36px] leading-[1.3] md:text-[40px]">
              Intelligent Systems, Automated Results
            </h2>
            <p className="mt-4 text-lg text-foreground">
             The era of the static "digital brochure" is over. A modern online presence must do more than just represent your brand—it must actively work to grow it. This requires a fundamental shift in thinking, from a simple website to an intelligent, automated system.
            </p>
          </motion.div>

          {/* Right Column: Cards */}
          <div className="flex flex-col gap-8">
            {servicePillars.map((pillar) => (
              <motion.div key={pillar.title} variants={itemVariants}>
                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl p-8 text-white shadow-xl transition-transform duration-300 hover:-translate-y-2"
                >
                  <div
                    className="absolute inset-0 z-0"
                    style={{ background: pillar.gradient }}
                  />
                  <div className="absolute inset-0 z-0 bg-black/20" />
                  <div className="relative z-10 flex h-full flex-col">
                    <h3 className="font-heading text-[24px] lg:text-[30px]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 flex-1 opacity-80">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. Our Blueprint for Your Success (Process) */}
      <section ref={processRef} className="bg-background-alt py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-[24px] md:px-[32px]">
          <motion.div
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-center font-heading text-[36px] leading-[1.3] md:text-[48px] lg:text-[56px]"
            >
              Our Blueprint for Your Success
            </motion.h2>
            <div className="relative mt-16 flex flex-col gap-16 md:gap-8">
              <div className="absolute left-0 top-0 hidden h-full w-[1px] bg-border" />
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="relative grid gap-4 text-center md:grid-cols-2 md:text-left"
                >
                  <div
                    className={
                      index % 2 === 0
                        ? "md:pr-8 md:text-right"
                        : "md:col-start-2 md:pl-8"
                    }
                  >
                    <h6 className="font-semibold uppercase tracking-widest text-text-heading">
                      {step.title}
                    </h6>
                    <p className="mt-2 text-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section
        ref={finalCtaRef}
        className="py-20 lg:py-24"
        style={{
          background: "linear-gradient(95deg, #E0E7FF 0%, #FFFFFF 100%)",
        }}
      >
        <motion.div
          initial="hidden"
          animate={finalCtaInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto max-w-[1280px] px-[24px] text-center md:px-[32px]"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-[36px] leading-[1.3] text-text-heading md:text-[40px]"
          >
            Ready to Build Your Strategic Asset?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-foreground"
          >
            Let's discuss how an intelligent digital ecosystem can transform
            your business.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100"
            >
              Book a No-Obligation Call
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}