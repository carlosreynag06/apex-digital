"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { LuCircleCheck } from "react-icons/lu";

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

const pricingTiers = [
  {
    name: "Foundation",
    price: "$499",
    description: "For a professional web presence.",
    features: [
      "Premium Web Design (5 pages)",
      "Contact Form Integration",
      "Foundational SEO Optimization",
      "Google Analytics Integration",
      "Integrated Blog with 2 Professional Articles",
    ],
    isFeatured: false,
  },
  {
    name: "Growth Engine",
    price: "$849",
    description: "For businesses ready to scale with automation.",
    features: [
      "Advanced Web Design (10+ pages)",
      "Automated Lead Generation System",
      "Automated Email Marketing (7-10 emails)",
      "Integrated Blog with 5 Professional Articles",
      "Advanced AI Chatbot - Your 24/7 smart sales agent",
    ],
    isFeatured: true,
  },
  {
    name: "Strategic Partner",
    price: "$4,949",
    description: "A fully customized and automated digital ecosystem.",
    features: [
      "Personalized Digital Strategy",
      "Personalized CRM",
      "Custom Feature Development",
      "Monthly Strategic Consulting (on retainer)",
      "Reputation Management (3 Months)",
    ],
    isFeatured: false,
  },
];

const customServices = [
  {
    title: "Email Marketing Automation",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)",
  },
  {
    title: "AI Integrations",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #DBEAFE 100%)",
  },
  {
    title: "CRM Solutions",
    gradient: "linear-gradient(135deg, #E0E7FF 0%, #DBEAFE 100%)",
  },
];

export default function PricesPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const pricingRef = useRef<HTMLElement | null>(null);
  const customWorkRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.2 });
  const customWorkInView = useInView(customWorkRef, { once: true, amount: 0.2 });

  return (
    <>
      <section className="pt-header" ref={heroRef}>
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto max-w-[1280px] px-[24px] py-20 text-center md:px-[32px] lg:py-24"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-[48px] leading-[1.2] md:text-[60px]"
          >
            Strategic Investments <br /> in Your Digital Future
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-3xl text-balance text-lg text-foreground"
          >
            Our pricing is transparent and value-driven, designed to align with your business objectives at every stage of growth.
          </motion.p>
        </motion.div>
      </section>

      <section ref={pricingRef} className="pb-20 lg:pb-24">
        <motion.div
          initial="hidden"
          animate={pricingInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto grid max-w-[1280px] items-start gap-8 px-[24px] md:px-[32px] lg:grid-cols-3"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              className={`flex h-full flex-col rounded-2xl transition-all ${
                tier.isFeatured
                  ? "bg-accent text-white lg:scale-105 shadow-2xl"
                  : "border border-border bg-surface"
              }`}
            >
              <div className="flex flex-col items-center p-8 pb-0">
                {tier.isFeatured && (
                  <div className="mb-4 rounded-full bg-white px-4 py-1 text-sm font-semibold text-accent">
                    Most Popular
                  </div>
                )}
                <h4 className={`text-center font-semibold text-[20px] lg:text-[24px] ${tier.isFeatured ? 'text-white' : 'text-text-heading'}`}>
                  {tier.name}
                </h4>
                <p className={`mt-2 text-center h-12 ${tier.isFeatured ? 'text-white/80' : 'text-text-muted'}`}>{tier.description}</p>
                <p className={`my-6 text-center font-heading text-5xl ${tier.isFeatured ? 'text-white' : 'text-text-heading'}`}>
                  {tier.price}
                </p>
              </div>
              <div className="flex-1 border-t pt-6 px-8 ${tier.isFeatured ? 'border-white/20' : 'border-border'}">
                {tier.name === 'Strategic Partner' && (
                    <p className={`mb-4 font-semibold ${tier.isFeatured ? 'text-white' : 'text-foreground'}`}>Includes everything in Growth Engine, plus:</p>
                )}
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <LuCircleCheck className={`mt-1 h-5 w-5 flex-shrink-0 ${tier.isFeatured ? 'text-white' : 'text-accent'}`} />
                      <span className={`${tier.isFeatured ? 'text-white/90' : 'text-foreground'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 p-8 pt-0">
                <Link
                  href="/contact"
                  className={`block w-full rounded-lg px-8 py-4 text-center font-medium uppercase tracking-wider transition-all ${
                    tier.isFeatured
                      ? "bg-white text-accent hover:bg-white/90"
                      : "border border-border bg-transparent text-text-heading hover:border-accent"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* "Looking for More?" Section */}
      <section ref={customWorkRef} className="mx-auto max-w-[1280px] px-[24px] pb-20 md:px-[32px] lg:pb-24">
        <motion.div
            initial="hidden"
            animate={customWorkInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="text-center"
        >
            <motion.h2 variants={itemVariants} className="font-heading text-3xl md:text-4xl">
                Custom Solutions & A La Carte Services
            </motion.h2>
            <motion.p variants={itemVariants} className="mx-auto mt-4 max-w-3xl text-lg text-foreground">
                For custom projects or standalone services, we provide a tailored proposal. Contact us to discuss your specific requirements.
            </motion.p>
            <div className="mx-auto mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {customServices.map(service => (
                    <motion.div key={service.title} variants={itemVariants}>
                        <Link 
                            href="/contact"
                            className="flex h-32 items-center justify-center rounded-xl p-4 text-center font-semibold text-text-heading shadow-lg transition-shadow hover:shadow-xl"
                            style={{ background: service.gradient }}
                        >
                            {service.title}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </section>
    </>
  );
}
