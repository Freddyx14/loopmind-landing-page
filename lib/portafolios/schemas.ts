import { z } from "zod";

// -- Shared field schemas --

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

const certificationSchema = z.object({
  name: requiredString("Nombre del certificado es obligatorio"),
  issuer: requiredString("Institucion es obligatoria"),
  date: z.string().optional().default(""),
});

const statSchema = z.object({
  value: requiredString("El valor es obligatorio"),
  label: requiredString("La etiqueta es obligatoria"),
});

const serviceSchema = z.object({
  title: requiredString("Titulo del servicio es obligatorio"),
  description: requiredString("Descripcion es obligatoria"),
  items: z.array(z.string()).optional(),
});

// -- Tier Schemas --

export const starterSchema = z.object({
  // Step 1: Payment
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Photo
  photo: filePathSchema,
  // Step 4: Color preference
  custom_colors: optionalString,
  // Step 5: Contact
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
  socials: z.array(z.string()).optional(),
});

export const plusSchema = z.object({
  // Step 1: Payment
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Photo
  photo: filePathSchema,
  // Step 4: Contact
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
  socials: z.array(z.string()).optional(),
  // Step 5: Additional info
  achievements: z.array(z.string()).optional(),
  certifications: z.array(certificationSchema).optional(),
  languages: z.array(z.string()).optional(),
  // Step 6: Skills
  skills_override: z.array(z.string()).optional(),
  // Step 7: Design preferences (no domain — that's Pro)
  color_preference: optionalString,
  custom_colors: z.array(z.string()).optional(),
});

export const proSchema = z.object({
  // Step 1: Payment
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Photo
  photo: filePathSchema,
  // Step 4: Contact
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
  socials: z.array(z.string()).optional(),
  // Step 5: Additional info (inherited from Plus)
  achievements: z.array(z.string()).optional(),
  certifications: z.array(certificationSchema).optional(),
  languages: z.array(z.string()).optional(),
  skills_override: z.array(z.string()).optional(),
  // Step 6: Projects
  projects: z.array(projectSchema).optional(),
  // Step 7: Testimonials
  testimonials: z.array(testimonialSchema).optional(),
  // Step 8: Stats & tagline
  stats: z.array(statSchema).optional(),
  tagline: optionalString,
  // Step 9: Design preferences (includes .lat domain)
  color_preference: optionalString,
  custom_colors: z.array(z.string()).optional(),
  domain_preference: optionalString,
});

export const premiumSchema = z.object({
  // Step 1: Payment
  payment_proof: filePathSchema,
  // Step 2: CV
  cv: filePathSchema,
  // Step 3: Photo
  photo: filePathSchema,
  // Step 4: Contact
  contact_email: emailSchema,
  linkedin_url: optionalUrl,
  contact_phone: optionalPhone,
  socials: z.array(z.string()).optional(),
  // Step 5: Additional info (inherited)
  achievements: z.array(z.string()).optional(),
  certifications: z.array(certificationSchema).optional(),
  languages: z.array(z.string()).optional(),
  skills_override: z.array(z.string()).optional(),
  // Step 6: Projects (up to 10)
  projects: z.array(projectSchema).optional(),
  // Step 7: Testimonials + personal quote
  testimonials: z.array(testimonialSchema).optional(),
  personal_quote: optionalString,
  // Step 8: Stats, tagline & services
  stats: z.array(statSchema).optional(),
  tagline: optionalString,
  services: z.array(serviceSchema).optional(),
  // Step 9: Color preferences
  color_preference: optionalString,
  custom_colors: z.array(z.string()).optional(),
  // Step 10: Creative direction
  design_references: z.array(z.string()).optional(),
  brand_values: optionalString,
  target_audience: optionalString,
  font_preference: optionalString,
  animation_preference: optionalString,
  // Step 11: Extra content (custom sections, media, about photo, domain)
  custom_sections: optionalString,
  media: z.array(z.string()).optional(),
  about_photo: z.string().optional().default(""),
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
