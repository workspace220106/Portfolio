"use client";

import { motion } from "framer-motion";
import skills from "../data/skills.json";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const categories: Record<string, string[]> = {
  Frontend: ["JavaScript", "TypeScript", "React", "Next.js"],
  "3D & Motion": ["Three.js", "React Three Fiber", "Framer Motion", "GSAP"],
};

function getCategory(skillName: string): string {
  for (const [cat, names] of Object.entries(categories)) {
    if (names.includes(skillName)) return cat;
  }
  return "Other";
}

function getLevelPercent(level: string): number {
  switch (level.toLowerCase()) {
    case "expert":
      return 95;
    case "advanced":
      return 80;
    case "intermediate":
      return 60;
    default:
      return 40;
  }
}

export function Skills() {
  const grouped = skills.reduce(
    (acc: Record<string, typeof skills>, skill) => {
      const cat = getCategory(skill.name);
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {}
  );

  return (
    <section
      id="skills"
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
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label">Skills</p>
                <h2 className="section-title">
                  A toolkit built for{" "}
                  <span className="text-highlight/70">immersive web.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm text-highlight/70 sm:text-base">
                Every skill here is fully editable in{" "}
                <span className="text-primary">data/skills.json</span>. Add or
                reorder technologies without touching the UI code.
              </p>
            </div>

            {Object.entries(grouped).map(([category, categorySkills], catIdx) => (
              <div key={category} className="mt-8">
                <motion.p
                  initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1, duration: 0.6, ease: easeOutExpo }}
                  className="mb-4 text-[11px] uppercase tracking-[0.3em] text-primary/80"
                >
                  {category}
                </motion.p>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {categorySkills.map((skill, index) => {
                    const percent = getLevelPercent(skill.level);
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 25, rotateX: -15, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.7,
                          ease: easeOutExpo,
                        }}
                        whileHover={{
                          y: -6,
                          rotateX: 8,
                          rotateY: -6,
                          transition: { duration: 0.3 },
                        }}
                        className="group glass-card px-5 py-4"
                        style={{ perspective: "800px" }}
                      >
                        <div className="pointer-events-none absolute inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/30 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                        <div className="relative">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-highlight">
                                {skill.name}
                              </p>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-highlight/60">
                                {skill.level}
                              </p>
                            </div>

                            {/* Circular progress */}
                            <div className="relative h-10 w-10">
                              <svg
                                className="h-10 w-10 -rotate-90"
                                viewBox="0 0 36 36"
                              >
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="15"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.1)"
                                  strokeWidth="2.5"
                                />
                                <motion.circle
                                  cx="18"
                                  cy="18"
                                  r="15"
                                  fill="none"
                                  stroke="url(#skillGradient)"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeDasharray={`${
                                    (percent / 100) * 94.2
                                  } 94.2`}
                                  initial={{ strokeDasharray: "0 94.2" }}
                                  whileInView={{
                                    strokeDasharray: `${
                                      (percent / 100) * 94.2
                                    } 94.2`,
                                  }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 1.4,
                                    delay: index * 0.05 + 0.2,
                                    ease: easeOutExpo,
                                  }}
                                />
                                <defs>
                                  <linearGradient
                                    id="skillGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                  >
                                    <stop offset="0%" stopColor="#947EB0" />
                                    <stop offset="100%" stopColor="#2F0A85" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-highlight/70">
                                {percent}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
