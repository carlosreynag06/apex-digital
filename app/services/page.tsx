// app/services/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  LuMail,
  LuSmartphone,
  LuBot,
  LuPhoneForwarded,
  LuSearch,
  LuPalette,
  LuLayoutList,
  LuPlus,
  LuMinus,
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

// Data grouped into thematic "Problem/Solution" blocks
const serviceBlocks = [
  {
    problemTitle: "Struggling to Attract Qualified Leads?",
    imageSrc: "/leads.jpeg",
    imageAlt: "Dashboard showing website analytics and lead generation data",
    features: [
      {
        icon: LuPalette,
        title: "Beautiful Designs",
        description:
          "Our custom designs are not only stunning but also engineered for conversions, creating a seamless user experience that builds trust and authority.",
      },
      {
        icon: LuSearch,
        title: "Advanced SEO Foundation",
        description:
          "We architect your site for maximum visibility, helping you rank higher in search results to attract more organic traffic.",
      },
      {
        icon: LuSmartphone,
        title: "Mobile Optimization",
        description:
          "Every system is designed to be flawless on any device, ensuring a perfect experience for all your users.",
      },
    ],
  },
  {
    problemTitle: "Losing Time to Repetitive Tasks?",
    imageSrc: "/automation.jpeg",
    imageAlt: "Abstract image representing intelligent automation",
    features: [
      {
        icon: LuBot,
        title: "24/7 Chatbot Integration",
        description:
          "Our AI chatbot engages with visitors, answers questions, and qualifies leads around the clock, so you never miss a business opportunity.",
      },
      {
        icon: LuMail,
        title: "Email Marketing Automation",
        description:
          "We integrate strategic marketing campaigns that automatically send targeted emails to nurture leads and convert prospects into long-term clients.",
      },
      {
        icon: LuPhoneForwarded,
        title: "Missed Call-Text Back Systems",
        description:
          "Automatically follow up with a text message to anyone who calls and hangs up, instantly re-engaging potential clients.",
      },
    ],
  },
  {
    problemTitle: "Is Your Customer Data Disorganized?",
    imageSrc: "/crm.jpeg",
    imageAlt: "A clean dashboard for a Custom CRM system",
    features: [
      {
        icon: LuLayoutList,
        title: "Custom CRM",
        description:
          "Your customer relationships are your most valuable asset. Our custom CRM solutions centralize every interaction in a clean, intuitive platform. This isn't a complex, off-the-shelf tool; it's a strategic hub that empowers you to focus on building lasting relationships.",
      },
    ],
  },
];

// Beauty-upgraded accordion row (kept); neutralized (no glow)
const AccordionItem = ({
  feature,
}: {
  feature: (typeof serviceBlocks)[0]["features"][0];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="first:border-t-0 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex w-full items-center gap-4 rounded-xl border border-border bg-surface px-4 py-3 text-left transition-transform"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <feature.icon className="h-5 w-5" />
        </span>
        <span className="flex-1 text-lg font-semibold text-text-heading">
          {feature.title}
        </span>
        {isOpen ? (
          <LuMinus className="h-5 w-5 flex-shrink-0 text-text-muted" />
        ) : (
          <LuPlus className="h-5 w-5 flex-shrink-0 text-text-muted" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <div className="mx-1 mt-2 rounded-xl border border-border bg-background p-4">
              <p className="text-foreground">{feature.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// CRM benefits derived from existing copy (no new claims)
const crmBenefits = [
  {
    icon: LuLayoutList,
    title: "Centralize Every Interaction",
    text: "Our custom CRM solutions centralize every interaction in a clean, intuitive platform.",
  },
  {
    icon: LuSmartphone,
    title: "Clean, Intuitive Platform",
    text: "A clean, intuitive platform designed to keep your data organized.",
  },
  {
    icon: LuPalette,
    title: "Focus on Relationships",
    text: "A strategic hub that empowers you to focus on building lasting relationships.",
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const philosophyRef = useRef<HTMLElement | null>(null);
  const solutionsRef = useRef<HTMLElement | null>(null);
  const finalCtaRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const philosophyInView = useInView(philosophyRef, {
    once: true,
    amount: 0.2,
  });
  const solutionsInView = useInView(solutionsRef, { once: true, amount: 0.1 });
  const finalCtaInView = useInView(finalCtaRef, { once: true, amount: 0.5 });

  return (
    <>
      {/* 1. Hero (unchanged) */}
      <section ref={heroRef} className="pt-header">
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto grid max-w-[1280px] items-center gap-12 px-[24px] py-20 md:grid-cols-2 md:px-[32px] lg:py-24"
        >
          <motion.div variants={itemVariants} className="text-left">
            <h1 className="font-heading text-[48px] leading-[1.2] md:text-[60px]">
              Integrated Digital Solutions
            </h1>
            <p className="mt-4 max-w-xl text-balance text-lg text-foreground">
              We provide a comprehensive suite of services designed to work in
              concert, creating a powerful, self-sustaining system for business
              growth.
            </p>
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-start gap-4 sm:flex-row"
            >
              <Link
                href="/prices"
                className="inline-block w-full rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100 sm:w-auto"
              >
                See Pricing Plans
              </Link>
              <Link
                href="/contact"
                className="inline-block w-full rounded-lg border border-border bg-background-alt px-8 py-4 font-medium uppercase tracking-wider text-text-heading transition-colors hover:border-text-body hover:bg-white sm:w-auto"
              >
                Book a Consultation
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="min-w-0 overflow-visible"
          >
            <Image
              src="/service.jpeg"
              alt="Dashboard showing website analytics and lead generation data"
              width={800}
              height={450}
              className="h-auto w-full rounded-2xl border border-border shadow-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Central Philosophy Section (reduced bottom padding to close the gap) */}
      <section
        ref={philosophyRef}
        className="bg-background-alt pt-20 pb-10 lg:pt-24 lg:pb-12"
      >
        <motion.div
          initial="hidden"
          animate={philosophyInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto max-w-[1024px] px-[24px] text-center md:px-[32px]"
        >
          <motion.h2
            variants={itemVariants}
            className="font-heading text-[36px] leading-[1.3] text-text-heading md:text-[40px]"
          >
            Your 24/7 Client Acquisition Engine
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-3xl text-balance text-lg text-foreground"
          >
            Turn your website from a passive asset into a client acquisition
            machine. We design and implement intelligent, automated systems
            that capture, qualify, and nurture potential clients, so you can
            focus on closing deals, not chasing leads.
          </motion.p>
        </motion.div>
      </section>

      {/* 3. Problem/Solution Feature Sections (reduced top padding & inter-block gap) */}
      <section
        ref={solutionsRef}
        className="bg-background-alt pt-10 pb-20 lg:pt-12 lg:pb-24"
      >
        <motion.div
          initial="hidden"
          animate={solutionsInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto flex max-w-[1280px] flex-col gap-20 px-[24px] md:px-[32px] lg:gap-16"
        >
          {serviceBlocks.map((block, index) => {
            const isCRM =
              block.problemTitle === "Is Your Customer Data Disorganized?";
            return (
              <motion.div
                key={block.problemTitle}
                variants={itemVariants}
                className={`grid items-center gap-12 lg:gap-16 ${
                  isCRM
                    ? "grid-cols-1 text-center"
                    : "grid-cols-1 lg:grid-cols-2"
                }`}
              >
                {/* Text column */}
                <div
                  className={isCRM ? "" : index % 2 !== 0 ? "lg:order-last" : ""}
                >
                  <h2
                    className={`font-heading text-[30px] leading-[1.3] text-text-heading md:text-[36px] ${
                      isCRM ? "text-center" : ""
                    }`}
                  >
                    {block.problemTitle}
                  </h2>

                  {/* CRM spotlight (no image, 3 benefit tiles) */}
                  {isCRM ? (
                    <>
                      {/* Short intro using existing copy */}
                      <p className="mx-auto mt-4 max-w-3xl text-foreground">
                        Your customer relationships are your most valuable
                        asset. Our custom CRM solutions centralize every
                        interaction in a clean, intuitive platform. This isn't a
                        complex, off-the-shelf tool; it's a strategic hub that
                        empowers you to focus on building lasting relationships.
                      </p>

                      {/* Benefits */}
                      <div className="mx-auto mt-8 grid max-w-[1024px] grid-cols-1 gap-4 sm:grid-cols-3">
                        {crmBenefits.map((b) => (
                          <div
                            key={b.title}
                            className="flex flex-col items-start rounded-2xl border border-border bg-surface p-5 text-left shadow-lg"
                          >
                            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                              <b.icon className="h-5 w-5" />
                            </span>
                            <h4 className="text-base font-semibold text-text-heading">
                              {b.title}
                            </h4>
                            <p className="mt-1 text-sm text-foreground">
                              {b.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    // Other blocks keep the accordion you liked
                    <div className="mt-6 space-y-3">
                      {block.features.map((feature) => (
                        <AccordionItem
                          key={feature.title}
                          feature={feature}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Image column — render only for non-CRM blocks */}
                {!isCRM && (
                  <div className="flex items-center justify-center">
                    <Image
                      src={block.imageSrc}
                      alt={block.imageAlt}
                      width={600}
                      height={450}
                      className="h-auto w-full rounded-2xl border border-border object-cover shadow-xl"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 4. Final CTA - CORRECTED */}
      <section
        ref={finalCtaRef}
        className="py-20 lg:py-24"
        style={{
          background:
            "radial-gradient(circle at top left, #E0E7FF 0%, #F9FAFB 40%)",
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
            Transparent, Value-Driven Investment
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-foreground"
          >
            Explore our packages to find the solution that aligns with your
            growth objectives.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="/prices"
              className="inline-block rounded-full bg-accent px-10 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100"
            >
              View Our Pricing
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}