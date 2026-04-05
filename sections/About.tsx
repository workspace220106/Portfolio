"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "../components/AnimatedCounter";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const stats = [
  { target: 5, suffix: "+", label: "Years Experience" },
  { target: 30, suffix: "+", label: "Projects Shipped" },
  { target: 15, suffix: "+", label: "Happy Clients" },
  { target: 99, suffix: "%", label: "Passion Level" },
];

const techOrbit = [
  "React", "Three.js", "TypeScript", "Next.js", "GSAP", "WebGL",
  "Framer Motion", "Node.js",
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-section relative z-10 flex min-h-screen items-center justify-center px-4 py-24"
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
            <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr]">
              <div>
                <p className="section-label">About Me</p>
                <h2 className="section-title">
                  Building futuristic experiences{" "}
                  <span className="text-highlight/70">one frame at a time.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-highlight/70 sm:text-base">
                  I&apos;m a creative developer obsessed with motion, detail, and
                  how interfaces feel. I combine modern web technologies with
                  cinematic storytelling to craft digital spaces that feel alive
                  and responsive.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-highlight/70 sm:text-base">
                  From concept and prototyping through to production-ready builds,
                  I focus on performance, polish, and delightful micro
                  interactions—so every scroll, hover, and transition feels
                  intentional.
                </p>

                {/* Tech orbit */}
                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight/50">
                    Tech I Love
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {techOrbit.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.05,
                          duration: 0.6,
                          ease: easeOutExpo,
                        }}
                        whileHover={{
                          scale: 1.1,
                          borderColor: "rgba(148, 126, 176, 0.5)",
                        }}
                        className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-highlight/70 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 text-sm text-highlight/70">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight/50">
                    Location
                  </p>
                  <p className="mt-2 text-sm text-highlight">
                    Based in{" "}
                    <span className="text-primary">[Your City, Country]</span> —
                    collaborating with teams worldwide.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight/50">
                    Focus
                  </p>
                  <p className="mt-2">
                    Interactive storytelling, real-time 3D, premium front-end
                    engineering, and motion design.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight/50">
                    Timeline
                  </p>
                  <div className="mt-3 space-y-2 text-xs">
                    {[
                      { year: "2018", text: "First lines of production code" },
                      { year: "2020", text: "Shifted focus to immersive web & 3D" },
                      { year: "Now", text: "Crafting premium experiences for forward-thinking teams" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.1,
                          duration: 0.7,
                          ease: easeOutExpo,
                        }}
                        className="flex items-center gap-3"
                      >
                        <span className="h-[1px] w-6 bg-gradient-to-r from-primary to-accent" />
                        <span className="text-highlight/60">{item.year}</span>
                        <span className="text-highlight/80">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: easeOutExpo }}
                >
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    label={stat.label}
                    duration={2}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
