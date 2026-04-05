"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
  as: Tag = "div",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  if (!text) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Tag className={className}>
      <span ref={ref} className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    delay: delay + i * staggerChildren,
                    ease: [0.23, 1, 0.32, 1],
                  },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
