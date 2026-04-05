"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    document.body.classList.add("custom-cursor-active");

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, [data-cursor-hover]"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className="h-full w-full rounded-full border-2 transition-colors duration-300"
          style={{
            borderColor: isHovering
              ? "rgba(148, 126, 176, 0.8)"
              : "rgba(251, 254, 251, 0.5)",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 8 : 5,
          height: isHovering ? 8 : 5,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: isHovering
              ? "radial-gradient(circle, #947EB0, #2F0A85)"
              : "#FBFEFB",
            boxShadow: isHovering
              ? "0 0 20px rgba(148, 126, 176, 0.8)"
              : "0 0 8px rgba(251, 254, 251, 0.4)",
          }}
        />
      </motion.div>
    </>
  );
}
