"use client";

import { motion } from "framer-motion";
import testimonials from "../data/testimonials.json";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-section relative flex min-h-[80vh] items-center justify-center px-4 py-24"
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
            <div className="text-center">
              <p className="section-label">Testimonials</p>
              <h2 className="section-title mx-auto max-w-lg">
                What people say{" "}
                <span className="text-highlight/70">about working with me.</span>
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {(testimonials as Testimonial[]).map((t, index) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(5px)" }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: easeOutExpo,
                  }}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.3 },
                  }}
                  className="group glass-card p-6"
                >
                  <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-accent/20 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative">
                    {/* Quote mark */}
                    <div className="mb-4 text-4xl font-serif leading-none text-primary/30">
                      &ldquo;
                    </div>

                    {/* Stars */}
                    <div className="mb-3 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <motion.svg
                          key={i}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="#947EB0"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + i * 0.05,
                            duration: 0.3,
                          }}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </motion.svg>
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-sm leading-relaxed text-highlight/70">
                      {t.text}
                    </p>

                    {/* Author */}
                    <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-accent/40 text-sm font-bold text-highlight/80">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-highlight">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-highlight/50">
                          {t.role}
                        </p>
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
