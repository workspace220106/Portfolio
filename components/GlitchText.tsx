"use client";

import { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span className={`glitch-text relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="glitch-clone glitch-clone-1 absolute left-0 top-0 z-0"
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="glitch-clone glitch-clone-2 absolute left-0 top-0 z-0"
      >
        {children}
      </span>

      <style jsx>{`
        .glitch-text:hover .glitch-clone-1 {
          animation: glitch1 0.3s infinite;
          color: #947EB0;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          opacity: 0.8;
        }
        .glitch-text:hover .glitch-clone-2 {
          animation: glitch2 0.3s infinite;
          color: #2F0A85;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          opacity: 0.8;
        }
        @keyframes glitch1 {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, -2px); }
          80% { transform: translate(3px, 1px); }
          100% { transform: translate(0); }
        }
        @keyframes glitch2 {
          0% { transform: translate(0); }
          20% { transform: translate(3px, -1px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(-3px, -1px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </span>
  );
}
