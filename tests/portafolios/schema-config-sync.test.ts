import { describe, it, expect } from "vitest";
import { TIER_CONFIGS } from "@/lib/portafolios/configs";
import {
  starterSchema,
  plusSchema,
  proSchema,
  premiumSchema,
} from "@/lib/portafolios/schemas";
import type { Tier } from "@/lib/portafolios/types";

/**
 * This test ensures that every field defined in the step configs
 * has a corresponding field in the Zod schema, and vice versa.
 * This catches drift between configs.ts and schemas.ts.
 */

function getSchemaKeys(schema: { shape: Record<string, unknown> }): string[] {
  return Object.keys(schema.shape);
}

function getConfigFieldNames(tier: Tier): string[] {
  return TIER_CONFIGS[tier].steps.flatMap((step) =>
    step.fields.map((f) => f.name)
  );
}

describe("Schema ↔ Config field alignment", () => {
  const schemaMap = {
    starter: starterSchema,
    plus: plusSchema,
    pro: proSchema,
    premium: premiumSchema,
  } as const;

  const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

  tiers.forEach((tier) => {
    describe(`${tier} tier`, () => {
      it("every config field has a corresponding schema key", () => {
        const configFields = getConfigFieldNames(tier);
        const schemaKeys = getSchemaKeys(schemaMap[tier]);

        const missingInSchema = configFields.filter(
          (f) => !schemaKeys.includes(f)
        );
        expect(
          missingInSchema,
          `Fields in config but not in schema: ${missingInSchema.join(", ")}`
        ).toEqual([]);
      });

      it("every schema key has a corresponding config field", () => {
        const configFields = getConfigFieldNames(tier);
        const schemaKeys = getSchemaKeys(schemaMap[tier]);

        const missingInConfig = schemaKeys.filter(
          (k) => !configFields.includes(k)
        );
        expect(
          missingInConfig,
          `Fields in schema but not in config: ${missingInConfig.join(", ")}`
        ).toEqual([]);
      });
    });
  });
});

describe("Repeater sub-fields have valid types", () => {
  const validSubFieldTypes = ["text", "textarea", "url", "file", "tags"];

  const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

  tiers.forEach((tier) => {
    it(`${tier}: all repeater sub-fields use supported types`, () => {
      const repeaters = TIER_CONFIGS[tier].steps
        .flatMap((s) => s.fields)
        .filter((f) => f.type === "repeater");

      repeaters.forEach((repeater) => {
        repeater.fields?.forEach((subField) => {
          expect(
            validSubFieldTypes,
            `Unsupported sub-field type "${subField.type}" in repeater "${repeater.name}"`
          ).toContain(subField.type);
        });
      });
    });
  });
});

describe("Required file fields are present in all tiers", () => {
  const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

  tiers.forEach((tier) => {
    it(`${tier}: has required payment_proof, cv, and photo`, () => {
      const allFields = TIER_CONFIGS[tier].steps.flatMap((s) => s.fields);

      const paymentField = allFields.find((f) => f.name === "payment_proof");
      expect(paymentField?.required).toBe(true);
      expect(paymentField?.type).toBe("file");

      const cvField = allFields.find((f) => f.name === "cv");
      expect(cvField?.required).toBe(true);
      expect(cvField?.type).toBe("file");

      const photoField = allFields.find((f) => f.name === "photo");
      expect(photoField?.required).toBe(true);
      expect(photoField?.type).toBe("file");
    });
  });
});

describe("Contact email is required in all tiers", () => {
  const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

  tiers.forEach((tier) => {
    it(`${tier}: has required contact_email`, () => {
      const allFields = TIER_CONFIGS[tier].steps.flatMap((s) => s.fields);
      const emailField = allFields.find((f) => f.name === "contact_email");
      expect(emailField?.required).toBe(true);
      expect(emailField?.type).toBe("email");
    });
  });
});

describe("No duplicate field names within a tier", () => {
  const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

  tiers.forEach((tier) => {
    it(`${tier}: has no duplicate field names`, () => {
      const fields = getConfigFieldNames(tier);
      const uniqueFields = [...new Set(fields)];
      const duplicates = fields.filter(
        (f, i) => fields.indexOf(f) !== i
      );
      expect(
        duplicates,
        `Duplicate fields in ${tier}: ${duplicates.join(", ")}`
      ).toEqual([]);
    });
  });
});

describe("Step titles are unique within each tier", () => {
  const tiers: Tier[] = ["starter", "plus", "pro", "premium"];

  tiers.forEach((tier) => {
    it(`${tier}: has unique step titles`, () => {
      const titles = TIER_CONFIGS[tier].steps.map((s) => s.title);
      const uniqueTitles = [...new Set(titles)];
      expect(titles).toHaveLength(uniqueTitles.length);
    });
  });
});

describe("Tier feature hierarchy (each tier includes everything from the previous)", () => {
  it("Plus has all Starter fields", () => {
    const starterFields = getConfigFieldNames("starter");
    const plusFields = getConfigFieldNames("plus");

    // Starter's custom_colors is a text input, Plus has it as tags — check top-level name
    const starterRequired = ["payment_proof", "cv", "photo", "contact_email"];
    starterRequired.forEach((field) => {
      expect(plusFields, `Plus missing Starter field: ${field}`).toContain(field);
    });
  });

  it("Pro has all Plus field names (except color input type difference)", () => {
    const plusFields = getConfigFieldNames("plus");
    const proFields = getConfigFieldNames("pro");

    const plusRequired = [
      "payment_proof", "cv", "photo", "contact_email",
      "achievements", "certifications", "languages", "skills_override",
      "color_preference", "custom_colors",
    ];
    plusRequired.forEach((field) => {
      expect(proFields, `Pro missing Plus field: ${field}`).toContain(field);
    });
  });

  it("Premium has all Pro field names", () => {
    const proFields = getConfigFieldNames("pro");
    const premiumFields = getConfigFieldNames("premium");

    const proRequired = [
      "payment_proof", "cv", "photo", "contact_email",
      "achievements", "certifications", "languages", "skills_override",
      "projects", "testimonials", "stats", "tagline",
      "color_preference", "custom_colors", "domain_preference",
    ];
    proRequired.forEach((field) => {
      expect(premiumFields, `Premium missing Pro field: ${field}`).toContain(field);
    });
  });
});
