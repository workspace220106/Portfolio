"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20 blur-[120px]" />
          </div>

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 mb-12"
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-highlight sm:text-5xl">
              <span className="text-gradient-shimmer">Portfolio</span>
            </h1>
            <p className="mt-2 text-center text-xs uppercase tracking-[0.4em] text-highlight/40">
              Loading experience
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 w-64">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-highlight/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent via-primary to-highlight"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="mt-3 text-center text-xs tabular-nums tracking-[0.3em] text-highlight/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
