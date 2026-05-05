"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: ReactNode;
  className?: string;
}

export function TextRevealCard({
  text,
  revealText,
  children,
  className = "",
}: TextRevealCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setWidthPercentage(Math.max(0, Math.min(100, percentage)));
  }

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
    setWidthPercentage(0);
  }

  // Touch support
  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setWidthPercentage(Math.max(0, Math.min(100, percentage)));
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-8 md:p-12 select-none cursor-crosshair ${className}`}
    >
      {children && <div className="relative z-20 mb-6">{children}</div>}

      {/* Base text (visible by default) */}
      <div className="relative z-10 overflow-hidden">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#333] transition-colors duration-300">
          {text}
        </p>

        {/* Reveal text (clipped by mouse position) */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
          }}
          animate={{
            clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
          }}
          transition={{ duration: isHovering ? 0 : 0.4, ease: "easeOut" }}
        >
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {revealText}
          </p>
        </motion.div>
      </div>

      {/* Gradient line at reveal edge */}
      <motion.div
        className="absolute top-0 bottom-0 z-30 w-px"
        style={{ left: `${widthPercentage}%` }}
        animate={{
          left: `${widthPercentage}%`,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: isHovering ? 0 : 0.4 }}
      >
        <div className="h-full w-px bg-gradient-to-b from-transparent via-[#E42208] to-transparent" />
      </motion.div>

      {/* Subtle glow behind reveal area */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{
          background: isHovering
            ? `radial-gradient(circle at ${widthPercentage}% 50%, rgba(228,34,8,0.06) 0%, transparent 60%)`
            : "none",
        }}
      />
    </div>
  );
}

export function TextRevealCardTitle({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
      {children}
    </h3>
  );
}

export function TextRevealCardDescription({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="text-sm md:text-base text-[#999]">{children}</p>
  );
}
