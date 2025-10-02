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

const termsItems = [
  {
    title: "1. Accounts",
    content:
      "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.",
  },
  {
    title: "2. Intellectual Property",
    content:
      "The Service and its original content, features, and functionality are and will remain the exclusive property of IQ Integrations and its licensors. Our brand and trade dress may not be used in connection with any product or service without the prior written consent of IQ Integrations.",
  },
  {
    title: "3. Links To Other Web Sites",
    content:
      "Our Service may contain links to third-party web sites or services that are not owned or controlled by IQ Integrations. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.",
  },
  {
    title: "4. Termination",
    content:
      "We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.",
  },
  {
    title: "5. Limitation of Liability",
    content:
      "In no event shall IQ Integrations, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.",
  },
  {
    title: "6. Governing Law",
    content:
      "These Terms shall be governed and construed in accordance with the laws of the Commonwealth of Pennsylvania, United States, without regard to its conflict of law provisions.",
  },
];

const AccordionItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
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
          {title}
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
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pt-2 text-foreground">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function TermsOfServicePage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });

  return (
    <>
      <main>
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
              Terms of Service
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-4 max-w-3xl text-balance text-lg text-foreground"
            >
              Last Updated: September 18, 2025. These terms govern your use of
              our services. By using our services, you agree to these terms.
            </motion.p>
          </motion.div>
        </section>
        <section
          ref={contentRef}
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
              animate={contentInView ? "visible" : "hidden"}
              variants={sectionVariants}
            >
              {termsItems.map((item) => (
                <AccordionItem
                  key={item.title}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
