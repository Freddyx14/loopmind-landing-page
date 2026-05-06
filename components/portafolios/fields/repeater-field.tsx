"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import type { FieldConfig } from "@/lib/portafolios/types";
import { TextInput } from "./text-input";
import { TextareaInput } from "./textarea-input";
import { UrlInput } from "./url-input";
import { FileUpload } from "./file-upload";

interface RepeaterFieldProps {
  name: string;
  label: string;
  required?: boolean;
  helperText?: string;
  maxItems?: number;
  subFields: FieldConfig[];
  sessionId: string;
  tier: string;
}

export function RepeaterField({
  name,
  label,
  required,
  helperText,
  maxItems = 10,
  subFields,
  sessionId,
  tier,
}: RepeaterFieldProps) {
  const { control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  const error = errors[name]?.message as string | undefined;
  const atMax = fields.length >= maxItems;

  const getDefaultEntry = () => {
    const entry: Record<string, string> = {};
    subFields.forEach((f) => {
      entry[f.name] = "";
    });
    return entry;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
        {!atMax && (
          <button
            type="button"
            onClick={() => append(getDefaultEntry())}
            className="text-xs text-accent hover:text-accent/80 transition-colors font-medium"
          >
            + Agregar
          </button>
        )}
      </div>

      {error && <p className="text-xs text-accent">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-text-secondary">{helperText}</p>
      )}

      {fields.length === 0 && (
        <button
          type="button"
          onClick={() => append(getDefaultEntry())}
          className="w-full rounded-lg border border-dashed border-zinc-700 bg-surface-elevated p-6 text-center text-sm text-text-secondary hover:border-zinc-500 transition-colors"
        >
          + Agregar {label.toLowerCase()}
        </button>
      )}

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-zinc-800 bg-surface-elevated/50 p-4 space-y-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-secondary">
                #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-text-secondary hover:text-accent transition-colors"
              >
                Eliminar
              </button>
            </div>

            {subFields.map((subField) => {
              const fieldName = `${name}.${index}.${subField.name}`;

              switch (subField.type) {
                case "text":
                  return (
                    <TextInput
                      key={fieldName}
                      name={fieldName}
                      label={subField.label}
                      placeholder={subField.placeholder}
                      required={subField.required}
                    />
                  );
                case "textarea":
                  return (
                    <TextareaInput
                      key={fieldName}
                      name={fieldName}
                      label={subField.label}
                      placeholder={subField.placeholder}
                      required={subField.required}
                    />
                  );
                case "url":
                  return (
                    <UrlInput
                      key={fieldName}
                      name={fieldName}
                      label={subField.label}
                      placeholder={subField.placeholder}
                      required={subField.required}
                    />
                  );
                case "file":
                  return (
                    <FileUpload
                      key={fieldName}
                      name={fieldName}
                      label={subField.label}
                      accept={subField.accept}
                      maxSize={subField.maxSize}
                      sessionId={sessionId}
                      tier={tier}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        ))}
      </div>

      {fields.length > 0 && !atMax && (
        <button
          type="button"
          onClick={() => append(getDefaultEntry())}
          className="w-full rounded-lg border border-dashed border-zinc-700 py-2.5 text-center text-xs text-text-secondary hover:border-zinc-500 hover:text-text-primary transition-colors"
        >
          + Agregar otro
        </button>
      )}
    </div>
  );
}
