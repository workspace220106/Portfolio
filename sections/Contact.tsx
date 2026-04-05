"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type FormState = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email format";
    if (!message.trim()) errs.message = "Please describe your project";

    return errs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setFormState("sending");
    // Simulate form submission
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="scroll-section relative flex min-h-screen items-center justify-center px-4 py-24"
    >
      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="glass-panel metallic-border"
        >
          <div className="metallic-border-inner grid gap-10 p-8 md:grid-cols-[1.1fr,0.9fr] md:p-10">
            <div>
              <p className="section-label">Contact</p>
              <h2 className="section-title">
                Let&apos;s build something{" "}
                <span className="text-highlight/70">cinematic together.</span>
              </h2>
              <p className="mt-5 text-sm text-highlight/70 sm:text-base">
                Interested in a premium interactive experience, product
                launch, or portfolio? Share a few details below and I&apos;ll
                get back with concept ideas and timelines.
              </p>

              <div className="mt-8 space-y-3 text-sm text-highlight/80">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight/60">
                  Direct
                </p>
                <a
                  href="mailto:you@example.com"
                  className="group inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-highlight"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:scale-110">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 4-10 8L2 4"/>
                  </svg>
                  you@example.com
                </a>

                <div className="flex gap-3 pt-4 text-xs">
                  {[
                    {
                      href: "https://github.com/your-username",
                      label: "GitHub",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      ),
                    },
                    {
                      href: "https://linkedin.com/in/your-handle",
                      label: "LinkedIn",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      ),
                    },
                    {
                      href: "https://twitter.com/your-handle",
                      label: "Twitter",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      ),
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-highlight/25 bg-black/50 px-4 py-1.5 uppercase tracking-[0.3em] text-highlight/70 transition-all hover:border-primary/40 hover:text-highlight"
                    >
                      <span className="transition-transform group-hover:scale-110">
                        {social.icon}
                      </span>
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.2, duration: 0.8, ease: easeOutExpo }}
              className="relative space-y-4 rounded-3xl border border-white/10 bg-black/60 p-5 shadow-glass-lg"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_0%_0%,rgba(148,126,176,0.4),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(47,10,133,0.65),transparent_55%)] opacity-80 mix-blend-screen" />
              <div className="relative space-y-4 text-sm">
                {/* Name */}
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-highlight/60">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className={`mt-2 w-full rounded-xl border bg-black/60 px-3 py-2.5 text-sm text-highlight outline-none transition focus:bg-black/80 ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/15 focus:border-primary/80"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1 text-xs text-red-400"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-highlight/60">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`mt-2 w-full rounded-xl border bg-black/60 px-3 py-2.5 text-sm text-highlight outline-none transition focus:bg-black/80 ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/15 focus:border-primary/80"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1 text-xs text-red-400"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-highlight/60">
                    Project
                  </label>
                  <textarea
                    name="message"
                    placeholder="Share a bit about what you have in mind..."
                    rows={4}
                    className={`mt-2 w-full resize-none rounded-xl border bg-black/60 px-3 py-2.5 text-sm text-highlight outline-none transition focus:bg-black/80 ${
                      errors.message
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/15 focus:border-primary/80"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-1 text-xs text-red-400"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={formState === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] shadow-metallic transition-all ${
                    formState === "success"
                      ? "bg-green-600 text-highlight"
                      : formState === "sending"
                      ? "bg-primary/50 text-highlight/70"
                      : "bg-gradient-to-r from-accent via-primary to-accent text-highlight animate-gradient-shift"
                  }`}
                >
                  {formState === "idle" && "Send Message"}
                  {formState === "sending" && (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="inline-block h-4 w-4 rounded-full border-2 border-highlight/30 border-t-highlight"
                      />
                      Sending...
                    </>
                  )}
                  {formState === "success" && (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Message Sent!
                    </>
                  )}
                  {formState === "error" && "Try Again"}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
