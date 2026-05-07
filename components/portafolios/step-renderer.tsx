"use client";

import { useFormContext } from "react-hook-form";
import type { StepConfig, FieldConfig } from "@/lib/portafolios/types";
import { TextInput } from "./fields/text-input";
import { TextareaInput } from "./fields/textarea-input";
import { SelectInput } from "./fields/select-input";
import { UrlInput } from "./fields/url-input";
import { PhoneInput } from "./fields/phone-input";
import { FileUpload } from "./fields/file-upload";
import { TagInput } from "./fields/tag-input";
import { RepeaterField } from "./fields/repeater-field";

interface StepRendererProps {
  step: StepConfig;
  sessionId: string;
  tier: string;
}

function RenderField({
  field,
  sessionId,
  tier,
}: {
  field: FieldConfig;
  sessionId: string;
  tier: string;
}) {
  const { watch } = useFormContext();

  // Conditional visibility
  if (field.showWhen) {
    const watchedValue = watch(field.showWhen.field);
    if (watchedValue !== field.showWhen.value) return null;
  }

  switch (field.type) {
    case "text":
      return (
        <TextInput
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
        />
      );
    case "email":
      return (
        <TextInput
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
          type="email"
        />
      );
    case "textarea":
      return (
        <TextareaInput
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
        />
      );
    case "select":
      return (
        <SelectInput
          name={field.name}
          label={field.label}
          options={field.options ?? []}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
        />
      );
    case "url":
      return (
        <UrlInput
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
        />
      );
    case "phone":
      return (
        <PhoneInput
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
        />
      );
    case "file":
      return (
        <FileUpload
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
          accept={field.accept}
          maxSize={field.maxSize}
          minDimensions={field.minDimensions}
          sessionId={sessionId}
          tier={tier}
        />
      );
    case "tags":
      return (
        <TagInput
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          required={field.required}
          helperText={field.helperText}
          maxItems={field.maxItems}
        />
      );
    case "repeater":
      return (
        <RepeaterField
          name={field.name}
          label={field.label}
          required={field.required}
          helperText={field.helperText}
          maxItems={field.maxItems}
          subFields={field.fields ?? []}
          sessionId={sessionId}
          tier={tier}
        />
      );
    default:
      return null;
  }
}

export function StepRenderer({ step, sessionId, tier }: StepRendererProps) {
  return (
    <div className="space-y-5">
      {/* Step header */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-text-primary">
          {step.title}
        </h2>
        {step.description && (
          <p className="text-sm text-text-secondary">{step.description}</p>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {step.fields.map((field) => (
          <RenderField
            key={field.name}
            field={field}
            sessionId={sessionId}
            tier={tier}
          />
        ))}
      </div>
    </div>
  );
}
