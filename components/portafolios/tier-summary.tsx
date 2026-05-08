"use client";

import type { TierConfig } from "@/lib/portafolios/types";

interface TierSummaryProps {
  config: TierConfig;
}

export function TierSummary({ config }: TierSummaryProps) {
  return (
    <div className="rounded-lg border pf-card p-4">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-sm font-semibold text-text-primary">
          Plan {config.name}
        </h3>
        <span className="text-lg font-bold text-accent font-[family-name:var(--font-space-grotesk)]">
          {config.price}
        </span>
      </div>
      <ul className="space-y-1">
        {config.features.slice(0, 4).map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-xs text-text-secondary"
          >
            <svg
              className="h-3 w-3 text-accent shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10px] text-text-secondary">
        Entrega: {config.deliveryTime}
      </p>
    </div>
  );
}
