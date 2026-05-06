import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import type { Tier } from "@/lib/portafolios/types";
import { VALID_TIERS, TIER_LABELS, TIER_PRICES } from "@/lib/portafolios/constants";
import { TierTabs } from "@/components/portafolios/tier-tabs";
import { WizardShell } from "@/components/portafolios/wizard-shell";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tier } = await params;
  if (!VALID_TIERS.includes(tier as Tier)) return {};

  const t = tier as Tier;
  return {
    title: `Plan ${TIER_LABELS[t]} (${TIER_PRICES[t]}) — Portafolio Profesional | Loopmind`,
    description: `Completa el formulario para tu portafolio ${TIER_LABELS[t]}. Entrega rapida, diseno profesional.`,
  };
}

export default async function TierFormPage({ params }: PageProps) {
  const { tier } = await params;

  if (!VALID_TIERS.includes(tier as Tier)) {
    notFound();
  }

  const validTier = tier as Tier;

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Tier switcher */}
        <div className="mb-6">
          <TierTabs currentTier={validTier} />
        </div>

        {/* Form wizard */}
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-zinc-800 rounded w-1/3" />
              <div className="h-1 bg-zinc-800 rounded" />
              <div className="h-32 bg-zinc-800 rounded" />
            </div>
          }
        >
          <WizardShell tier={validTier} />
        </Suspense>
      </div>
    </div>
  );
}
