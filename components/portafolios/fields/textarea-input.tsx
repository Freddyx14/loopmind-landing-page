"use client";

import { useFormContext } from "react-hook-form";

interface TextareaInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  maxLength?: number;
  rows?: number;
}

export function TextareaInput({
  name,
  label,
  placeholder,
  required,
  helperText,
  maxLength = 500,
  rows = 4,
}: TextareaInputProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;
  const value = watch(name) as string | undefined;
  const charCount = value?.length ?? 0;

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name)}
        className={`w-full rounded-lg bg-surface-elevated border px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors resize-none ${
          error
            ? "border-accent"
            : "border-text-secondary/20 focus:border-accent"
        }`}
      />
      <div className="flex justify-between">
        {error ? (
          <p className="text-xs text-accent">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-text-secondary">{helperText}</p>
        ) : (
          <span />
        )}
        <span className="text-xs text-text-secondary">
          {charCount}/{maxLength}
        </span>
      </div>
    </div>
  );
}
