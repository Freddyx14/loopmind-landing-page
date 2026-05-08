"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

import type { Tier } from "@/lib/portafolios/types";
import { schemas } from "@/lib/portafolios/schemas";
import { TIER_CONFIGS, getStepFieldNames } from "@/lib/portafolios/configs";
import {
  saveDraft,
  loadDraft,
  clearDraft,
  getSessionId,
  clearSessionId,
} from "@/lib/portafolios/auto-save";

import { ProgressBar } from "./progress-bar";
import { TierSummary } from "./tier-summary";
import { StepRenderer } from "./step-renderer";
import { PaymentStep } from "./payment-step";
import { ConfirmationStep } from "./confirmation-step";
import { DraftRestoreModal } from "./draft-restore-modal";

interface WizardShellProps {
  tier: Tier;
}

export function WizardShell({ tier }: WizardShellProps) {
  const config = TIER_CONFIGS[tier];
  const schema = schemas[tier];
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftLastSaved, setDraftLastSaved] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const draftRef = useRef<ReturnType<typeof loadDraft>>(null);
  const draftCheckedRef = useRef(false);
  const autoSaveEnabledRef = useRef(false);

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {},
  });

  // Initialize session and check for drafts (once only)
  useEffect(() => {
    if (draftCheckedRef.current) return;
    draftCheckedRef.current = true;

    const sid = getSessionId(tier);
    setSessionId(sid);

    const draft = loadDraft(tier);
    if (draft && Object.values(draft.formData).some((v) => v !== "" && v !== undefined)) {
      draftRef.current = draft;
      setDraftLastSaved(draft.lastSaved);
      setShowDraftModal(true);
    }

    // Restore step from URL
    const paso = searchParams.get("paso");
    if (paso) {
      const stepNum = parseInt(paso, 10) - 1;
      if (stepNum >= 0 && stepNum < config.steps.length) {
        setCurrentStep(stepNum);
      }
    }
  }, [tier, config.steps.length, searchParams]);

  // Auto-save on form changes (debounced) — only after user interacts
  useEffect(() => {
    if (!sessionId) return;

    const subscription = form.watch((values) => {
      // Don't auto-save empty forms
      const hasData = Object.values(values).some(
        (v) => v !== "" && v !== undefined && v !== null
      );
      if (!hasData) return;

      autoSaveEnabledRef.current = true;

      const timeout = setTimeout(() => {
        saveDraft(
          tier,
          values as Record<string, unknown>,
          currentStep,
          sessionId
        );
      }, 500);
      return () => clearTimeout(timeout);
    });

    return () => subscription.unsubscribe();
  }, [form, tier, currentStep, sessionId]);

  // Sync step to URL
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("paso", String(currentStep + 1));
    window.history.replaceState(null, "", url.toString());
  }, [currentStep]);

  const handleRestoreDraft = useCallback(() => {
    if (draftRef.current) {
      form.reset(draftRef.current.formData);
      setCurrentStep(draftRef.current.currentStep);
      setSessionId(draftRef.current.sessionId);
    }
    setShowDraftModal(false);
  }, [form]);

  const handleDiscardDraft = useCallback(() => {
    clearDraft(tier);
    clearSessionId(tier);
    const newSid = getSessionId(tier);
    setSessionId(newSid);
    autoSaveEnabledRef.current = false;
    setShowDraftModal(false);
  }, [tier]);

  const handleNext = useCallback(async () => {
    const stepConfig = config.steps[currentStep];
    const fieldNames = getStepFieldNames(tier, currentStep);

    // If the step has no required fields, skip validation entirely
    const hasRequiredFields = stepConfig.fields.some((f) => f.required);

    if (hasRequiredFields && fieldNames.length > 0) {
      form.clearErrors(fieldNames as any);
      const isValid = await form.trigger(fieldNames as any);
      if (!isValid) return;
    }

    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, config.steps.length - 1));
  }, [form, tier, currentStep, config]);

  const handleBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);

    try {
      const { submitPortfolio } = await import(
        "@/app/portafolios/[tier]/actions"
      );

      const formData = form.getValues();
      const result = await submitPortfolio({
        tier,
        session_id: sessionId,
        full_name: (formData as any).full_name || "",
        contact_email: (formData as any).contact_email || "",
        contact_phone: (formData as any).contact_phone,
        linkedin_url: (formData as any).linkedin_url,
        form_data: formData as Record<string, unknown>,
        files: [],
      });

      if (result.success) {
        clearDraft(tier);
        clearSessionId(tier);
        setSubmitted(true);
      }
    } catch {
      // Error handling
    } finally {
      setSubmitting(false);
    }
  }, [form, tier, sessionId]);

  const isLastStep = currentStep === config.steps.length - 1;
  const isConfirmationStep = config.steps[currentStep]?.id === "confirmacion";
  const isPaymentStep = config.steps[currentStep]?.id === "pago";

  // Submitted state
  if (submitted) {
    return (
      <div className="text-center space-y-4 py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
          <svg
            className="h-8 w-8 text-green-400"
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
        </div>
        <h2 className="text-xl font-semibold text-text-primary">
          ¡Formulario enviado!
        </h2>
        <p className="text-sm text-text-secondary max-w-sm mx-auto">
          Recibimos tu informacion. Te contactaremos en {config.deliveryTime}{" "}
          para entregarte tu portafolio.
        </p>
        <a
          href="https://wa.me/51967326013"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          Escribenos por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <>
      <DraftRestoreModal
        open={showDraftModal}
        lastSaved={draftLastSaved}
        onRestore={handleRestoreDraft}
        onDiscard={handleDiscardDraft}
      />

      <div className="space-y-6">
        {/* Tier summary (collapsed on mobile) */}
        <div className="hidden md:block">
          <TierSummary config={config} />
        </div>

        {/* Progress bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={config.steps.length}
          stepTitles={config.steps.map((s) => s.title)}
        />

        {/* Form */}
        <FormProvider {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="min-h-[300px]"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{ x: direction * 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isConfirmationStep ? (
                  <ConfirmationStep
                    tier={tier}
                    formData={form.getValues()}
                  />
                ) : isPaymentStep ? (
                  <PaymentStep
                    step={config.steps[currentStep]}
                    sessionId={sessionId}
                    tier={tier}
                  />
                ) : (
                  <StepRenderer
                    step={config.steps[currentStep]}
                    sessionId={sessionId}
                    tier={tier}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t pf-divider">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="rounded-lg border border-text-secondary/20 px-5 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-zinc-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Atras
              </button>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(228,34,8,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {submitting ? "Enviando..." : "Enviar formulario"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(228,34,8,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Siguiente
                </button>
              )}
            </div>
          </form>
        </FormProvider>

        {/* Auto-save indicator */}
        <p className="text-center text-[10px] text-text-secondary/50">
          Tu progreso se guarda automaticamente
        </p>
      </div>
    </>
  );
}
