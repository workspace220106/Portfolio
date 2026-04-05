"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = links.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center pointer-events-none"
    >
      <nav className="mt-4 w-full max-w-5xl px-4 pointer-events-auto">
        <motion.div
          className="rounded-3xl border border-white/10 shadow-glass-lg"
          animate={{
            backgroundColor: scrolled
              ? "rgba(10, 10, 15, 0.85)"
              : "rgba(10, 10, 15, 0.4)",
            backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* Brand */}
            <Link href="#hero" className="group flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-metallic-sm">
                <span className="text-xs font-bold text-highlight">D</span>
              </div>
              <span className="text-sm font-medium tracking-wide text-highlight/80 transition-colors group-hover:text-highlight">
                Developer
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden gap-1 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 text-sm transition-colors duration-300"
                  style={{
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "#FBFEFB"
                        : "rgba(251, 254, 251, 0.6)",
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {activeSection === link.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-[2px] w-5 rounded-full bg-highlight/70"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[2px] w-5 rounded-full bg-highlight/70"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? 10 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[2px] w-5 rounded-full bg-highlight/70"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden border-t border-white/10 md:hidden"
              >
                <div className="flex flex-col gap-1 p-4">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-xl px-4 py-2.5 text-sm text-highlight/70 transition-colors hover:bg-white/5 hover:text-highlight"
                        style={{
                          color:
                            activeSection === link.href.replace("#", "")
                              ? "#FBFEFB"
                              : undefined,
                          backgroundColor:
                            activeSection === link.href.replace("#", "")
                              ? "rgba(255,255,255,0.05)"
                              : undefined,
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </motion.header>
  );
}
