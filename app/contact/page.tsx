"use client";
import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";

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

const inputClasses =
  "w-full bg-surface border border-border p-4 rounded-lg text-foreground placeholder:text-text-muted transition-colors focus:border-accent focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)] focus:outline-none";

export default function ContactPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLElement | null>(null);
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const heroInView = useInView(heroRef, { once: true, amount: 0.5 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Add today's date
    const today = new Date().toISOString().split("T")[0];
    const finalData = { ...data, date: today };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
    }
  };

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
            Let's Architect Your Growth
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-3xl text-balance text-lg text-foreground"
          >
            Let's discuss the blueprint for your new digital asset. Fill out
            the form below, and our strategists will be in touch to schedule
            your consultation.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Contact Form & Details */}
      <section
        ref={formRef}
        className="mx-auto max-w-[1280px] px-[24px] pb-20 md:px-[32px] lg:pb-24"
      >
        <motion.div
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="grid items-start gap-12 md:grid-cols-2 md:gap-16"
        >
          {/* Form */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-border p-8 shadow-xl"
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #E0E7FF 100%)",
            }}
          >
            <h2 className="mb-6 text-center font-heading text-3xl">
              Schedule a Free Consultation
            </h2>
            {formStatus === "success" ? (
              <div className="rounded-lg bg-background p-8 text-center">
                <h3 className="font-heading text-2xl text-text-heading">
                  Thank You!
                </h3>
                <p className="mt-2 text-foreground">
                  Your message has been sent successfully. We'll be in touch
                  within one business day.
                </p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="sr-only">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Company"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className={inputClasses}
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="service-interest" className="sr-only">
                    Service Interest
                  </label>
                  <select
                    id="service-interest"
                    name="service"
                    className={`${inputClasses} appearance-none pr-12`}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled className="text-text-muted">
                      What service are you interested in?
                    </option>
                    <option>Website Development</option>
                    <option>AI Integrations</option>
                    <option>Reputation management</option>
                    <option>Missed Call-Text Back Systems</option>
                    <option>General Inquiry</option>
                  </select>
                  <LuChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="Messages"
                    placeholder="How can we help?"
                    rows={4}
                    className={inputClasses}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full rounded-lg bg-accent px-8 py-4 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {formStatus === "submitting"
                    ? "Scheduling..."
                    : "Schedule Free Consultation"}
                </button>
                {formStatus === "error" && (
                  <p className="text-center text-sm text-red-500">
                    Something went wrong. Please try again
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Details */}
          <motion.div variants={itemVariants}>
            <h2 className="font-heading text-3xl">Contact Details</h2>
            <p className="mt-4 text-lg text-foreground">
              Prefer to reach out directly? We're ready to listen.
            </p>
            <div className="mt-6 space-y-4 border-t border-border pt-6 text-text-muted">
              <p>
                <a
                  href="mailto:contact@iqintegrations.com"
                  className="transition-colors hover:text-accent"
                >
                  contact@iqintegrations.com
                </a>
              </p>
              <p>
                <a
                  href="tel:223-237-5309"
                  className="transition-colors hover:text-accent"
                >
                  223-237-5309
                </a>
              </p>
              <p>
                We aim to respond to all inquiries within one business day.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}