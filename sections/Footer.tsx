"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const techStack = [
  "Next.js",
  "React Three Fiber",
  "Framer Motion",
  "GSAP",
  "Tailwind CSS",
  "TypeScript",
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      {/* Animated gradient top border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-gradient-shift" />

      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-metallic-sm">
                <span className="text-sm font-bold text-highlight">D</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-highlight">
                  Creative Developer
                </p>
                <p className="text-xs text-highlight/50">
                  3D &amp; Motion Design
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-highlight/50">
              Crafting premium, immersive digital experiences that blend
              technology and art into cinematic web stories.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight/60">
              Navigation
            </p>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-highlight/50 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Built with */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight/60">
              Built With
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-highlight/50 transition-colors hover:border-primary/30 hover:text-highlight/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-highlight/40 md:flex-row">
          <p>© {new Date().getFullYear()} Creative Developer. All rights reserved.</p>
          <div className="flex gap-4">
            {[
              {
                href: "https://github.com/your-username",
                label: "GitHub",
              },
              {
                href: "https://linkedin.com/in/your-handle",
                label: "LinkedIn",
              },
              {
                href: "https://twitter.com/your-handle",
                label: "Twitter",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
