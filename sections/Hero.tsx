"use client";

import { motion } from "framer-motion";
import { HeroCanvas } from "../components/3d/HeroCanvas";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { ParallaxContainer } from "../components/ParallaxContainer";
import { MagneticButton } from "../components/MagneticButton";
import { GlitchText } from "../components/GlitchText";

interface HeroProps {
  name: string;
}

const statusBadges = [
  { text: "Open to Work", color: "#4ade80" },
  { text: "Remote Friendly", color: "#947EB0" },
  { text: "Full Stack", color: "#60a5fa" },
];

/* Expo ease-out for that premium, decelerating feel */
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ name }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative scroll-section flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="noise-overlay" aria-hidden="true" />
      <motion.div 
        className="absolute inset-0 bg-metal-radial opacity-60 mix-blend-screen bg-[length:200%_200%]"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Full-screen 3D portrait background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        <HeroCanvas />
      </motion.div>

      {/* ── Gradient overlays REMOVED for seamless immersion ── */}
      {/* We rely entirely on the 3D canvas' additive blending and alpha to blend with the body's native radial gradients */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{
        background: "linear-gradient(to right, rgba(5,6,8,0.85) 0%, rgba(5,6,8,0.4) 40%, transparent 100%), linear-gradient(to top, rgba(5,6,8,1) 0%, transparent 25%)"
      }} />

      {/* ── Text content overlaid on left ── */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col px-6 sm:px-10 lg:px-16 pt-24">
        <div className="max-w-2xl">
          <ParallaxContainer strength={16}>
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-highlight/70 shadow-glass-lg backdrop-blur-sm"
            >
              <span className="glow-dot" />
              Available for premium projects
            </motion.div>

            {/* Floating status badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {statusBadges.map((badge, i) => (
                <motion.span
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.8, y: 15, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.6 + i * 0.12,
                    duration: 0.6,
                    ease,
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-highlight/60 backdrop-blur-sm"
                >
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: badge.color }}
                  />
                  {badge.text}
                </motion.span>
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15, duration: 1.1, ease }}
              className="mt-6 text-balance text-4xl font-semibold leading-tight text-highlight sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-space), system-ui, sans-serif" }}
            >
              Hi, I&apos;m{" "}
              <GlitchText>
                <span className="text-gradient-shimmer">{name}</span>
              </GlitchText>
              <br />
              <span className="text-highlight/80">
                Creative Developer &amp; 3D storyteller.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.9, ease }}
              className="mt-5 max-w-xl text-sm leading-relaxed text-highlight/70 sm:text-base"
            >
              I build immersive, cinematic web experiences that feel like
              stepping into the future—blending code, 3D, and motion design
              into seamless digital stories.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.45, duration: 0.8, ease }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#projects" strength={0.2}>
                <span className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent via-primary to-accent px-6 py-2.5 text-sm font-medium text-highlight shadow-metallic animate-gradient-shift">
                  <span className="relative z-10">View Projects</span>
                  <span className="relative z-10 text-xs">→</span>
                  <span className="pointer-events-none absolute inset-0 bg-white/30 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                </span>
              </MagneticButton>

              <MagneticButton href="#contact" strength={0.2}>
                <span className="inline-flex items-center gap-2 rounded-full border border-highlight/20 bg-black/40 px-5 py-2 text-xs uppercase tracking-[0.35em] text-highlight/70 transition-all hover:border-primary/40 hover:text-highlight backdrop-blur-sm">
                  Let&apos;s collaborate
                </span>
              </MagneticButton>

              <MagneticButton href="/resume.pdf" strength={0.15}>
                <span className="inline-flex items-center gap-2 rounded-full border border-highlight/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-highlight/50 transition-all hover:border-primary/30 hover:text-highlight/70 backdrop-blur-sm">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Resume
                </span>
              </MagneticButton>
            </motion.div>
          </ParallaxContainer>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
