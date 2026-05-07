import { z } from "zod";

// -- Shared field schemas --
// All optional fields use .optional() to handle undefined from react-hook-form

const requiredString = (msg = "Este campo es obligatorio") =>
  z.string().min(1, msg);

const emailSchema = z.string().email("Ingresa un email valido");

const optionalUrl = z
  .string()
  .url("Ingresa una URL valida")
  .or(z.literal(""))
  .optional()
  .default("");

const optionalPhone = z
  .string()
  .regex(/^\+?[\d\s\-()]{7,20}$/, "Ingresa un numero valido")
  .or(z.literal(""))
  .optional()
  .default("");

const filePathSchema = requiredString("Debes subir este archivo");

const optionalString = z.string().optional().default("");

// -- Repeater schemas --

const projectSchema = z.object({
  name: requiredString("Nombre del proyecto es obligatorio"),
  description: requiredString("Descripcion es obligatoria"),
  url: z.string().optional().default(""),
  image: z.string().optional().default(""),
});

const testimonialSchema = z.object({
  quote: requiredString("La cita es obligatoria"),
  author: requiredString("Nombre del autor es obligatorio"),
  role: z.string().optional().default(""),
  company: z.string().optional().default(""),
});

// -- Tier Schemas --

export const starterSchema = z.object({
  payment_proof: filePathSchema,
  cv: filePathSchema,
  photo: filePathSchema,
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
});

export const plusSchema = z.object({
  payment_proof: filePathSchema,
  cv: filePathSchema,
  photo: filePathSchema,
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
  socials: z.record(z.string(), z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
});

export const proSchema = z.object({
  payment_proof: filePathSchema,
  cv: filePathSchema,
  photo: filePathSchema,
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
  socials: z.record(z.string(), z.string()).optional(),
  projects: z.array(projectSchema).optional(),
  color_preference: optionalString,
  custom_colors: z.array(z.string()).optional(),
  domain_preference: optionalString,
  testimonials: z.array(testimonialSchema).optional(),
});

export const premiumSchema = z.object({
  payment_proof: filePathSchema,
  cv: filePathSchema,
  photo: filePathSchema,
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
  socials: z.record(z.string(), z.string()).optional(),
  projects: z.array(projectSchema).optional(),
  custom_colors: z.array(z.string()).optional(),
  color_preference: optionalString,
  design_references: z.array(z.string()).optional(),
  brand_values: optionalString,
  target_audience: optionalString,
  font_preference: optionalString,
  animation_preference: optionalString,
  custom_sections: optionalString,
  testimonials: z.array(testimonialSchema).optional(),
  media: z.array(z.string()).optional(),
  domain_preference: optionalString,
});

export const schemas = {
  starter: starterSchema,
  plus: plusSchema,
  pro: proSchema,
  premium: premiumSchema,
} as const;

export type StarterFormData = z.infer<typeof starterSchema>;
export type PlusFormData = z.infer<typeof plusSchema>;
export type ProFormData = z.infer<typeof proSchema>;
export type PremiumFormData = z.infer<typeof premiumSchema>;
