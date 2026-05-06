"use client";

import type { Tier } from "@/lib/portafolios/types";
import { TIER_CONFIGS } from "@/lib/portafolios/configs";

interface ConfirmationStepProps {
  tier: Tier;
  formData: Record<string, unknown>;
}

export function ConfirmationStep({ tier, formData }: ConfirmationStepProps) {
  const config = TIER_CONFIGS[tier];

  const renderValue = (value: unknown): string => {
    if (!value) return "—";
    if (typeof value === "string") {
      if (value.startsWith("starter/") || value.startsWith("plus/") || value.startsWith("pro/") || value.startsWith("premium/")) {
        return "Archivo subido";
      }
      return value;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return "—";
      if (typeof value[0] === "string") return value.join(", ");
      return `${value.length} item(s)`;
    }
    if (typeof value === "object") return "Completado";
    return String(value);
  };

  // Collect all fields from all steps (except confirmation)
  const allFields = config.steps
    .filter((s) => s.id !== "confirmacion")
    .flatMap((step) =>
      step.fields.map((field) => ({
        stepTitle: step.title,
        label: field.label,
        name: field.name,
        value: formData[field.name],
      }))
    );

  // Group by step
  const grouped = config.steps
    .filter((s) => s.id !== "confirmacion")
    .map((step) => ({
      title: step.title,
      fields: step.fields.map((f) => ({
        label: f.label,
        value: formData[f.name],
      })),
    }));

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-text-primary">
          Confirmar y enviar
        </h2>
        <p className="text-sm text-text-secondary">
          Revisa que todo este correcto antes de enviar.
        </p>
      </div>

      <div className="space-y-4">
        {grouped.map((group) => (
          <div
            key={group.title}
            className="rounded-lg border border-zinc-800 bg-surface-elevated/50 p-4 space-y-2"
          >
            <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide">
              {group.title}
            </h4>
            <div className="space-y-1.5">
              {group.fields.map((field) => (
                <div key={field.label} className="flex justify-between gap-4">
                  <span className="text-sm text-text-secondary shrink-0">
                    {field.label}
                  </span>
                  <span className="text-sm text-text-primary text-right truncate">
                    {renderValue(field.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
        <p className="text-xs text-text-secondary">
          Al enviar este formulario, confirmas que la informacion es correcta.
          Te contactaremos en <strong className="text-text-primary">{config.deliveryTime}</strong> con
          tu portafolio listo.
        </p>
      </div>
    </div>
  );
}
