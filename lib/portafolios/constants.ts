import type { Tier } from "./types";

export const VALID_TIERS: Tier[] = ["starter", "plus", "pro", "premium"];

export const TIER_LABELS: Record<Tier, string> = {
  starter: "Starter",
  plus: "Plus",
  pro: "Pro",
  premium: "Premium",
};

export const TIER_PRICES: Record<Tier, string> = {
  starter: "S/ 99",
  plus: "S/ 199",
  pro: "S/ 349",
  premium: "S/ 599",
};

export const TIER_PRICES_USD: Record<Tier, string> = {
  starter: "~$25 USD",
  plus: "~$50 USD",
  pro: "~$90 USD",
  premium: "~$155 USD",
};

export const TIER_DELIVERY: Record<Tier, string> = {
  starter: "2-3 dias habiles",
  plus: "3-4 dias habiles",
  pro: "3-5 dias habiles",
  premium: "5-7 dias habiles",
};

export const FILE_LIMITS = {
  cv: {
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: ".pdf,.docx",
    mimeTypes: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  photo: {
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ".jpg,.jpeg,.png,.webp",
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    minWidth: 400,
    minHeight: 400,
  },
  payment_proof: {
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ".jpg,.jpeg,.png,.pdf",
    mimeTypes: ["image/jpeg", "image/png", "application/pdf"],
  },
  project_image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ".jpg,.jpeg,.png,.webp",
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
  media: {
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: ".jpg,.jpeg,.png,.webp,.mp4,.pdf",
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "application/pdf",
    ],
  },
  about_photo: {
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ".jpg,.jpeg,.png,.webp",
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
  },
} as const;

export const PAYMENT_HOLDER = "Freddy Edwin \u00d1a\u00f1ez Choque";

export const PAYMENT_METHODS = [
  {
    id: "yape",
    label: "Yape / Plin",
    type: "mobile" as const,
    detail: "+51 967 326 013",
  },
  {
    id: "bcp",
    label: "BCP",
    type: "bank" as const,
    detail: "19108621597082",
    cci: "00219110862159708251",
  },
  {
    id: "interbank",
    label: "Interbank",
    type: "bank" as const,
    detail: "8983400542750",
    cci: "00389801340054275042",
  },
  {
    id: "bbva",
    label: "BBVA",
    type: "bank" as const,
    detail: "0011-0814-0291834499",
    cci: "01181400029183449911",
  },
  {
    id: "paypal",
    label: "PayPal",
    type: "international" as const,
    detail: "paypal.me/freddynanez",
    url: "https://www.paypal.com/paypalme/freddynanez",
  },
] as const;

export const SOCIAL_PLATFORMS = [
  { id: "github", label: "GitHub", placeholder: "https://github.com/tu-usuario" },
  { id: "instagram", label: "Instagram", placeholder: "https://instagram.com/tu-usuario" },
  { id: "behance", label: "Behance", placeholder: "https://behance.net/tu-usuario" },
  { id: "dribbble", label: "Dribbble", placeholder: "https://dribbble.com/tu-usuario" },
  { id: "twitter", label: "X (Twitter)", placeholder: "https://x.com/tu-usuario" },
  { id: "youtube", label: "YouTube", placeholder: "https://youtube.com/@tu-canal" },
  { id: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@tu-usuario" },
  { id: "website", label: "Sitio web", placeholder: "https://tu-sitio.com" },
] as const;

export const COLOR_OPTIONS = [
  { value: "warm", label: "Colores calidos (rojo, naranja, amarillo)" },
  { value: "cool", label: "Colores frios (azul, verde, morado)" },
  { value: "neutral", label: "Neutros (gris, negro, blanco)" },
  { value: "custom", label: "Tengo un color especifico en mente" },
] as const;

export const FONT_OPTIONS = [
  { value: "sans-serif", label: "Sans-serif (moderna, limpia)" },
  { value: "serif", label: "Serif (elegante, tradicional)" },
  { value: "monospace", label: "Monospace (tecnica, developer)" },
] as const;

export const ANIMATION_OPTIONS = [
  { value: "subtle", label: "Sutil (transiciones suaves)" },
  { value: "dynamic", label: "Dinamica (movimiento llamativo)" },
  { value: "minimal", label: "Minimal (casi sin animacion)" },
] as const;

export const DRAFT_EXPIRY_DAYS = 7;
