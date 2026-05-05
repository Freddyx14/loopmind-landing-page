export type Locale = "en" | "es";

export const translations = {
  en: {
    nav: {
      services: "Services",
      process: "Process",
      pricing: "Pricing",
      faq: "FAQ",
      cta: "Get Free Audit",
    },
    hero: {
      tagline: "AI-FIRST MARKETING AGENCY",
      headline: "Smarter marketing.",
      headlineAccent: "Faster results.",
      subheadline:
        "One strategic mind + AI-powered systems delivering the marketing output of a full agency team — at a fraction of the cost.",
      cta: "Get Your Free AI Marketing Audit",
      ctaSecondary: "See How It Works",
    },
    philosophy: {
      title: "Sometimes, you just need to see it.",
      description:
        "We combine strategic thinking with AI automation to deliver what traditional agencies take weeks to produce — in days.",
      revealFront: "You know the business",
      revealBack: "We know the growth",
    },
    problem: {
      label: "THE PROBLEM",
      headline: "Marketing shouldn't drain your budget or your time",
      points: [
        {
          title: "Traditional agencies charge $5K-$15K/month",
          description:
            "And most of that pays for overhead, not results.",
        },
        {
          title: "Freelancers disappear mid-project",
          description:
            "No systems, no accountability, no continuity.",
        },
        {
          title: "You're doing it yourself at 2 AM",
          description:
            "Your business needs marketing, but you need to run your business.",
        },
      ],
    },
    services: {
      label: "WHAT WE DO",
      headline: "Full-service marketing, powered by AI",
      items: [
        {
          title: "Social Media",
          description:
            "Content creation, scheduling, community management across all platforms. 15-40 posts/month with full creative.",
        },
        {
          title: "SEO & Content",
          description:
            "Blog posts, technical SEO, GEO optimization for AI search visibility. Rank where your customers are looking.",
        },
        {
          title: "Paid Advertising",
          description:
            "Google Ads + Meta Ads management. We handle creative, targeting, and optimization to maximize your ROAS.",
        },
        {
          title: "Email Marketing",
          description:
            "Newsletters, automation flows, nurture sequences. Turn subscribers into customers on autopilot.",
        },
        {
          title: "AI Automation",
          description:
            "Custom AI workflows for lead gen, content repurposing, chatbots, and reporting. Your marketing runs 24/7.",
        },
        {
          title: "Web Development",
          description:
            "Landing pages and websites with scroll animations, motion graphics, and conversion-optimized design.",
        },
      ],
    },
    process: {
      label: "HOW IT WORKS",
      headline: "From zero to growth in 4 steps",
      steps: [
        {
          number: "01",
          title: "Free Audit",
          description:
            "We analyze your digital presence, competitors, and opportunities. You get a professional report with specific recommendations — free.",
        },
        {
          number: "02",
          title: "Strategy",
          description:
            "We build a custom 90-day growth plan tailored to your industry, audience, and budget. Clear KPIs, clear timeline.",
        },
        {
          number: "03",
          title: "Execute",
          description:
            "Our AI-powered systems produce content, manage campaigns, and optimize daily. You focus on your business.",
        },
        {
          number: "04",
          title: "Optimize",
          description:
            "Weekly optimization cycles. Real-time dashboards. Monthly reports. Every campaign is an iteration: test, learn, improve.",
        },
      ],
    },
    stats: {
      label: "WHY AI-FIRST",
      headline: "The unfair advantage",
      items: [
        { value: "70-80%", label: "of tasks automated by AI" },
        { value: "3x", label: "faster delivery than traditional agencies" },
        { value: "$70/mo", label: "tool cost vs. $15K+ team cost" },
        { value: "24/7", label: "campaigns running and optimizing" },
      ],
    },
    pricing: {
      label: "PRICING",
      headline: "Transparent pricing. No surprises.",
      toggle: { latam: "LATAM", international: "International" },
      tiers: [
        {
          name: "Ignite",
          description: "Start your digital presence",
          priceLatam: "$1,500",
          priceInternational: "$3,000",
          period: "/month",
          features: [
            "2 social platforms managed",
            "15 posts/month + stories",
            "Basic SEO audit",
            "Google Business Profile",
            "Monthly performance report",
            "1 strategy call/month",
            "Real-time analytics dashboard",
          ],
          cta: "Get Started",
          featured: false,
        },
        {
          name: "Accelerate",
          description: "Grow aggressively with leads",
          priceLatam: "$3,000",
          priceInternational: "$6,000",
          period: "/month",
          features: [
            "Everything in Ignite, plus:",
            "3 social platforms managed",
            "25 posts/month + 15 stories",
            "4 SEO blog posts/month",
            "Email marketing (4 newsletters)",
            "Google OR Meta Ads management",
            "Biweekly strategy calls",
          ],
          cta: "Get Started",
          featured: true,
        },
        {
          name: "Dominate",
          description: "Full-service maximum growth",
          priceLatam: "$5,000",
          priceInternational: "$10,000",
          period: "/month",
          features: [
            "Everything in Accelerate, plus:",
            "All social platforms managed",
            "40 posts/month + 20 stories",
            "8 blog posts + full SEO",
            "Google AND Meta Ads",
            "AI lead generation system",
            "GEO optimization (AI search)",
            "Weekly calls + Slack/WhatsApp",
          ],
          cta: "Get Started",
          featured: false,
        },
      ],
    },
    faq: {
      label: "FAQ",
      headline: "Questions? We have answers.",
      items: [
        {
          q: "How can one person deliver full-agency output?",
          a: "AI. Our systems automate 70-80% of execution — content generation, scheduling, reporting, optimization. The strategic thinking, creative direction, and quality control remain human. You get the speed of automation with the intelligence of a senior strategist.",
        },
        {
          q: "What industries do you work with?",
          a: "We currently serve clients in solar energy, food & hospitality, water technology, and edtech. Our AI systems adapt to any industry — the strategic frameworks are universal, the execution is customized.",
        },
        {
          q: "How quickly will I see results?",
          a: "Social media traction typically starts within 2-4 weeks. SEO shows meaningful movement in 60-90 days. Paid ads can generate leads within the first week. We set clear 90-day milestones so you always know what to expect.",
        },
        {
          q: "What if I'm not happy with the results?",
          a: "We operate on 3-month minimum commitments with 30-day notice after that. No long-term lock-ins. If we're not delivering value, you can walk away. We also offer a 90-Day Growth Pilot specifically designed to prove results before you commit long-term.",
        },
        {
          q: "Do you handle multiple languages?",
          a: "Yes. We create content in Spanish, English, and German. For Swiss and EU clients, we produce native-quality content in each language — not machine translations.",
        },
        {
          q: "What's included in the free marketing audit?",
          a: "A comprehensive review of your digital presence: SEO health, social media analysis, competitor snapshot, and specific recommendations with estimated impact. Delivered as a professional PDF report within 48 hours.",
        },
      ],
    },
    cta: {
      headline: "Ready to grow?",
      subheadline:
        "Book a free strategy call. We'll audit your current marketing, identify your biggest opportunities, and show you exactly how we'd grow your business.",
      button: "Book Your Free Strategy Call",
      note: "No commitment. No pressure. Just clarity.",
    },
    footer: {
      tagline: "Smarter marketing. Faster results.",
      services: "Services",
      company: "Company",
      links: {
        social: "Social Media",
        seo: "SEO & Content",
        ads: "Paid Advertising",
        email: "Email Marketing",
        ai: "AI Automation",
        web: "Web Development",
        about: "About",
        process: "Our Process",
        pricing: "Pricing",
        contact: "Contact",
      },
      contact: "Contact",
      copyright: "Loopmind. All rights reserved.",
      builtWith: "Built with AI.",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      process: "Proceso",
      pricing: "Precios",
      faq: "FAQ",
      cta: "Auditoría Gratis",
    },
    hero: {
      tagline: "AGENCIA DE MARKETING AI-FIRST",
      headline: "Marketing inteligente.",
      headlineAccent: "Resultados rápidos.",
      subheadline:
        "Una mente estratégica + sistemas de IA entregando la producción de marketing de un equipo completo — a una fracción del costo.",
      cta: "Obtén Tu Auditoría de Marketing Gratis",
      ctaSecondary: "Cómo Funciona",
    },
    philosophy: {
      title: "A veces, solo necesitas verlo.",
      description:
        "Combinamos pensamiento estratégico con automatización IA para entregar lo que agencias tradicionales tardan semanas — en días.",
      revealFront: "Tú conoces el negocio",
      revealBack: "Nosotros el crecimiento",
    },
    problem: {
      label: "EL PROBLEMA",
      headline: "El marketing no debería drenar tu presupuesto ni tu tiempo",
      points: [
        {
          title: "Las agencias tradicionales cobran $5K-$15K/mes",
          description:
            "Y la mayor parte paga gastos operativos, no resultados.",
        },
        {
          title: "Los freelancers desaparecen a mitad del proyecto",
          description:
            "Sin sistemas, sin responsabilidad, sin continuidad.",
        },
        {
          title: "Estás haciéndolo tú mismo a las 2 AM",
          description:
            "Tu negocio necesita marketing, pero tú necesitas dirigir tu negocio.",
        },
      ],
    },
    services: {
      label: "QUÉ HACEMOS",
      headline: "Marketing integral, impulsado por IA",
      items: [
        {
          title: "Redes Sociales",
          description:
            "Creación de contenido, programación, gestión de comunidad en todas las plataformas. 15-40 posts/mes con creativos completos.",
        },
        {
          title: "SEO & Contenido",
          description:
            "Blog posts, SEO técnico, optimización GEO para visibilidad en búsqueda IA. Posiciónate donde tus clientes buscan.",
        },
        {
          title: "Publicidad Digital",
          description:
            "Gestión de Google Ads + Meta Ads. Manejamos creativos, segmentación y optimización para maximizar tu ROAS.",
        },
        {
          title: "Email Marketing",
          description:
            "Newsletters, flujos de automatización, secuencias de nurture. Convierte suscriptores en clientes en piloto automático.",
        },
        {
          title: "Automatización IA",
          description:
            "Workflows personalizados para generación de leads, repurposing de contenido, chatbots y reportes. Tu marketing funciona 24/7.",
        },
        {
          title: "Desarrollo Web",
          description:
            "Landing pages y sitios web con animaciones scroll, motion graphics y diseño optimizado para conversión.",
        },
      ],
    },
    process: {
      label: "CÓMO FUNCIONA",
      headline: "De cero a crecimiento en 4 pasos",
      steps: [
        {
          number: "01",
          title: "Auditoría Gratis",
          description:
            "Analizamos tu presencia digital, competidores y oportunidades. Recibes un reporte profesional con recomendaciones específicas — gratis.",
        },
        {
          number: "02",
          title: "Estrategia",
          description:
            "Construimos un plan de crecimiento de 90 días adaptado a tu industria, audiencia y presupuesto. KPIs claros, timeline claro.",
        },
        {
          number: "03",
          title: "Ejecución",
          description:
            "Nuestros sistemas de IA producen contenido, gestionan campañas y optimizan diariamente. Tú te enfocas en tu negocio.",
        },
        {
          number: "04",
          title: "Optimización",
          description:
            "Ciclos de optimización semanales. Dashboards en tiempo real. Reportes mensuales. Cada campaña es una iteración: probar, aprender, mejorar.",
        },
      ],
    },
    stats: {
      label: "POR QUÉ AI-FIRST",
      headline: "La ventaja injusta",
      items: [
        { value: "70-80%", label: "de tareas automatizadas por IA" },
        { value: "3x", label: "más rápido que agencias tradicionales" },
        { value: "$70/mes", label: "costo de herramientas vs. $15K+ en equipo" },
        { value: "24/7", label: "campañas corriendo y optimizando" },
      ],
    },
    pricing: {
      label: "PRECIOS",
      headline: "Precios transparentes. Sin sorpresas.",
      toggle: { latam: "LATAM", international: "Internacional" },
      tiers: [
        {
          name: "Ignite",
          description: "Inicia tu presencia digital",
          priceLatam: "$1,500",
          priceInternational: "$3,000",
          period: "/mes",
          features: [
            "2 plataformas sociales gestionadas",
            "15 posts/mes + stories",
            "Auditoría SEO básica",
            "Google Business Profile",
            "Reporte de rendimiento mensual",
            "1 llamada de estrategia/mes",
            "Dashboard de analytics en tiempo real",
          ],
          cta: "Empezar",
          featured: false,
        },
        {
          name: "Accelerate",
          description: "Crece agresivamente con leads",
          priceLatam: "$3,000",
          priceInternational: "$6,000",
          period: "/mes",
          features: [
            "Todo en Ignite, más:",
            "3 plataformas sociales gestionadas",
            "25 posts/mes + 15 stories",
            "4 blog posts SEO/mes",
            "Email marketing (4 newsletters)",
            "Google O Meta Ads management",
            "Llamadas de estrategia quincenales",
          ],
          cta: "Empezar",
          featured: true,
        },
        {
          name: "Dominate",
          description: "Servicio completo, máximo crecimiento",
          priceLatam: "$5,000",
          priceInternational: "$10,000",
          period: "/mes",
          features: [
            "Todo en Accelerate, más:",
            "Todas las plataformas sociales",
            "40 posts/mes + 20 stories",
            "8 blog posts + SEO completo",
            "Google Y Meta Ads",
            "Sistema de generación de leads IA",
            "Optimización GEO (búsqueda IA)",
            "Llamadas semanales + Slack/WhatsApp",
          ],
          cta: "Empezar",
          featured: false,
        },
      ],
    },
    faq: {
      label: "FAQ",
      headline: "¿Preguntas? Tenemos respuestas.",
      items: [
        {
          q: "¿Cómo puede una persona entregar el output de una agencia completa?",
          a: "IA. Nuestros sistemas automatizan el 70-80% de la ejecución — generación de contenido, programación, reportes, optimización. El pensamiento estratégico, la dirección creativa y el control de calidad siguen siendo humanos. Obtienes la velocidad de la automatización con la inteligencia de un estratega senior.",
        },
        {
          q: "¿Con qué industrias trabajan?",
          a: "Actualmente servimos clientes en energía solar, gastronomía y hospitalidad, tecnología del agua y edtech. Nuestros sistemas de IA se adaptan a cualquier industria — los frameworks estratégicos son universales, la ejecución es personalizada.",
        },
        {
          q: "¿Qué tan rápido veré resultados?",
          a: "La tracción en redes sociales típicamente comienza en 2-4 semanas. SEO muestra movimiento significativo en 60-90 días. Los ads pagados pueden generar leads la primera semana. Establecemos hitos claros a 90 días para que siempre sepas qué esperar.",
        },
        {
          q: "¿Qué pasa si no estoy satisfecho con los resultados?",
          a: "Operamos con compromisos mínimos de 3 meses con aviso de 30 días después. Sin contratos largos. Si no estamos entregando valor, puedes irte. También ofrecemos un Piloto de Crecimiento de 90 Días diseñado específicamente para probar resultados antes de comprometerte a largo plazo.",
        },
        {
          q: "¿Manejan múltiples idiomas?",
          a: "Sí. Creamos contenido en español, inglés y alemán. Para clientes suizos y europeos, producimos contenido de calidad nativa en cada idioma — no traducciones automáticas.",
        },
        {
          q: "¿Qué incluye la auditoría de marketing gratuita?",
          a: "Una revisión completa de tu presencia digital: salud SEO, análisis de redes sociales, snapshot de competidores y recomendaciones específicas con impacto estimado. Entregada como un reporte PDF profesional en 48 horas.",
        },
      ],
    },
    cta: {
      headline: "¿Listo para crecer?",
      subheadline:
        "Agenda una llamada de estrategia gratuita. Auditaremos tu marketing actual, identificaremos tus mayores oportunidades y te mostraremos exactamente cómo haríamos crecer tu negocio.",
      button: "Agenda Tu Llamada Estratégica Gratis",
      note: "Sin compromiso. Sin presión. Solo claridad.",
    },
    footer: {
      tagline: "Marketing inteligente. Resultados rápidos.",
      services: "Servicios",
      company: "Empresa",
      links: {
        social: "Redes Sociales",
        seo: "SEO & Contenido",
        ads: "Publicidad Digital",
        email: "Email Marketing",
        ai: "Automatización IA",
        web: "Desarrollo Web",
        about: "Nosotros",
        process: "Nuestro Proceso",
        pricing: "Precios",
        contact: "Contacto",
      },
      contact: "Contacto",
      copyright: "Loopmind. Todos los derechos reservados.",
      builtWith: "Construido con IA.",
    },
  },
};

export type Translations = typeof translations.en;
