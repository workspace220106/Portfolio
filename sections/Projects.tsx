"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../data/projects.json";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface Project {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  liveDemo: string;
}

export function Projects() {
  const allTechs = Array.from(
    new Set(
      (projects as Project[]).flatMap((p) => p.techStack)
    )
  );
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? (projects as Project[])
      : (projects as Project[]).filter((p) =>
          p.techStack.includes(filter)
        );

  return (
    <section
      id="projects"
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
                <p className="section-label">Projects</p>
                <h2 className="section-title">
                  Cinematic work designed{" "}
                  <span className="text-highlight/70">to be experienced.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm text-highlight/70 sm:text-base">
                Filter by technology or browse all projects. Each card is
                data-driven from{" "}
                <span className="text-primary">data/projects.json</span>.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["All", ...allTechs].map((tech) => (
                <motion.button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    filter === tech
                      ? "text-highlight"
                      : "text-highlight/50 hover:text-highlight/70"
                  }`}
                >
                  {filter === tech && (
                    <motion.div
                      layoutId="projectFilter"
                      className="absolute inset-0 rounded-full border border-primary/40 bg-primary/10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tech}</span>
                </motion.button>
              ))}
            </div>

            {/* Project grid */}
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.article
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                      ease: easeOutExpo,
                    }}
                    whileHover={{
                      rotateX: 5,
                      rotateY: -4,
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                    className="group relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/8 via-black/60 to-black/90 shadow-glass-lg"
                    style={{ perspective: "1000px" }}
                  >
                    {/* Hero gradient */}
                    <div className="relative h-40 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/40 to-background" />
                      <div className="absolute inset-0 bg-glass-grid bg-glass-grid opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="text-4xl font-bold text-highlight/10"
                          style={{ fontFamily: "var(--font-space), system-ui" }}
                          whileHover={{ scale: 1.1, opacity: 0.2 }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </motion.div>
                      </div>
                      {/* Spotlight effect */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    <div className="relative p-5">
                      <div className="pointer-events-none absolute inset-px rounded-[1.3rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/40 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />

                      <div className="relative flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-highlight">
                              {project.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-highlight/70">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-[11px] text-highlight/80">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 transition-colors hover:border-primary/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noreferrer"
                            className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-primary to-accent px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-highlight shadow-metallic-sm transition-shadow hover:shadow-metallic animate-gradient-shift"
                          >
                            Live Demo
                            <span className="transition-transform group-hover/btn:translate-x-0.5">
                              ↗
                            </span>
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-highlight/25 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-highlight/70 transition-colors hover:border-primary/40 hover:text-highlight"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
