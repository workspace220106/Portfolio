"use client";

import { motion } from "framer-motion";
import education from "../data/education.json";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface EducationItem {
  institution: string;
  degree: string;
  grade: string;
  year: string;
  location: string;
}

export function Education() {
  return (
    <section
      id="education"
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
          <div className="metallic-border-inner p-8 md:p-10">
            <p className="section-label">Education</p>
            <h2 className="section-title">
              A foundation in{" "}
              <span className="text-highlight/70">
                computer science &amp; media.
              </span>
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {(education as unknown as EducationItem[]).map((item, index) => (
                <motion.div
                  key={`${item.institution}-${item.degree}`}
                  initial={{ opacity: 0, y: 20, rotateY: -15, filter: "blur(5px)" }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: easeOutExpo,
                  }}
                  whileHover={{
                    rotateY: 8,
                    rotateX: -5,
                    scale: 1.02,
                    transition: { duration: 0.4 },
                  }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-glass-lg"
                  style={{ perspective: "1000px" }}
                >
                  {/* Holographic gradient border animation */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/40 via-accent/60 to-primary/40 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100 animate-gradient-shift" />
                  </div>

                  {/* Card content */}
                  <div className="relative m-[1px] overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-black/80 via-black/90 to-black p-6">
                    {/* Background pattern */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(148,126,176,0.2),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(47,10,133,0.35),transparent_55%)] opacity-70" />

                    {/* Grid overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-glass-grid bg-glass-grid opacity-20" />

                    <div className="relative">
                      {/* Year badge */}
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary">
                          {item.year}
                        </span>
                      </div>

                      {/* Institution */}
                      <h3 className="text-lg font-semibold text-highlight">
                        {item.institution}
                      </h3>
                      <p className="mt-1 text-xs text-highlight/50">
                        {item.location}
                      </p>

                      {/* Degree */}
                      <p className="mt-4 text-sm text-highlight/80">
                        {item.degree}
                      </p>

                      {/* Grade */}
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 px-3 py-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-primary"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-[11px] uppercase tracking-[0.28em] text-highlight/70">
                          {item.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
