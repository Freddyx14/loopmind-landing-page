"use client";

import { PaymentAccounts } from "./payment-accounts";
import { FileUpload } from "./fields/file-upload";
import type { StepConfig } from "@/lib/portafolios/types";

interface PaymentStepProps {
  step: StepConfig;
  sessionId: string;
  tier: string;
}

export function PaymentStep({ step, sessionId, tier }: PaymentStepProps) {
  const fileField = step.fields[0];

  return (
    <div className="space-y-5">
      {/* Step header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-text-primary">
          {step.title}
        </h2>
        <p className="text-sm text-text-secondary">
          Realiza tu pago con cualquiera de estos metodos y sube el comprobante.
        </p>
      </div>

      {/* Payment accounts */}
      <PaymentAccounts compact />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t pf-divider" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-surface px-3 text-xs text-text-secondary">
            Sube tu comprobante
          </span>
        </div>
      </div>

      {/* File upload */}
      {fileField && (
        <FileUpload
          name={fileField.name}
          label={fileField.label}
          placeholder={fileField.placeholder}
          required={fileField.required}
          helperText={fileField.helperText}
          accept={fileField.accept}
          maxSize={fileField.maxSize}
          sessionId={sessionId}
          tier={tier}
        />
      )}
    </div>
  );
}
