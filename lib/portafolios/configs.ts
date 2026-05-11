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

const contactStep: StepConfig = {
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
      helperText: "Opcional. Se mostrara en tu portafolio si lo deseas.",
    },
    {
      name: "socials",
      type: "tags",
      label: "Redes sociales",
      placeholder: "Agrega tus perfiles (GitHub, Instagram, Behance, etc.)",
      helperText: "Pega las URLs de tus perfiles, una por una. Sin limite.",
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

// -- Starter-specific steps --

const colorStepStarter: StepConfig = {
  id: "preferencias",
  title: "Preferencia de color",
  description: "Elige un color para tu portafolio.",
  fields: [
    {
      name: "custom_colors",
      type: "text",
      label: "Tu color",
      placeholder: "Ej: azul oscuro, #E42208, dorado...",
      helperText: "Escribe un color (nombre, hex, o descripcion).",
    },
  ],
};

// -- Plus-specific steps --

const certificationFields: FieldConfig[] = [
  {
    name: "certifications",
    type: "repeater",
    label: "Certificaciones",
    required: false,
    maxItems: 5,
    helperText: "Agrega hasta 5 certificaciones.",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Nombre del certificado",
        placeholder: "Ej: CS50x, Google Analytics, AWS Cloud Practitioner",
        required: true,
      },
      {
        name: "issuer",
        type: "text",
        label: "Institucion",
        placeholder: "Ej: Harvard University, Google, AWS",
        required: true,
      },
      {
        name: "date",
        type: "text",
        label: "Ano",
        placeholder: "Ej: 2024",
        required: false,
      },
    ],
  },
];

const extraStepPlus: StepConfig = {
  id: "extra",
  title: "Informacion adicional",
  description: "Logros, certificaciones e idiomas.",
  fields: [
    {
      name: "achievements",
      type: "tags",
      label: "Logros destacados",
      placeholder: "Escribe un logro y presiona Enter",
      maxItems: 3,
      helperText: "Maximo 3 logros. Ej: 'Primer lugar en hackathon X'",
    },
    ...certificationFields,
    {
      name: "languages",
      type: "tags",
      label: "Idiomas",
      placeholder: "Ej: Espanol (nativo), Ingles (avanzado)",
      helperText: "Incluye tu nivel entre parentesis.",
    },
  ],
};

const skillsStep: StepConfig = {
  id: "habilidades",
  title: "Habilidades",
  description:
    "Personaliza las habilidades que se muestran en tu portafolio. Si lo dejas vacio, usaremos las habilidades extraidas de tu CV.",
  fields: [
    {
      name: "skills_override",
      type: "tags",
      label: "Habilidades personalizadas",
      placeholder: "Ej: Estrategia de Negocios, Design Thinking, Liderazgo",
      helperText:
        "Preferimos habilidades generales (no solo tecnologias). Si lo dejas vacio, usaremos las del CV.",
    },
  ],
};

function makeColorFields(maxColors: number | undefined): FieldConfig[] {
  const limitText = maxColors ? `hasta ${maxColors}` : "los que quieras";
  return [
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
      name: "custom_colors",
      type: "tags",
      label: "Tus colores",
      placeholder: "Ej: #E42208, azul oscuro, dorado...",
      maxItems: maxColors,
      helperText: `Agrega ${limitText} colores (nombre, hex, o descripcion).`,
      showWhen: { field: "color_preference", value: "custom" },
    },
  ];
}

const preferencesStepPlus: StepConfig = {
  id: "preferencias",
  title: "Preferencias de diseno",
  description: "Ayudanos a personalizar el look de tu portafolio.",
  fields: makeColorFields(2),
};

// -- Pro-specific steps --

const extraStepPro: StepConfig = {
  id: "extra",
  title: "Informacion adicional",
  description: "Logros, certificaciones, idiomas y habilidades.",
  fields: [
    {
      name: "achievements",
      type: "tags",
      label: "Logros destacados",
      placeholder: "Escribe un logro y presiona Enter",
      maxItems: 3,
      helperText: "Maximo 3 logros. Ej: 'Primer lugar en hackathon X'",
    },
    ...certificationFields,
    {
      name: "languages",
      type: "tags",
      label: "Idiomas",
      placeholder: "Ej: Espanol (nativo), Ingles (avanzado)",
      helperText: "Incluye tu nivel entre parentesis.",
    },
    {
      name: "skills_override",
      type: "tags",
      label: "Habilidades personalizadas",
      placeholder: "Ej: Estrategia de Negocios, Design Thinking, Liderazgo",
      helperText:
        "Si lo dejas vacio, usaremos las habilidades extraidas de tu CV.",
    },
  ],
};

const projectsStep: StepConfig = {
  id: "proyectos",
  title: "Tus proyectos",
  description:
    "Agrega los proyectos que quieres mostrar en tu portafolio. Si no tienes proyectos por ahora, puedes omitir este paso.",
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
          placeholder:
            "Que hiciste, que tecnologias usaste, cual fue el resultado...",
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

const statsStep: StepConfig = {
  id: "metricas",
  title: "Metricas destacadas",
  description:
    "Numeros que impresionan: proyectos completados, clientes, posicion en ranking, etc.",
  fields: [
    {
      name: "stats",
      type: "repeater",
      label: "Metricas",
      required: false,
      maxItems: 4,
      helperText: "Hasta 4 metricas. Ej: 'Top 5%' — 'Facultad'",
      fields: [
        {
          name: "value",
          type: "text",
          label: "Valor",
          placeholder: "Ej: Top 5%, 1,000+, $60K+",
          required: true,
        },
        {
          name: "label",
          type: "text",
          label: "Etiqueta",
          placeholder: "Ej: Facultad, Asistentes a eventos",
          required: true,
        },
      ],
    },
    {
      name: "tagline",
      type: "text",
      label: "Tagline / Frase de posicionamiento",
      placeholder:
        "Ej: En la interseccion de negocios, tecnologia y emprendimiento.",
      helperText:
        "Una linea que te define profesionalmente. Si lo dejas vacio, generaremos una basada en tu CV.",
    },
  ],
};

const preferencesStepPro: StepConfig = {
  id: "preferencias",
  title: "Preferencias de diseno",
  description: "Personaliza el look de tu portafolio Pro.",
  fields: [
    ...makeColorFields(2),
    {
      name: "domain_preference",
      type: "text",
      label: "Dominio .com preferido",
      placeholder: "tunombre.com",
      helperText:
        "Incluido gratis por 1 ano en tu plan Pro. Verificaremos disponibilidad.",
    },
  ],
};

// -- Premium-specific steps --

const extraStepPremium: StepConfig = {
  id: "extra",
  title: "Informacion adicional",
  description: "Logros, certificaciones, idiomas y habilidades.",
  fields: [
    {
      name: "achievements",
      type: "tags",
      label: "Logros destacados",
      placeholder: "Escribe un logro y presiona Enter",
      maxItems: 3,
      helperText: "Maximo 3 logros. Ej: 'Primer lugar en hackathon X'",
    },
    ...certificationFields,
    {
      name: "languages",
      type: "tags",
      label: "Idiomas",
      placeholder: "Ej: Espanol (nativo), Ingles (avanzado)",
      helperText: "Incluye tu nivel entre parentesis.",
    },
    {
      name: "skills_override",
      type: "tags",
      label: "Habilidades personalizadas",
      placeholder: "Ej: Estrategia de Negocios, Design Thinking, Liderazgo",
      helperText:
        "Si lo dejas vacio, usaremos las habilidades extraidas de tu CV.",
    },
  ],
};

const projectsStepPremium: StepConfig = {
  id: "proyectos",
  title: "Tus proyectos",
  description:
    "Agrega tus proyectos con imagenes para tu portafolio premium. Si no tienes por ahora, puedes omitir este paso.",
  fields: [
    {
      name: "projects",
      type: "repeater",
      label: "Proyectos",
      required: false,
      helperText: "Opcional. Agrega hasta 10 proyectos con imagenes.",
      maxItems: 10,
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
          placeholder:
            "Que hiciste, que tecnologias usaste, cual fue el resultado...",
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

const testimonialsStepPremium: StepConfig = {
  id: "testimonios",
  title: "Testimonios y cita personal",
  description:
    "Agrega testimonios y una cita o filosofia personal que te represente.",
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
    {
      name: "personal_quote",
      type: "textarea",
      label: "Cita personal / Filosofia",
      placeholder:
        "Ej: La innovacion ocurre cuando conectas ecosistemas que aun no se conocen.",
      helperText:
        "Se mostrara de forma prominente en tu portafolio. Opcional.",
    },
  ],
};

const statsServicesStep: StepConfig = {
  id: "metricas-servicios",
  title: "Metricas y servicios",
  description: "Tus numeros clave y los servicios que ofreces.",
  fields: [
    {
      name: "stats",
      type: "repeater",
      label: "Metricas",
      required: false,
      maxItems: 4,
      helperText: "Hasta 4 metricas clave.",
      fields: [
        {
          name: "value",
          type: "text",
          label: "Valor",
          placeholder: "Ej: Top 5%, 1,000+, $60K+",
          required: true,
        },
        {
          name: "label",
          type: "text",
          label: "Etiqueta",
          placeholder: "Ej: Facultad, Asistentes a eventos",
          required: true,
        },
      ],
    },
    {
      name: "tagline",
      type: "text",
      label: "Tagline / Frase de posicionamiento",
      placeholder:
        "Ej: En la interseccion de negocios, tecnologia y emprendimiento.",
      helperText: "Si lo dejas vacio, generaremos una basada en tu CV.",
    },
    {
      name: "services",
      type: "repeater",
      label: "Servicios",
      required: false,
      maxItems: 3,
      helperText: "Hasta 3 servicios que ofreces.",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Nombre del servicio",
          placeholder: "Ej: AI y Desarrollo de Productos",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Descripcion",
          placeholder: "Describe brevemente este servicio...",
          required: true,
        },
        {
          name: "items",
          type: "tags",
          label: "Entregables / Items clave",
          placeholder: "Ej: Prototipo, MVP, Estrategia",
          maxItems: 4,
        },
      ],
    },
  ],
};

const preferencesStepPremium: StepConfig = {
  id: "preferencias",
  title: "Preferencias de color",
  description: "Elige los colores que quieras para tu portafolio premium.",
  fields: makeColorFields(undefined),
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

const extraContentStepPremium: StepConfig = {
  id: "contenido-extra",
  title: "Contenido adicional",
  description:
    "Secciones personalizadas, multimedia, segunda foto y tu dominio.",
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
      name: "media",
      type: "file",
      label: "Multimedia adicional",
      accept: FILE_LIMITS.media.accept,
      maxSize: FILE_LIMITS.media.maxSize,
      helperText: "Videos, case studies, PDFs. Maximo 10MB cada uno.",
    },
    {
      name: "about_photo",
      type: "file",
      label: "Segunda foto (seccion About)",
      placeholder: "Arrastra tu foto aqui o haz clic para seleccionar",
      accept: FILE_LIMITS.about_photo.accept,
      maxSize: FILE_LIMITS.about_photo.maxSize,
      helperText:
        "Una foto diferente a la principal, para la seccion About. JPG/PNG/WebP. Max 5MB.",
    },
    {
      name: "domain_preference",
      type: "text",
      label: "Dominio .com preferido",
      placeholder: "tunombre.com",
      helperText:
        "Incluido gratis por 1 ano en tu plan Premium. Verificaremos disponibilidad.",
    },
  ],
};

// -- Full tier configs --

export const TIER_CONFIGS: Record<Tier, TierConfig> = {
  starter: {
    name: "Starter",
    price: "S/ 99",
    features: [
      "Portafolio de 1 pagina",
      "Hosting gratuito",
      "Diseno responsivo",
      "1 color personalizado",
      "Subdominio gratis .loopmind.lat",
    ],
    deliveryTime: "2-3 dias habiles",
    steps: [
      paymentStep,
      cvStep,
      photoStep,
      colorStepStarter,
      contactStep,
      confirmationStep,
    ],
  },
  plus: {
    name: "Plus",
    price: "S/ 199",
    features: [
      "Todo en Starter",
      "Secciones de logros, certificaciones e idiomas",
      "Habilidades personalizadas",
      "2 colores personalizados",
      "Subdominio gratis .loopmind.lat",
      "Animaciones de scroll reveal",
    ],
    deliveryTime: "3-4 dias habiles",
    steps: [
      paymentStep,
      cvStep,
      photoStep,
      contactStep,
      extraStepPlus,
      skillsStep,
      preferencesStepPlus,
      confirmationStep,
    ],
  },
  pro: {
    name: "Pro",
    price: "S/ 349",
    features: [
      "Todo en Plus",
      "Seccion de proyectos con imagenes",
      "Testimonios de colegas/clientes",
      "Metricas destacadas y tagline",
      "Dominio .com gratis por 1 ano",
      "Foto mejorada con IA",
    ],
    deliveryTime: "3-5 dias habiles",
    steps: [
      paymentStep,
      cvStep,
      photoStep,
      contactStep,
      extraStepPro,
      projectsStep,
      testimonialsStep,
      statsStep,
      preferencesStepPro,
      confirmationStep,
    ],
  },
  premium: {
    name: "Premium",
    price: "S/ 599",
    features: [
      "Todo en Pro",
      "Dominio .com gratis por 1 ano",
      "Servicios con cards personalizadas",
      "Cita personal con animacion",
      "Direccion creativa personalizada",
      "Colores ilimitados",
      "Animaciones avanzadas",
      "Toggle de idioma ES/EN",
      "Multimedia (videos, case studies)",
      "Propuesta de diseno antes de empezar",
    ],
    deliveryTime: "5-7 dias habiles",
    steps: [
      paymentStep,
      cvStep,
      photoStep,
      contactStep,
      extraStepPremium,
      projectsStepPremium,
      testimonialsStepPremium,
      statsServicesStep,
      preferencesStepPremium,
      creativeDirectionStep,
      extraContentStepPremium,
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
