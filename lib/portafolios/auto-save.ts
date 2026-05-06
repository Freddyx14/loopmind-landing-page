import type { DraftData, Tier } from "./types";
import { DRAFT_EXPIRY_DAYS } from "./constants";

function getDraftKey(tier: Tier): string {
  return `portafolio-draft-${tier}`;
}

export function saveDraft(
  tier: Tier,
  formData: Record<string, unknown>,
  currentStep: number,
  sessionId: string
): void {
  const draft: DraftData = {
    formData,
    currentStep,
    sessionId,
    lastSaved: new Date().toISOString(),
  };
  try {
    localStorage.setItem(getDraftKey(tier), JSON.stringify(draft));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function loadDraft(tier: Tier): DraftData | null {
  try {
    const raw = localStorage.getItem(getDraftKey(tier));
    if (!raw) return null;

    const draft: DraftData = JSON.parse(raw);

    // Check expiry
    const savedAt = new Date(draft.lastSaved).getTime();
    const expiryMs = DRAFT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() - savedAt > expiryMs) {
      clearDraft(tier);
      return null;
    }

    return draft;
  } catch {
    return null;
  }
}

export function clearDraft(tier: Tier): void {
  try {
    localStorage.removeItem(getDraftKey(tier));
  } catch {
    // silently fail
  }
}

export function getSessionId(tier: Tier): string {
  const storageKey = `portafolio-session-${tier}`;
  try {
    const existing = localStorage.getItem(storageKey);
    if (existing) return existing;

    const newId = crypto.randomUUID();
    localStorage.setItem(storageKey, newId);
    return newId;
  } catch {
    return crypto.randomUUID();
  }
}

export function clearSessionId(tier: Tier): void {
  try {
    localStorage.removeItem(`portafolio-session-${tier}`);
  } catch {
    // silently fail
  }
}
