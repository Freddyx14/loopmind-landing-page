"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  /** Speed factor: < 1 = slower than scroll, > 1 = faster. Default 0.5. */
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate the parallax offset range based on speed
  // speed 0.5 = moves 50% relative to scroll (subtle)
  // speed 1.5 = moves 150% relative to scroll (exaggerated)
  const distance = 100 * (speed - 1);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-distance, distance]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
