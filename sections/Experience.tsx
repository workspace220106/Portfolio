"use client";

import { motion } from "framer-motion";
import experience from "../data/experience.json";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
}

export function Experience() {
  const items = experience as unknown as ExperienceItem[];

  return (
    <section
      id="experience"
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
            <p className="section-label">Experience</p>
            <h2 className="section-title">
              A timeline of building{" "}
              <span className="text-highlight/70">premium experiences.</span>
            </h2>

            <div className="relative mt-10">
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-0 h-full w-[2px] md:left-1/2 md:-translate-x-px">
                <motion.div
                  className="h-full w-full bg-gradient-to-b from-primary via-highlight/30 to-accent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: easeOutExpo }}
                  style={{ transformOrigin: "top" }}
                />
              </div>

              <div className="space-y-12">
                {items.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={`${item.company}-${item.role}`}
                      initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: easeOutExpo,
                      }}
                      className={`relative flex flex-col md:flex-row md:items-start ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline node */}
                      <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
                        <motion.div
                          whileInView={{
                            boxShadow: [
                              "0 0 0 0 rgba(148, 126, 176, 0)",
                              "0 0 20px 8px rgba(148, 126, 176, 0.4)",
                              "0 0 0 0 rgba(148, 126, 176, 0)",
                            ],
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 2,
                            delay: index * 0.2,
                            repeat: 0,
                          }}
                          className="h-4 w-4 rounded-full border-2 border-primary bg-background"
                        />
                      </div>

                      {/* Content card */}
                      <div
                        className={`ml-14 w-full md:ml-0 md:w-[45%] ${
                          isEven
                            ? "md:pr-12 md:text-right"
                            : "md:pl-12 md:text-left"
                        }`}
                      >
                        <div className="glass-card p-5">
                          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-accent/20 opacity-0 transition-opacity group-hover:opacity-100" />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              {/* Company icon placeholder */}
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/40 to-primary/40 text-[10px] font-bold uppercase text-highlight/80">
                                {item.company.charAt(0)}
                              </div>
                              <div className={isEven ? "md:text-right md:flex-1" : "md:text-left md:flex-1"}>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                  {item.role}
                                </p>
                                <p className="text-sm text-highlight/80">
                                  {item.company}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-highlight/50">
                              {item.duration} · {item.location}
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-highlight/70">
                              {item.achievements.map((ach, achIdx) => (
                                <motion.li
                                  key={ach}
                                  initial={{ opacity: 0, x: isEven ? 15 : -15, filter: "blur(4px)" }}
                                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                  viewport={{ once: true }}
                                  transition={{
                                    delay: index * 0.1 + achIdx * 0.05,
                                    duration: 0.5,
                                    ease: easeOutExpo
                                  }}
                                  className={`flex gap-2 ${
                                    isEven
                                      ? "md:flex-row-reverse md:text-right"
                                      : ""
                                  }`}
                                >
                                  <span className="mt-1.5 h-[2px] w-4 flex-shrink-0 bg-gradient-to-r from-primary to-accent" />
                                  <span className="leading-relaxed">
                                    {ach}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Spacer for the other side */}
                      <div className="hidden md:block md:w-[45%]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
