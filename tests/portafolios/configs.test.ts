import { describe, it, expect } from "vitest";
import { TIER_CONFIGS, getStepFieldNames } from "@/lib/portafolios/configs";
import type { Tier } from "@/lib/portafolios/types";

describe("TIER_CONFIGS step counts", () => {
  it("Starter has exactly 6 steps", () => {
    expect(TIER_CONFIGS.starter.steps).toHaveLength(6);
  });

  it("Plus has exactly 8 steps", () => {
    expect(TIER_CONFIGS.plus.steps).toHaveLength(8);
  });

  it("Pro has exactly 10 steps", () => {
    expect(TIER_CONFIGS.pro.steps).toHaveLength(10);
  });

  it("Premium has exactly 12 steps", () => {
    expect(TIER_CONFIGS.premium.steps).toHaveLength(12);
  });
});

describe("TIER_CONFIGS step IDs", () => {
  it("Starter steps match spec order", () => {
    const ids = TIER_CONFIGS.starter.steps.map((s) => s.id);
    expect(ids).toEqual([
      "pago",
      "cv",
      "foto",
      "preferencias",
      "contacto",
      "confirmacion",
    ]);
  });

  it("Plus steps match spec order", () => {
    const ids = TIER_CONFIGS.plus.steps.map((s) => s.id);
    expect(ids).toEqual([
      "pago",
      "cv",
      "foto",
      "contacto",
      "extra",
      "habilidades",
      "preferencias",
      "confirmacion",
    ]);
  });

  it("Pro steps match spec order", () => {
    const ids = TIER_CONFIGS.pro.steps.map((s) => s.id);
    expect(ids).toEqual([
      "pago",
      "cv",
      "foto",
      "contacto",
      "extra",
      "proyectos",
      "testimonios",
      "metricas",
      "preferencias",
      "confirmacion",
    ]);
  });

  it("Premium steps match spec order", () => {
    const ids = TIER_CONFIGS.premium.steps.map((s) => s.id);
    expect(ids).toEqual([
      "pago",
      "cv",
      "foto",
      "contacto",
      "extra",
      "proyectos",
      "testimonios",
      "metricas-servicios",
      "preferencias",
      "direccion-creativa",
      "contenido-extra",
      "confirmacion",
    ]);
  });
});

describe("TIER_CONFIGS field presence per tier", () => {
  function getAllFieldNames(tier: Tier): string[] {
    return TIER_CONFIGS[tier].steps.flatMap((step) =>
      step.fields.map((f) => f.name)
    );
  }

  describe("Starter fields", () => {
    it("has payment_proof, cv, photo, contact_email", () => {
      const fields = getAllFieldNames("starter");
      expect(fields).toContain("payment_proof");
      expect(fields).toContain("cv");
      expect(fields).toContain("photo");
      expect(fields).toContain("contact_email");
    });

    it("has custom_colors (single text input)", () => {
      const fields = getAllFieldNames("starter");
      expect(fields).toContain("custom_colors");
    });

    it("does NOT have domain_preference", () => {
      const fields = getAllFieldNames("starter");
      expect(fields).not.toContain("domain_preference");
    });

    it("does NOT have certifications", () => {
      const fields = getAllFieldNames("starter");
      expect(fields).not.toContain("certifications");
    });

    it("does NOT have projects", () => {
      const fields = getAllFieldNames("starter");
      expect(fields).not.toContain("projects");
    });
  });

  describe("Plus fields", () => {
    it("has achievements, certifications, languages", () => {
      const fields = getAllFieldNames("plus");
      expect(fields).toContain("achievements");
      expect(fields).toContain("certifications");
      expect(fields).toContain("languages");
    });

    it("has skills_override", () => {
      const fields = getAllFieldNames("plus");
      expect(fields).toContain("skills_override");
    });

    it("has color_preference and custom_colors", () => {
      const fields = getAllFieldNames("plus");
      expect(fields).toContain("color_preference");
      expect(fields).toContain("custom_colors");
    });

    it("does NOT have domain_preference", () => {
      const fields = getAllFieldNames("plus");
      expect(fields).not.toContain("domain_preference");
    });

    it("does NOT have projects", () => {
      const fields = getAllFieldNames("plus");
      expect(fields).not.toContain("projects");
    });

    it("does NOT have testimonials", () => {
      const fields = getAllFieldNames("plus");
      expect(fields).not.toContain("testimonials");
    });
  });

  describe("Pro fields", () => {
    it("has inherited fields (achievements, certifications, languages, skills_override)", () => {
      const fields = getAllFieldNames("pro");
      expect(fields).toContain("achievements");
      expect(fields).toContain("certifications");
      expect(fields).toContain("languages");
      expect(fields).toContain("skills_override");
    });

    it("has projects", () => {
      const fields = getAllFieldNames("pro");
      expect(fields).toContain("projects");
    });

    it("has testimonials", () => {
      const fields = getAllFieldNames("pro");
      expect(fields).toContain("testimonials");
    });

    it("has stats and tagline", () => {
      const fields = getAllFieldNames("pro");
      expect(fields).toContain("stats");
      expect(fields).toContain("tagline");
    });

    it("has domain_preference (.lat)", () => {
      const fields = getAllFieldNames("pro");
      expect(fields).toContain("domain_preference");
    });

    it("does NOT have services", () => {
      const fields = getAllFieldNames("pro");
      expect(fields).not.toContain("services");
    });

    it("does NOT have personal_quote", () => {
      const fields = getAllFieldNames("pro");
      expect(fields).not.toContain("personal_quote");
    });
  });

  describe("Premium fields", () => {
    it("has inherited fields (achievements, certifications, languages, skills_override)", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("achievements");
      expect(fields).toContain("certifications");
      expect(fields).toContain("languages");
      expect(fields).toContain("skills_override");
    });

    it("has projects (max 10)", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("projects");
      const projectsField = TIER_CONFIGS.premium.steps
        .flatMap((s) => s.fields)
        .find((f) => f.name === "projects");
      expect(projectsField?.maxItems).toBe(10);
    });

    it("has testimonials and personal_quote", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("testimonials");
      expect(fields).toContain("personal_quote");
    });

    it("has services", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("services");
    });

    it("has stats and tagline", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("stats");
      expect(fields).toContain("tagline");
    });

    it("has about_photo", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("about_photo");
    });

    it("has domain_preference (.com)", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("domain_preference");
    });

    it("has creative direction fields", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("design_references");
      expect(fields).toContain("brand_values");
      expect(fields).toContain("target_audience");
      expect(fields).toContain("font_preference");
      expect(fields).toContain("animation_preference");
    });

    it("has custom_sections and media", () => {
      const fields = getAllFieldNames("premium");
      expect(fields).toContain("custom_sections");
      expect(fields).toContain("media");
    });
  });
});

describe("TIER_CONFIGS tier metadata", () => {
  it("Starter price is S/ 99", () => {
    expect(TIER_CONFIGS.starter.price).toBe("S/ 99");
  });

  it("Plus price is S/ 199", () => {
    expect(TIER_CONFIGS.plus.price).toBe("S/ 199");
  });

  it("Pro price is S/ 349", () => {
    expect(TIER_CONFIGS.pro.price).toBe("S/ 349");
  });

  it("Premium price is S/ 599", () => {
    expect(TIER_CONFIGS.premium.price).toBe("S/ 599");
  });

  it("all tiers have delivery times", () => {
    Object.values(TIER_CONFIGS).forEach((config) => {
      expect(config.deliveryTime).toBeTruthy();
      expect(config.deliveryTime).toContain("dias habiles");
    });
  });

  it("all tiers have features", () => {
    Object.values(TIER_CONFIGS).forEach((config) => {
      expect(config.features.length).toBeGreaterThan(0);
    });
  });
});

describe("TIER_CONFIGS confirmation step", () => {
  it("every tier ends with confirmation step", () => {
    const tiers: Tier[] = ["starter", "plus", "pro", "premium"];
    tiers.forEach((tier) => {
      const steps = TIER_CONFIGS[tier].steps;
      const lastStep = steps[steps.length - 1];
      expect(lastStep.id).toBe("confirmacion");
      expect(lastStep.fields).toHaveLength(0);
    });
  });
});

describe("TIER_CONFIGS payment step", () => {
  it("every tier starts with payment step", () => {
    const tiers: Tier[] = ["starter", "plus", "pro", "premium"];
    tiers.forEach((tier) => {
      const firstStep = TIER_CONFIGS[tier].steps[0];
      expect(firstStep.id).toBe("pago");
      expect(firstStep.fields[0].name).toBe("payment_proof");
      expect(firstStep.fields[0].required).toBe(true);
    });
  });
});

describe("getStepFieldNames", () => {
  it("returns field names for a valid step", () => {
    const names = getStepFieldNames("starter", 4); // contacto step
    expect(names).toContain("contact_email");
    expect(names).toContain("linkedin_url");
    expect(names).toContain("contact_phone");
    expect(names).toContain("socials");
  });

  it("returns empty array for out-of-bounds step", () => {
    expect(getStepFieldNames("starter", 99)).toEqual([]);
  });

  it("returns empty array for confirmation step", () => {
    const names = getStepFieldNames("starter", 5); // confirmacion
    expect(names).toEqual([]);
  });

  it("Pro step 4 (extra) has inherited fields", () => {
    const names = getStepFieldNames("pro", 4); // extra step
    expect(names).toContain("achievements");
    expect(names).toContain("certifications");
    expect(names).toContain("languages");
    expect(names).toContain("skills_override");
  });

  it("Premium step 7 (metricas-servicios) has stats + tagline + services", () => {
    const names = getStepFieldNames("premium", 7);
    expect(names).toContain("stats");
    expect(names).toContain("tagline");
    expect(names).toContain("services");
  });
});

describe("TIER_CONFIGS Pro vs Plus differentiation", () => {
  it("Pro has projects but Plus does not", () => {
    const plusFields = TIER_CONFIGS.plus.steps.flatMap((s) => s.fields.map((f) => f.name));
    const proFields = TIER_CONFIGS.pro.steps.flatMap((s) => s.fields.map((f) => f.name));
    expect(plusFields).not.toContain("projects");
    expect(proFields).toContain("projects");
  });

  it("Pro has testimonials but Plus does not", () => {
    const plusFields = TIER_CONFIGS.plus.steps.flatMap((s) => s.fields.map((f) => f.name));
    const proFields = TIER_CONFIGS.pro.steps.flatMap((s) => s.fields.map((f) => f.name));
    expect(plusFields).not.toContain("testimonials");
    expect(proFields).toContain("testimonials");
  });

  it("Pro has domain_preference but Plus does not", () => {
    const plusFields = TIER_CONFIGS.plus.steps.flatMap((s) => s.fields.map((f) => f.name));
    const proFields = TIER_CONFIGS.pro.steps.flatMap((s) => s.fields.map((f) => f.name));
    expect(plusFields).not.toContain("domain_preference");
    expect(proFields).toContain("domain_preference");
  });
});

describe("TIER_CONFIGS Premium vs Pro differentiation", () => {
  it("Premium has services but Pro does not", () => {
    const proFields = TIER_CONFIGS.pro.steps.flatMap((s) => s.fields.map((f) => f.name));
    const premiumFields = TIER_CONFIGS.premium.steps.flatMap((s) => s.fields.map((f) => f.name));
    expect(proFields).not.toContain("services");
    expect(premiumFields).toContain("services");
  });

  it("Premium has personal_quote but Pro does not", () => {
    const proFields = TIER_CONFIGS.pro.steps.flatMap((s) => s.fields.map((f) => f.name));
    const premiumFields = TIER_CONFIGS.premium.steps.flatMap((s) => s.fields.map((f) => f.name));
    expect(proFields).not.toContain("personal_quote");
    expect(premiumFields).toContain("personal_quote");
  });

  it("Premium has about_photo but Pro does not", () => {
    const proFields = TIER_CONFIGS.pro.steps.flatMap((s) => s.fields.map((f) => f.name));
    const premiumFields = TIER_CONFIGS.premium.steps.flatMap((s) => s.fields.map((f) => f.name));
    expect(proFields).not.toContain("about_photo");
    expect(premiumFields).toContain("about_photo");
  });

  it("Premium has creative direction fields but Pro does not", () => {
    const proFields = TIER_CONFIGS.pro.steps.flatMap((s) => s.fields.map((f) => f.name));
    const premiumFields = TIER_CONFIGS.premium.steps.flatMap((s) => s.fields.map((f) => f.name));
    expect(proFields).not.toContain("design_references");
    expect(premiumFields).toContain("design_references");
    expect(proFields).not.toContain("brand_values");
    expect(premiumFields).toContain("brand_values");
  });

  it("Premium allows 10 projects vs Pro's 4", () => {
    const proProjects = TIER_CONFIGS.pro.steps
      .flatMap((s) => s.fields)
      .find((f) => f.name === "projects");
    const premiumProjects = TIER_CONFIGS.premium.steps
      .flatMap((s) => s.fields)
      .find((f) => f.name === "projects");
    expect(proProjects?.maxItems).toBe(4);
    expect(premiumProjects?.maxItems).toBe(10);
  });
});

describe("TIER_CONFIGS conditional fields", () => {
  it("custom_colors in Plus/Pro has showWhen condition on color_preference", () => {
    const tiers: Tier[] = ["plus", "pro"];
    tiers.forEach((tier) => {
      const customColorsField = TIER_CONFIGS[tier].steps
        .flatMap((s) => s.fields)
        .find((f) => f.name === "custom_colors");
      expect(customColorsField?.showWhen).toEqual({
        field: "color_preference",
        value: "custom",
      });
    });
  });

  it("Premium custom_colors also has showWhen condition", () => {
    const customColorsField = TIER_CONFIGS.premium.steps
      .flatMap((s) => s.fields)
      .find((f) => f.name === "custom_colors");
    expect(customColorsField?.showWhen).toEqual({
      field: "color_preference",
      value: "custom",
    });
  });
});
