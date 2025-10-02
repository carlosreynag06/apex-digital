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

const privacyItems = [
  {
    title: "1. Information Collection and Use",
    content:
      "We collect several different types of information for various purposes to provide and improve our Service to you. This includes Personal Data (e.g., email address, name), Usage Data (e.g., IP address, browser type), and Tracking & Cookies Data.",
  },
  {
    title: "2. Use of Data",
    content:
      "IQ Integrations uses the collected data to provide and maintain the Service, to notify you about changes, to provide customer support, and to gather analysis or valuable information so that we can improve our Service.",
  },
  {
    title: "3. Data Security",
    content:
      "The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.",
  },
  {
    title: "4. Service Providers",
    content:
      "We may employ third-party companies and individuals to facilitate our Service ('Service Providers'), to provide the Service on our behalf, or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.",
  },
  {
    title: "5. Your Data Rights",
    content:
      "You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update, or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.",
  },
  {
    title: "6. Children's Privacy",
    content:
      "Our Service does not address anyone under the age of 18 ('Children'). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us.",
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

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto mt-4 max-w-3xl text-balance text-lg text-foreground"
            >
              Last Updated: September 18, 2025. We are committed to protecting
              your privacy and handling your data transparently.
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
              {privacyItems.map((item) => (
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
