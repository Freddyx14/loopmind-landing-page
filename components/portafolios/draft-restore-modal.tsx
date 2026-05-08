"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DraftRestoreModalProps {
  open: boolean;
  lastSaved: string;
  onRestore: () => void;
  onDiscard: () => void;
}

export function DraftRestoreModal({
  open,
  lastSaved,
  onRestore,
  onDiscard,
}: DraftRestoreModalProps) {
  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString("es-PE", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-sm rounded-xl border pf-card !bg-[var(--color-surface)] p-6 space-y-4"
          >
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-text-primary">
                Tienes un borrador guardado
              </h3>
              <p className="text-sm text-text-secondary">
                Guardado el {formatDate(lastSaved)}. ¿Quieres continuar donde lo
                dejaste?
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onRestore}
                className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
              >
                Continuar donde lo deje
              </button>
              <button
                type="button"
                onClick={onDiscard}
                className="w-full rounded-lg border border-text-secondary/20 px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:border-zinc-600 transition-colors"
              >
                Empezar de nuevo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
