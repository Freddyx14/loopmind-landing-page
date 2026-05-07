import { z } from "zod";

// -- Shared field schemas --

const requiredString = (msg = "Este campo es obligatorio") =>
  z.string().min(1, msg);

const emailSchema = z.string().email("Ingresa un email valido");

const urlSchema = z
  .string()
  .url("Ingresa una URL valida")
  .or(z.literal(""));

const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-()]{7,20}$/, "Ingresa un numero valido")
  .or(z.literal(""));

const filePathSchema = requiredString("Debes subir este archivo");

const optionalFilePathSchema = z.string().optional().or(z.literal(""));

// -- Repeater schemas --

const projectSchema = z.object({
  name: requiredString("Nombre del proyecto es obligatorio"),
  description: requiredString("Descripcion es obligatoria"),
  url: urlSchema.optional().or(z.literal("")),
  image: optionalFilePathSchema,
});

const testimonialSchema = z.object({
  quote: requiredString("La cita es obligatoria"),
  author: requiredString("Nombre del autor es obligatorio"),
  role: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
});

// -- Tier Schemas --

export const starterSchema = z.object({
  // Step 1: Pago
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Foto
  photo: filePathSchema,
  // Step 4: Contacto
  contact_email: emailSchema,
  linkedin_url: urlSchema,
  contact_phone: phoneSchema.optional().or(z.literal("")),
});

export const plusSchema = z.object({
  // Step 1: Pago
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Foto
  photo: filePathSchema,
  // Step 4: Contacto
  contact_email: emailSchema,
  linkedin_url: urlSchema,
  contact_phone: phoneSchema.optional().or(z.literal("")),
  socials: z.record(z.string(), z.string()).optional(),
  // Step 5: Extra
  achievements: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
});

export const proSchema = z.object({
  // Step 1: Pago
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Foto
  photo: filePathSchema,
  // Step 4: Contacto
  contact_email: emailSchema,
  linkedin_url: urlSchema,
  contact_phone: phoneSchema.optional().or(z.literal("")),
  socials: z.record(z.string(), z.string()).optional(),
  // Step 5: Proyectos (optional — client can skip)
  projects: z.array(projectSchema).optional(),
  // Step 6: Preferencias
  color_preference: z.string().optional(),
  custom_colors: z.array(z.string()).optional(),
  domain_preference: z.string().optional(),
  // Step 7: Testimonios
  testimonials: z.array(testimonialSchema).optional(),
});

export const premiumSchema = z.object({
  // Step 1: Pago
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Foto
  photo: filePathSchema,
  // Step 4: Contacto
  contact_email: emailSchema,
  linkedin_url: urlSchema,
  contact_phone: phoneSchema.optional().or(z.literal("")),
  socials: z.record(z.string(), z.string()).optional(),
  // Step 5: Proyectos (optional — client can skip)
  projects: z.array(projectSchema).optional(),
  // Color (from preferences in Premium)
  custom_colors: z.array(z.string()).optional(),
  // Step 6: Direccion creativa
  design_references: z.array(z.string().url()).optional(),
  brand_values: z.string().optional(),
  target_audience: z.string().optional(),
  font_preference: z.string().optional(),
  animation_preference: z.string().optional(),
  // Step 7: Contenido extra
  custom_sections: z.string().optional(),
  testimonials: z.array(testimonialSchema).optional(),
  media: z.array(z.string()).optional(),
  // Step 8: Dominio
  domain_preference: z.string().optional(),
});

export const schemas = {
  starter: starterSchema,
  plus: plusSchema,
  pro: proSchema,
  premium: premiumSchema,
} as const;

// Infer types from schemas
export type StarterFormData = z.infer<typeof starterSchema>;
export type PlusFormData = z.infer<typeof plusSchema>;
export type ProFormData = z.infer<typeof proSchema>;
export type PremiumFormData = z.infer<typeof premiumSchema>;
