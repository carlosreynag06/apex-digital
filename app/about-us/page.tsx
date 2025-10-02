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

// Data for the Our Values section with updated gradients
const ourValues = [
    {
      title: "Our Mission",
      description: "To engineer integrated digital systems that deliver measurable outcomes and create a formidable competitive advantage for our partners.",
      gradient: "linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)", // White to Lavender
    },
    {
      title: "Our Vision",
      description: "To be the leading technology partner for businesses seeking to transform their digital presence from a passive cost center into an active, intelligent growth engine.",
      gradient: "linear-gradient(135deg, #FFFFFF 0%, #DBEAFE 100%)", // White to Light Blue
    },
    {
      title: "Our Values",
      description: "We operate with a commitment to precision, build lasting partnerships, and ensure every solution is a testament to quality and strategic thinking.",
      gradient: "linear-gradient(135deg, #E0E7FF 0%, #DBEAFE 100%)", // Lavender to Light Blue
    }
];

export default function AboutUsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const philosophyRef = useRef<HTMLElement | null>(null);
  const valuesRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const philosophyInView = useInView(philosophyRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <>
      {/* 1. Hero */}
      <section ref={heroRef} className="pt-header">
        <motion.div
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mx-auto max-w-[1024px] px-[24px] py-20 text-center md:px-[32px] lg:py-24"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-[48px] leading-[1.2] md:text-[60px]"
          >
            The Architects of Your Digital Advantage
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-3xl text-lg text-foreground"
          >
            We don’t just build digital products; we architect strategic systems from the ground up. Our method combines meticulous design with intelligent automation, ensuring every component works in perfect concert to achieve your specific business goals.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-block w-full rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100 sm:w-auto"
            >
              Book a Call
            </Link>
            <Link
              href="#values"
              className="inline-block w-full rounded-lg border border-border bg-transparent px-8 py-4 font-medium uppercase tracking-wider text-text-heading transition-colors hover:border-text-body hover:bg-surface sm:w-auto"
            >
              See our Values
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Vertical Rhythm Spacer */}
      <div className="h-[80px] lg:h-[120px]" />

      {/* 2. Philosophy Section */}
      <section
        ref={philosophyRef}
        className="mx-auto max-w-[1280px] px-[24px] md:px-[32px]"
      >
        <motion.div
            initial="hidden"
            animate={philosophyInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="font-heading text-[36px] leading-[1.3] md:text-[40px]">
              We Believe Your Digital Presence Should Be Your Most Valuable Asset
            </h2>
            <p className="mt-4 text-lg text-foreground">
              A website is a starting point. A system is a competitive advantage. We believe your digital presence should be your most effective employee—working 24/7 to attract, engage, and convert your ideal clients through intelligent automation and seamless integration.
            </p>
            <p className="mt-4 text-lg text-foreground">
              This philosophy of "Intelligent Luxury" means every pixel and process is engineered with precision, clarity, and a specific conversion goal, delivering an effortless experience for your users and a powerful growth engine for your business.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Image 
                src="/about.jpeg"
                alt="Abstract image representing strategic architecture"
                width={600}
                height={450}
                className="aspect-[4/3] w-full rounded-2xl bg-surface object-cover shadow-xl"
            />
          </motion.div>
        </motion.div>
      </section>

      <div className="h-[80px] lg:h-[120px]" />
      
      {/* 3. Our Values Section */}
      <section id="values" ref={valuesRef} className="bg-background-alt py-20 lg:py-24 scroll-mt-20">
         <motion.div
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="mx-auto max-w-[1280px] px-[24px] text-center md:px-[32px]"
         >
           <motion.h2 variants={itemVariants} className="font-heading text-[36px] leading-[1.3] md:text-[40px]">
             Our Values
           </motion.h2>
           <div className="mx-auto mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {ourValues.map(value => (
                  <motion.div 
                    key={value.title} 
                    variants={itemVariants} 
                    className="h-full rounded-2xl p-8 text-left shadow-lg"
                    style={{ background: value.gradient }}
                  >
                      <h3 className="font-heading text-3xl text-text-heading">{value.title}</h3>
                      <p className="mt-4 text-foreground">{value.description}</p>
                  </motion.div>
              ))}
           </div>
         </motion.div>
      </section>

      {/* 4. Final CTA */}
      <section ref={ctaRef} className="py-20 lg:py-24">
        <motion.div
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="mx-auto max-w-[1024px] px-[24px] text-center md:px-[32px]"
        >
            <motion.h2 variants={itemVariants} className="font-heading text-3xl md:text-4xl">
                Let's Build Something Exceptional Together
            </motion.h2>
            <motion.p variants={itemVariants} className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
                A brief, no-obligation call is the first step. Let's discuss how we can create a true digital asset for your business.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100"
                >
                    Start the Conversation
                </Link>
            </motion.div>
        </motion.div>
      </section>
    </>
  );
}