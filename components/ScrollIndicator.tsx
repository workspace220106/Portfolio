"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center">
      <motion.div
        className="flex flex-col items-center gap-2 text-xs text-highlight/60"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          className="h-10 w-[2px] overflow-hidden rounded-full bg-highlight/20"
          animate={{
            boxShadow: [
              "0 0 0 rgba(251,254,251,0.0)",
              "0 0 16px rgba(251,254,251,0.7)",
              "0 0 0 rgba(251,254,251,0.0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="h-10 w-[2px] bg-gradient-to-b from-highlight via-primary to-transparent"
            animate={{ y: [-32, 32] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

