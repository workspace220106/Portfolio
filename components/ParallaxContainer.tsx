"use client";

import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  strength?: number;
}

export function ParallaxContainer({ children, strength = 20 }: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * strength;
      const y = (event.clientY / innerHeight - 0.5) * strength;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength]);

  return (
    <div
      style={{
        transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)`,
        transition: "transform 0.25s ease-out",
      }}
    >
      {children}
    </div>
  );
}

