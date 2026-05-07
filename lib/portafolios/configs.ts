import type { Tier, TierConfig, StepConfig, FieldConfig } from "./types";
import { FILE_LIMITS } from "./constants";

// -- Shared steps (used across multiple tiers) --

const paymentStep: StepConfig = {
  id: "pago",
  title: "Comprobante de pago",
  description:
    "Sube una captura de tu comprobante de pago (Yape, transferencia bancaria, etc.)",
  fields: [
    {
      name: "payment_proof",
      type: "file",
      label: "Comprobante de pago",
      placeholder: "Arrastra tu captura aqui o haz clic para seleccionar",
      required: true,
      accept: FILE_LIMITS.payment_proof.accept,
      maxSize: FILE_LIMITS.payment_proof.maxSize,
      helperText: "JPG, PNG o PDF. Maximo 5MB.",
    },
  ],
};

const cvStep: StepConfig = {
  id: "cv",
  title: "Tu CV",
  description:
    "Sube tu curriculum. Extraeremos tu informacion automaticamente para armar tu portafolio.",
  fields: [
    {
      name: "cv",
      type: "file",
      label: "Curriculum Vitae",
      placeholder: "Arrastra tu CV aqui o haz clic para seleccionar",
      required: true,
      accept: FILE_LIMITS.cv.accept,
      maxSize: FILE_LIMITS.cv.maxSize,
      helperText: "PDF o DOCX. Maximo 10MB.",
    },
  ],
};

const photoStep: StepConfig = {
  id: "foto",
  title: "Tu foto",
  description: "Sube una foto profesional. Minimo 400x400 pixeles.",
  fields: [
    {
      name: "photo",
      type: "file",
      label: "Foto de perfil",
      placeholder: "Arrastra tu foto aqui o haz clic para seleccionar",
      required: true,
      accept: FILE_LIMITS.photo.accept,
      maxSize: FILE_LIMITS.photo.maxSize,
      minDimensions: { width: 400, height: 400 },
      helperText: "JPG, PNG o WebP. Minimo 400x400px. Maximo 5MB.",
    },
  ],
};

const contactStepBasic: StepConfig = {
  id: "contacto",
  title: "Datos de contacto",
  description: "Como te pueden contactar las personas que vean tu portafolio.",
  fields: [
    {
      name: "contact_email",
      type: "email",
      label: "Email de contacto",
      placeholder: "tu@email.com",
      required: true,
    },
    {
      name: "linkedin_url",
      type: "url",
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/tu-perfil",
      required: false,
    },
    {
      name: "contact_phone",
      type: "phone",
      label: "Telefono / WhatsApp",
      placeholder: "+51 999 999 999",
      required: false,
      helperText: "Opcional. Se mostrara en tu portafolio si lo deseas.",
    },
  ],
};

const contactStepWithSocials: StepConfig = {
  id: "contacto",
  title: "Datos de contacto",
  description: "Tus datos de contacto y redes sociales.",
  fields: [
    {
      name: "contact_email",
      type: "email",
      label: "Email de contacto",
      placeholder: "tu@email.com",
      required: true,
    },
    {
      name: "linkedin_url",
      type: "url",
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/tu-perfil",
      required: false,
    },
    {
      name: "contact_phone",
      type: "phone",
      label: "Telefono / WhatsApp",
      placeholder: "+51 999 999 999",
      required: false,
    },
    {
      name: "socials",
      type: "tags",
      label: "Otras redes sociales",
      placeholder: "Agrega tus perfiles (GitHub, Instagram, Behance, etc.)",
      helperText: "Pega las URLs de tus perfiles, una por una.",
    },
  ],
};

// -- Tier-specific steps --

const extraStep: StepConfig = {
  id: "extra",
  title: "Informacion adicional",
  description: "Logros destacados e idiomas que hablas.",
  fields: [
    {
      name: "achievements",
      type: "tags",
      label: "Logros destacados",
      placeholder: "Escribe un logro y presiona Enter",
      maxItems: 3,
      helperText: "Maximo 3 logros. Ej: 'Primer lugar en hackathon X'",
    },
    {
      name: "languages",
      type: "tags",
      label: "Idiomas",
      placeholder: "Ej: Espanol (nativo), Ingles (avanzado)",
      helperText: "Incluye tu nivel entre parentesis.",
    },
  ],
};

const projectsStep: StepConfig = {
  id: "proyectos",
  title: "Tus proyectos",
  description: "Agrega los proyectos que quieres mostrar en tu portafolio. Si no tienes proyectos por ahora, puedes omitir este paso.",
  fields: [
    {
      name: "projects",
      type: "repeater",
      label: "Proyectos",
      required: false,
      helperText: "Opcional. Agrega hasta 4 proyectos.",
      maxItems: 4,
      fields: [
        {
          name: "name",
          type: "text",
          label: "Nombre del proyecto",
          placeholder: "Mi Proyecto",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Descripcion",
          placeholder: "Que hiciste, que tecnologias usaste, cual fue el resultado...",
          required: true,
        },
        {
          name: "url",
          type: "url",
          label: "URL del proyecto",
          placeholder: "https://mi-proyecto.com",
          required: false,
        },
        {
          name: "image",
          type: "file",
          label: "Screenshot o imagen",
          accept: FILE_LIMITS.project_image.accept,
          maxSize: FILE_LIMITS.project_image.maxSize,
          required: false,
        },
      ],
    },
  ],
};

const projectsStepPremium: StepConfig = {
  ...projectsStep,
  description: "Agrega tus proyectos con imagenes para tu portafolio premium. Si no tienes por ahora, puedes omitir este paso.",
  fields: [
    {
      ...projectsStep.fields[0],
      helperText: "Opcional. Agrega hasta 10 proyectos con imagenes.",
      maxItems: 10,
    },
  ],
};

const preferencesStep: StepConfig = {
  id: "preferencias",
  title: "Preferencias de diseno",
  description: "Ayudanos a personalizar el look de tu portafolio.",
  fields: [
    {
      name: "color_preference",
      type: "select",
      label: "Preferencia de color",
      placeholder: "Selecciona una opcion",
      options: [
        { value: "warm", label: "Colores calidos (rojo, naranja, amarillo)" },
        { value: "cool", label: "Colores frios (azul, verde, morado)" },
        { value: "neutral", label: "Neutros (gris, negro, blanco)" },
        { value: "custom", label: "Tengo un color especifico en mente" },
      ],
    },
    {
      name: "domain_preference",
      type: "text",
      label: "Dominio .lat preferido",
      placeholder: "tunombre.lat",
      helperText:
        "Incluido en tu plan. Ej: juanperez.lat. Verificaremos disponibilidad.",
    },
  ],
};

const testimonialsStep: StepConfig = {
  id: "testimonios",
  title: "Testimonios",
  description:
    "Opcional. Agrega citas de colegas o clientes que respalden tu trabajo.",
  fields: [
    {
      name: "testimonials",
      type: "repeater",
      label: "Testimonios",
      required: false,
      maxItems: 5,
      fields: [
        {
          name: "quote",
          type: "textarea",
          label: "Cita",
          placeholder: "Lo que dijeron sobre tu trabajo...",
          required: true,
        },
        {
          name: "author",
          type: "text",
          label: "Nombre",
          placeholder: "Maria Garcia",
          required: true,
        },
        {
          name: "role",
          type: "text",
          label: "Cargo",
          placeholder: "CEO, Empresa X",
          required: false,
        },
        {
          name: "company",
          type: "text",
          label: "Empresa",
          placeholder: "Empresa X",
          required: false,
        },
      ],
    },
  ],
};

const creativeDirectionStep: StepConfig = {
  id: "direccion-creativa",
  title: "Direccion creativa",
  description:
    "Comparte tu vision para que el diseno refleje tu marca personal.",
  fields: [
    {
      name: "design_references",
      type: "tags",
      label: "Referencias visuales",
      placeholder: "Pega URLs de portafolios o sitios que te gusten",
      maxItems: 5,
      helperText: "2-3 URLs de sitios cuyo estilo te inspira.",
    },
    {
      name: "brand_values",
      type: "text",
      label: "Valores de marca",
      placeholder: "Ej: innovador, minimalista, profesional, creativo",
      helperText: "3-5 palabras clave que definan tu marca personal.",
    },
    {
      name: "target_audience",
      type: "select",
      label: "Audiencia objetivo",
      options: [
        { value: "recruiters", label: "Reclutadores" },
        { value: "clients", label: "Clientes potenciales" },
        { value: "both", label: "Ambos" },
      ],
    },
    {
      name: "font_preference",
      type: "select",
      label: "Preferencia tipografica",
      options: [
        { value: "sans-serif", label: "Sans-serif (moderna, limpia)" },
        { value: "serif", label: "Serif (elegante, tradicional)" },
        { value: "monospace", label: "Monospace (tecnica, developer)" },
      ],
    },
    {
      name: "animation_preference",
      type: "select",
      label: "Preferencia de animacion",
      options: [
        { value: "subtle", label: "Sutil (transiciones suaves)" },
        { value: "dynamic", label: "Dinamica (movimiento llamativo)" },
        { value: "minimal", label: "Minimal (casi sin animacion)" },
      ],
    },
  ],
};

const extraContentStep: StepConfig = {
  id: "contenido-extra",
  title: "Contenido adicional",
  description: "Secciones personalizadas, multimedia y testimonios.",
  fields: [
    {
      name: "custom_sections",
      type: "textarea",
      label: "Secciones personalizadas",
      placeholder:
        "Describe las secciones extra que quieres (ej: 'Publicaciones', 'Voluntariado', 'Side projects')",
      helperText: "Texto libre. Nosotros lo disenaremos.",
    },
    {
      name: "testimonials",
      type: "repeater",
      label: "Testimonios",
      required: false,
      maxItems: 5,
      fields: [
        {
          name: "quote",
          type: "textarea",
          label: "Cita",
          placeholder: "Lo que dijeron sobre tu trabajo...",
          required: true,
        },
        {
          name: "author",
          type: "text",
          label: "Nombre",
          placeholder: "Maria Garcia",
          required: true,
        },
        {
          name: "role",
          type: "text",
          label: "Cargo",
          placeholder: "CEO, Empresa X",
          required: false,
        },
        {
          name: "company",
          type: "text",
          label: "Empresa",
          placeholder: "Empresa X",
          required: false,
        },
      ],
    },
    {
      name: "media",
      type: "file",
      label: "Multimedia adicional",
      accept: FILE_LIMITS.media.accept,
      maxSize: FILE_LIMITS.media.maxSize,
      helperText: "Videos, case studies, PDFs. Maximo 10MB cada uno.",
    },
  ],
};

const domainStepPremium: StepConfig = {
  id: "dominio",
  title: "Tu dominio",
  description: "Elige el dominio .com para tu portafolio premium.",
  fields: [
    {
      name: "domain_preference",
      type: "text",
      label: "Dominio .com preferido",
      placeholder: "tunombre.com",
      helperText:
        "Incluido en tu plan Premium. Verificaremos disponibilidad y te confirmaremos.",
    },
  ],
};

// -- Confirmation step (shared, no fields — rendered specially) --

const confirmationStep: StepConfig = {
  id: "confirmacion",
  title: "Confirmar y enviar",
  description: "Revisa tus datos antes de enviar.",
  fields: [],
};

// -- Full tier configs --

export const TIER_CONFIGS: Record<Tier, TierConfig> = {
  starter: {
    name: "Starter",
    price: "S/ 99",
    features: [
      "Portafolio de 1 pagina",
      "Hosting gratuito (GitHub Pages)",
      "Diseno responsivo",
      "Dominio .github.io",
    ],
    deliveryTime: "2-3 dias habiles",
    steps: [paymentStep, cvStep, photoStep, contactStepBasic, confirmationStep],
  },
  plus: {
    name: "Plus",
    price: "S/ 199",
    features: [
      "Todo en Starter",
      "Secciones de logros e idiomas",
      "Mas redes sociales",
      "Dominio .github.io personalizado",
    ],
    deliveryTime: "3-4 dias habiles",
    steps: [
      paymentStep,
      cvStep,
      photoStep,
      contactStepWithSocials,
      extraStep,
      confirmationStep,
    ],
  },
  pro: {
    name: "Pro",
    price: "S/ 349",
    features: [
      "Todo en Plus",
      "Seccion de proyectos con imagenes",
      "Dominio .lat incluido",
      "Colores personalizados",
      "Foto mejorada con IA",
      "Testimonios",
    ],
    deliveryTime: "3-5 dias habiles",
    steps: [
      paymentStep,
      cvStep,
      photoStep,
      contactStepWithSocials,
      projectsStep,
      preferencesStep,
      testimonialsStep,
      confirmationStep,
    ],
  },
  premium: {
    name: "Premium",
    price: "S/ 599",
    features: [
      "Todo en Pro",
      "Dominio .com incluido",
      "Direccion creativa personalizada",
      "Animaciones avanzadas",
      "Secciones ilimitadas",
      "Multimedia (videos, case studies)",
      "Propuesta de diseno antes de empezar",
    ],
    deliveryTime: "5-7 dias habiles",
    steps: [
      paymentStep,
      cvStep,
      photoStep,
      contactStepWithSocials,
      projectsStepPremium,
      creativeDirectionStep,
      extraContentStep,
      domainStepPremium,
      confirmationStep,
    ],
  },
};

/** Get the field names for a specific step (used for per-step validation) */
export function getStepFieldNames(tier: Tier, stepIndex: number): string[] {
  const config = TIER_CONFIGS[tier];
  if (!config || stepIndex >= config.steps.length) return [];

  const step = config.steps[stepIndex];
  return step.fields.map((f) => f.name);
}
