"use client";

import Link from "next/link";
import type { Tier } from "@/lib/portafolios/types";
import { TIER_LABELS, TIER_PRICES } from "@/lib/portafolios/constants";

interface TierTabsProps {
  currentTier: Tier;
}

const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

export function TierTabs({ currentTier }: TierTabsProps) {
  return (
    <nav className="flex gap-1 p-1 rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-x-auto">
      {tiers.map((tier) => {
        const isActive = tier === currentTier;
        const isPro = tier === "pro";

        return (
          <Link
            key={tier}
            href={`/portafolios/${tier}`}
            className={`relative flex-1 min-w-[80px] flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-lg text-center transition-all ${
              isActive
                ? "bg-zinc-800 text-text-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-zinc-800/50"
            }`}
          >
            {isPro && (
              <span className="absolute -top-1.5 right-1 text-[9px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full leading-none">
                POPULAR
              </span>
            )}
            <span className="text-xs font-medium">{TIER_LABELS[tier]}</span>
            <span className={`text-[10px] ${isActive ? "text-accent" : "text-text-secondary"}`}>
              {TIER_PRICES[tier]}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
