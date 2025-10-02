"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuCircleCheck } from "react-icons/lu";

export default function BlueprintPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const COOLDOWN_MS = 24 * 60 * 60 * 1000;
  const LAST_SHOWN_KEY = "blueprintIntentLastShown";
  const SESSION_FLAG_KEY = "blueprintIntentShown";

  const handleClose = () => {
    try {
      localStorage.setItem(LAST_SHOWN_KEY, String(Date.now()));
    } catch {}
    setIsVisible(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch('/api/subscribe-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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

  useEffect(() => {
    const getLastShown = (): number | null => {
      try {
        const raw = localStorage.getItem(LAST_SHOWN_KEY);
        if (raw) return parseInt(raw, 10);
      } catch {}
      return null;
    };
    const hasSeenInSession = (): boolean => {
      try {
        return sessionStorage.getItem(SESSION_FLAG_KEY) === "true";
      } catch {}
      return false;
    };
    const lastShown = getLastShown();
    if ((lastShown && Date.now() - lastShown < COOLDOWN_MS) || hasSeenInSession()) {
      return;
    }
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 20 && !isVisible) {
        setIsVisible(true);
        try {
          sessionStorage.setItem(SESSION_FLAG_KEY, "true");
        } catch {}
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="blueprint-popup-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as const }}
            className="relative w-full max-w-lg rounded-2xl p-8 shadow-2xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #E0E7FF 100%)",
            }}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-text-muted transition-colors hover:text-text-heading"
              aria-label="Close popup"
            >
              <LuX className="h-6 w-6" />
            </button>
            {formStatus === "success" ? (
              <div className="text-center">
                <LuCircleCheck className="mx-auto h-12 w-12 text-accent" />
                <h4 id="blueprint-popup-title" className="mt-4 font-semibold text-text-heading text-[20px] lg:text-[24px]">
                  Success! Check Your Inbox.
                </h4>
                <p className="mt-2 text-foreground">
                  Part 1 of your Automated Business Blueprint is on its way. Be sure to check your spam or promotions folder.
                </p>
              </div>
            ) : (
              <>
                <h4 id="blueprint-popup-title" className="font-semibold text-text-heading text-[20px] lg:text-[24px]">
                  Get Your <span className="text-accent">FREE</span> Automated Business Blueprint
                </h4>
                <p className="mt-2 text-foreground">
                  Enter your details below to receive our free 3-step email guide on{" "}
                  <strong className="text-accent">generating leads</strong> with an
                  intelligent, automated digital system.
                </p>
                <form onSubmit={handleFormSubmit} className="mt-6 flex flex-col gap-4">
                  <label htmlFor="blueprint-name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="blueprint-name"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full rounded-lg border border-border bg-background p-3 text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <label htmlFor="blueprint-email" className="sr-only">Email Address</label>
                  <input
                    type="email"
                    id="blueprint-email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full rounded-lg border border-border bg-background p-3 text-foreground placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="rounded-lg bg-accent px-6 py-3 font-medium uppercase tracking-wider text-accent-foreground shadow-lg shadow-blue-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Me The Blueprint"}
                  </button>
                  {formStatus === 'error' && (
                    <p className="text-center text-sm text-red-500">Something went wrong. Please try again.</p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
