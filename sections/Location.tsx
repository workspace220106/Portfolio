"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function Location() {
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const ringsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pointerRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(pointerRef.current, {
      y: -12,
      duration: 1.4,
      ease: "power2.inOut",
    }).to(
      pointerRef.current,
      {
        scale: 1.1,
        duration: 1.1,
        ease: "power2.inOut",
      },
      "<"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="location"
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
          <div className="metallic-border-inner grid gap-8 p-8 md:grid-cols-[1.1fr,0.9fr] md:p-10">
            <div>
              <p className="section-label">Location</p>
              <h2 className="section-title">
                Origin of{" "}
                <span className="text-highlight/70">these experiences.</span>
              </h2>
              <p className="mt-5 text-sm text-highlight/70 sm:text-base">
                I&apos;m currently based in{" "}
                <span className="text-primary">[Your City, Country]</span>,
                collaborating with teams around the globe across time zones.
              </p>

              {/* Timezone / availability */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="glow-dot" />
                  <span className="text-sm text-highlight/80">
                    Available for calls between{" "}
                    <span className="text-primary">9 AM — 6 PM IST</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-highlight/50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  <span>UTC +5:30</span>
                </div>
              </div>

              {/* Connection badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Americas", "Europe", "Asia Pacific"].map((region, i) => (
                  <motion.span
                    key={region}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: easeOutExpo }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-highlight/50"
                  >
                    <span className="h-[3px] w-[3px] rounded-full bg-primary" />
                    {region}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Map visualization */}
            <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-glass-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(148,126,176,0.3),transparent_55%),radial-gradient(circle_at_0%_100%,rgba(47,10,133,0.65),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(20,20,24,1),#050608)] opacity-80 mix-blend-screen" />

              {/* Connection lines radiating outward */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
                {[
                  { x: 50, y: 100 },
                  { x: 350, y: 80 },
                  { x: 320, y: 220 },
                  { x: 80, y: 230 },
                  { x: 280, y: 50 },
                ].map((point, i) => (
                  <motion.line
                    key={i}
                    x1="200"
                    y1="150"
                    x2={point.x}
                    y2={point.y}
                    stroke="url(#lineGrad)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.5 + i * 0.15,
                      duration: 1,
                      ease: "easeOut",
                    }}
                  />
                ))}
                {/* Small dots at connection endpoints */}
                {[
                  { x: 50, y: 100 },
                  { x: 350, y: 80 },
                  { x: 320, y: 220 },
                  { x: 80, y: 230 },
                  { x: 280, y: 50 },
                ].map((point, i) => (
                  <motion.circle
                    key={`dot-${i}`}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#947EB0"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.6, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 1 + i * 0.1,
                      duration: 0.4,
                    }}
                  />
                ))}
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#947EB0" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2F0A85" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Grid overlay */}
              <div className="absolute inset-[12%] rounded-3xl border border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              {/* Center pointer with ripple */}
              <div
                ref={pointerRef}
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              >
                {/* Ripple rings */}
                <div ref={ringsRef} className="absolute">
                  <div className="h-8 w-8 animate-ripple rounded-full border border-primary/30" />
                  <div
                    className="absolute inset-0 h-8 w-8 animate-ripple rounded-full border border-primary/20"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
                <div className="h-4 w-4 rotate-45 rounded-[6px] bg-gradient-to-br from-highlight via-primary to-accent shadow-[0_0_20px_rgba(148,126,176,0.95)]" />
                <div className="rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-highlight/80 backdrop-blur-sm">
                  You are here
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
