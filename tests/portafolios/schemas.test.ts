import { describe, it, expect } from "vitest";
import {
  starterSchema,
  plusSchema,
  proSchema,
  premiumSchema,
} from "@/lib/portafolios/schemas";

describe("starterSchema", () => {
  it("accepts valid minimal data", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects missing payment_proof", () => {
    const data = {
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes("payment_proof"))).toBe(true);
    }
  });

  it("rejects missing cv", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects missing photo", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      contact_email: "test@example.com",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "not-an-email",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts optional fields as empty strings", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
      linkedin_url: "",
      contact_phone: "",
      custom_colors: "",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts valid LinkedIn URL", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
      linkedin_url: "https://linkedin.com/in/johndoe",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects invalid LinkedIn URL", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
      linkedin_url: "not-a-url",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts valid phone number", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
      contact_phone: "+51 967 326 013",
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts socials as array of strings", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
      socials: ["https://github.com/test", "https://twitter.com/test"],
    };
    const result = starterSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("does NOT have domain_preference field", () => {
    const data = {
      payment_proof: "starter/abc/payment_proof/file.jpg",
      cv: "starter/abc/cv/resume.pdf",
      photo: "starter/abc/photo/face.jpg",
      contact_email: "test@example.com",
    };
    const result = starterSchema.safeParse(data);
    if (result.success) {
      expect("domain_preference" in result.data).toBe(false);
    }
  });
});

describe("plusSchema", () => {
  const validPlusData = {
    payment_proof: "plus/abc/payment_proof/file.jpg",
    cv: "plus/abc/cv/resume.pdf",
    photo: "plus/abc/photo/face.jpg",
    contact_email: "test@example.com",
  };

  it("accepts valid minimal data", () => {
    const result = plusSchema.safeParse(validPlusData);
    expect(result.success).toBe(true);
  });

  it("accepts certifications repeater data", () => {
    const data = {
      ...validPlusData,
      certifications: [
        { name: "CS50x", issuer: "Harvard University", date: "2024" },
        { name: "Google Analytics", issuer: "Google" },
      ],
    };
    const result = plusSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects certifications with missing required fields", () => {
    const data = {
      ...validPlusData,
      certifications: [{ name: "", issuer: "Harvard" }],
    };
    const result = plusSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts skills_override as array of strings", () => {
    const data = {
      ...validPlusData,
      skills_override: ["Estrategia de Negocios", "Design Thinking", "Liderazgo"],
    };
    const result = plusSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts achievements as array of strings (max 3)", () => {
    const data = {
      ...validPlusData,
      achievements: ["Primer lugar hackathon", "Top 5%", "Beca completa"],
    };
    const result = plusSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts languages as array of strings", () => {
    const data = {
      ...validPlusData,
      languages: ["Espanol (nativo)", "Ingles (avanzado)", "Portugues (basico)"],
    };
    const result = plusSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("does NOT have domain_preference field", () => {
    const data = {
      ...validPlusData,
      domain_preference: "test.lat",
    };
    const result = plusSchema.safeParse(data);
    if (result.success) {
      // domain_preference should be stripped since it's not in the schema
      expect("domain_preference" in result.data).toBe(false);
    }
  });

  it("accepts color preferences", () => {
    const data = {
      ...validPlusData,
      color_preference: "custom",
      custom_colors: ["#E42208", "azul oscuro"],
    };
    const result = plusSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});

describe("proSchema", () => {
  const validProData = {
    payment_proof: "pro/abc/payment_proof/file.jpg",
    cv: "pro/abc/cv/resume.pdf",
    photo: "pro/abc/photo/face.jpg",
    contact_email: "test@example.com",
  };

  it("accepts valid minimal data", () => {
    const result = proSchema.safeParse(validProData);
    expect(result.success).toBe(true);
  });

  it("accepts inherited fields (achievements, certifications, languages, skills_override)", () => {
    const data = {
      ...validProData,
      achievements: ["Top 5% facultad"],
      certifications: [{ name: "AWS", issuer: "Amazon", date: "2025" }],
      languages: ["Espanol (nativo)", "Ingles (avanzado)"],
      skills_override: ["Product Management", "AI Engineering"],
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts projects repeater", () => {
    const data = {
      ...validProData,
      projects: [
        {
          name: "Portfolio Factory",
          description: "Sistema de creacion de portafolios",
          url: "https://example.com",
          image: "pro/abc/projects.0.image/screenshot.png",
        },
        {
          name: "Second Project",
          description: "Another project",
        },
      ],
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects projects with missing name", () => {
    const data = {
      ...validProData,
      projects: [{ name: "", description: "A description" }],
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts testimonials repeater", () => {
    const data = {
      ...validProData,
      testimonials: [
        {
          quote: "Excelente trabajo",
          author: "Maria Garcia",
          role: "CEO",
          company: "TechCo",
        },
      ],
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts stats repeater", () => {
    const data = {
      ...validProData,
      stats: [
        { value: "Top 5%", label: "Facultad" },
        { value: "1,000+", label: "Asistentes a eventos" },
        { value: "$60K+", label: "Generados en ventas" },
        { value: "15+", label: "Proyectos completados" },
      ],
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects stats with missing value", () => {
    const data = {
      ...validProData,
      stats: [{ value: "", label: "Facultad" }],
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts tagline", () => {
    const data = {
      ...validProData,
      tagline: "En la interseccion de negocios, tecnologia y emprendimiento.",
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts domain_preference (.lat)", () => {
    const data = {
      ...validProData,
      domain_preference: "juanperez.lat",
    };
    const result = proSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});

describe("premiumSchema", () => {
  const validPremiumData = {
    payment_proof: "premium/abc/payment_proof/file.jpg",
    cv: "premium/abc/cv/resume.pdf",
    photo: "premium/abc/photo/face.jpg",
    contact_email: "test@example.com",
  };

  it("accepts valid minimal data", () => {
    const result = premiumSchema.safeParse(validPremiumData);
    expect(result.success).toBe(true);
  });

  it("accepts all inherited fields", () => {
    const data = {
      ...validPremiumData,
      achievements: ["Primer lugar hackathon"],
      certifications: [{ name: "CS50x", issuer: "Harvard", date: "2024" }],
      languages: ["Espanol (nativo)"],
      skills_override: ["AI Engineering"],
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts personal_quote", () => {
    const data = {
      ...validPremiumData,
      personal_quote:
        "La innovacion ocurre cuando conectas ecosistemas que aun no se conocen.",
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts services repeater", () => {
    const data = {
      ...validPremiumData,
      services: [
        {
          title: "AI y Desarrollo de Productos",
          description: "Desarrollo de soluciones basadas en inteligencia artificial",
          items: ["Prototipo", "MVP", "Estrategia"],
        },
        {
          title: "Consultoria Estrategica",
          description: "Asesoria en transformacion digital",
        },
      ],
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("rejects services with missing title", () => {
    const data = {
      ...validPremiumData,
      services: [{ title: "", description: "Something" }],
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it("accepts about_photo", () => {
    const data = {
      ...validPremiumData,
      about_photo: "premium/abc/about_photo/photo2.jpg",
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts stats and tagline", () => {
    const data = {
      ...validPremiumData,
      stats: [
        { value: "Top 5%", label: "Facultad" },
        { value: "1,000+", label: "Asistentes" },
      ],
      tagline: "Connecting ecosystems through innovation.",
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts creative direction fields", () => {
    const data = {
      ...validPremiumData,
      design_references: ["https://example.com/portfolio1", "https://example.com/portfolio2"],
      brand_values: "innovador, minimalista, profesional",
      target_audience: "both",
      font_preference: "sans-serif",
      animation_preference: "dynamic",
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts domain_preference (.com)", () => {
    const data = {
      ...validPremiumData,
      domain_preference: "tunombre.com",
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts projects up to 10", () => {
    const projects = Array.from({ length: 10 }, (_, i) => ({
      name: `Project ${i + 1}`,
      description: `Description ${i + 1}`,
    }));
    const data = { ...validPremiumData, projects };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts media array", () => {
    const data = {
      ...validPremiumData,
      media: ["premium/abc/media/video.mp4", "premium/abc/media/case-study.pdf"],
    };
    const result = premiumSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
