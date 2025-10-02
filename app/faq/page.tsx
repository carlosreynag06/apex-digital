"use client"; 
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";
import { LuPlus, LuMinus } from "react-icons/lu";

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

// Data for FAQ
const faqCategories = [
  {
    category: "About Our Process",
    items: [
      {
        question: "What kind of businesses do you work with?",
        answer:
          "We partner with established SMBs who view their digital presence as a critical component of their growth strategy. Our clients understand the value of a long-term strategic asset over a short-term, low-cost solution and are ready to invest in a system built for performance and scalability.",
      },
      {
        question: "What makes IQ Integrations different from other agencies?",
        answer:
          "We build integrated digital systems, not just websites or apps. Our approach combines custom design, high-performance development, and intelligent automation to create a strategic asset that actively improves your operations and drives growth.",
      },
      {
        question: "How long does a project take to complete?",
        answer:
          "Our process is engineered for efficiency. A 'Foundation' website system is typically delivered within 3 business days, a 'Growth Engine' system in 5 business days, and a 'Strategic Partner' system in 7 business days. Timelines for services like AI Integrations, and CRM Solutions are provided after a discovery call, as they are tailored to the unique complexity of your project.",
      },
      {
        question: "What does your process look like?",
        answer:
          "Our process is a 4-step blueprint for success: 1. Discovery & Strategy, where we map your goals and customize a strategy. 2. Architecture & Development, where we engineer your system. 3. Revision & Optimization, where we provide the system for your review and adjust final details. 4. Deployment & Evolution, where we launch and provide ongoing support.",
      },
      {
        question: "Do you offer support after the project is launched?",
        answer:
          "Yes. We believe a digital system should be an appreciating asset. We offer ongoing partnership plans to ensure your platform evolves with your business, continues to perform at its peak, and delivers a clear return on your investment.",
      },
    ],
  },
  {
    category: "Technical Questions",
    items: [
      {
        question: "Can you integrate with our existing CRM?",
        answer:
          "Our expertise is in engineering clean, fully-integrated systems from the ground up. To ensure seamless performance and data integrity, we build on our own proprietary platforms and do not integrate with or migrate from existing CRMs. Our solutions are ideal for businesses seeking a powerful new digital core without the constraints of legacy CRMs.",
      },
      {
        question: "What technology do you use to build website systems?",
        answer:
          "We engineer our website systems using modern, high-performance technologies like Next.js, Vercel, and Sanity CMS. This allows us to build exceptionally fast, secure, and scalable platforms that consistently score over 95 on Google's Core Web Vitals.",
      },
      {
        question: "How do you ensure the solutions are secure?",
        answer:
          "Security is foundational to our engineering process. We build on enterprise-grade infrastructure, follow best practices for data handling, and implement security measures at every layer of the application, from the front-end to the database.",
      },
      {
        question: "Are the websites you build mobile-friendly?",
        answer:
          "Absolutely. Every digital system we build is fully responsive and optimized for a flawless user experience across all devices, from desktops to tablets and smartphones.",
      },
    ],
  },
  {
    category: "Pricing & Partnership",
    items: [
      {
        question: "How much do your services cost?",
        answer:
          "We offer transparent, value-driven pricing for our Website Systems, which you can view on our pricing page. For AI Integrations and our CRM, we provide a tailored proposal after a discovery call to ensure the solution precisely matches your business goals.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "We do not offer payment plans. We structure our projects as strategic investments, with clear payment milestones detailed in your project proposal to ensure alignment and transparency from start to finish.",
      },
      {
        question: "Are there any hidden or recurring fees?",
        answer:
          "We believe in complete transparency. Your proposal will outline all costs. Some services, like our AI chatbot or missed-call-text-back systems, have modest, usage-based fees. This ensures you only pay for the value you receive, and it is always discussed and agreed upon upfront.",
      },
      {
        question: "Why is there a usage fee for some AI tools?",
        answer:
          "Usage-based fees for tools like our AI chatbot cover the costs of the powerful language models that run them. This model allows us to provide enterprise-level AI capabilities to your business in a sustainable way, ensuring you have access to the best technology as it evolves.",
      },
      {
        question: "How do we start a project with you?",
        answer:
          "The first step is to schedule a complimentary, no-obligation strategy call. This allows us to understand your goals, answer your questions, and determine if we are the right technology partner to help you achieve them. You can book a call through our contact page.",
      },
      {
        question: "What if I invest in a system and my business needs change?",
        answer:
          "That's the advantage of our approach. We don't build static sites; we build scalable digital systems. Our platforms are engineered on a flexible foundation designed to grow and adapt with your business, ensuring your investment continues to deliver value for years to come.",
      },
    ],
  },
];

// Reusable Accordion Item Component
const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div variants={itemVariants} className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg p-4 text-left transition-colors hover:bg-accent/10"
      >
        <h5
          className={`text-lg font-semibold transition-colors ${
            isOpen ? "text-accent" : "text-text-heading"
          }`}
        >
          {q}
        </h5>
        {isOpen ? (
          <LuMinus className="h-5 w-5 flex-shrink-0 text-accent" />
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
            transition={{ duration: 0.3, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pt-2 text-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const faqInView = useInView(faqRef, { once: true, amount: 0.2 });

  return (
    <>
      {/* 1. Hero */}
      <section ref={heroRef} className="pt-header">
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
            Clear Answers to Your Questions
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-3xl text-balance text-lg text-foreground"
          >
            Everything you need to know about partnering with IQ Integrations.
            If you do not find your answer here, please contact us directly.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Accordion Section */}
      <section
        ref={faqRef}
        className="mx-auto max-w-[1024px] px-[24px] pb-20 md:px-[32px] lg:pb-24"
      >
        <div
          className="rounded-2xl border border-border p-4 shadow-xl md:p-8"
          style={{
            background: "linear-gradient(145deg, #FFFFFF 0%, #F0F3FF 100%)",
          }}
        >
          <motion.div
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="space-y-12"
          >
            {faqCategories.map((category) => (
              <div key={category.category}>
                <motion.h2
                  variants={itemVariants}
                  className="border-b border-border pb-4 font-heading text-3xl text-text-heading"
                >
                  {category.category}
                </motion.h2>
                <div className="mt-4">
                  {category.items.map((item) => (
                    <AccordionItem
                      key={item.question}
                      q={item.question}
                      a={item.answer}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
