"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  stepTitles,
}: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-3">
      {/* Step counter */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-text-secondary">
          Paso {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-text-primary font-medium">
          {stepTitles[currentStep]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-surface-elevated overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Step dots (mobile-friendly) */}
      <div className="flex gap-1.5 justify-center">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentStep
                ? "w-6 bg-accent"
                : i < currentStep
                ? "w-1.5 bg-accent/50"
                : "w-1.5 bg-text-secondary/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
