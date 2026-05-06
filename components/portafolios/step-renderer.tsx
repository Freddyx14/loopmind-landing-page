"use client";

import type { StepConfig } from "@/lib/portafolios/types";
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
        {step.fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <TextInput
                  key={field.name}
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
                  key={field.name}
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
                  key={field.name}
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
                  key={field.name}
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
                  key={field.name}
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
                  key={field.name}
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
                  key={field.name}
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
                  key={field.name}
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
                  key={field.name}
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
        })}
      </div>
    </div>
  );
}
