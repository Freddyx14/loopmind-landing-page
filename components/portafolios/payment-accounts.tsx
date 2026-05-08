"use client";

import { useState } from "react";
import { PAYMENT_METHODS, PAYMENT_HOLDER } from "@/lib/portafolios/constants";

interface PaymentAccountsProps {
  compact?: boolean;
}

export function PaymentAccounts({ compact = false }: PaymentAccountsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <p className={`font-medium text-text-primary ${compact ? "text-xs" : "text-sm"}`}>
        Titular: <span className="text-text-secondary">{PAYMENT_HOLDER}</span>
      </p>

      <div className={`grid gap-2 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.id}
            className="rounded-lg border pf-card p-3 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className={`font-semibold text-text-primary ${compact ? "text-xs" : "text-sm"}`}>
                {method.label}
              </span>
              {method.type === "mobile" && (
                <span className="text-[9px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full font-medium">
                  RAPIDO
                </span>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              <code className={`text-text-secondary font-[family-name:var(--font-space-grotesk)] ${compact ? "text-[10px]" : "text-xs"}`}>
                {method.detail}
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard(method.detail, method.id)}
                className="shrink-0 text-text-secondary hover:text-accent transition-colors"
                aria-label={`Copiar numero de ${method.label}`}
              >
                {copied === method.id ? (
                  <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>

            {"cci" in method && method.cci && (
              <div className="flex items-center justify-between gap-2 pt-0.5 border-t pf-divider">
                <span className={`text-text-secondary/70 ${compact ? "text-[9px]" : "text-[10px]"}`}>
                  CCI: <code className="font-[family-name:var(--font-space-grotesk)]">{method.cci}</code>
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(method.cci!, `${method.id}-cci`)}
                  className="shrink-0 text-text-secondary/50 hover:text-accent transition-colors"
                  aria-label={`Copiar CCI de ${method.label}`}
                >
                  {copied === `${method.id}-cci` ? (
                    <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            )}

            {"url" in method && method.url && (
              <a
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block text-accent hover:text-accent/80 transition-colors ${compact ? "text-[10px]" : "text-xs"}`}
              >
                Abrir PayPal →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
