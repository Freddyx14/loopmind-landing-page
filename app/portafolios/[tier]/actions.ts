"use server";

import { createServerClient } from "@/lib/supabase/server";
import type { SubmissionPayload } from "@/lib/portafolios/types";
import { VALID_TIERS } from "@/lib/portafolios/constants";

export async function submitPortfolio(payload: SubmissionPayload) {
  // Validate tier
  if (!VALID_TIERS.includes(payload.tier)) {
    return { success: false, error: "Tier invalido" };
  }

  // Validate required fields
  if (!payload.contact_email) {
    return { success: false, error: "Email es obligatorio" };
  }

  const supabase = createServerClient();

  // Extract full_name from form_data if not directly provided
  const fullName =
    payload.full_name ||
    (payload.form_data.full_name as string) ||
    "Sin nombre";

  const { data, error } = await supabase
    .from("portfolio_submissions")
    .insert({
      tier: payload.tier,
      session_id: payload.session_id,
      full_name: fullName,
      contact_email: payload.contact_email,
      contact_phone: payload.contact_phone || null,
      linkedin_url: payload.linkedin_url || null,
      form_data: payload.form_data,
      files: payload.files,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: "Error al guardar. Intenta de nuevo." };
  }

  return { success: true, id: data.id };
}
