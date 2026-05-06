"use client";

import { useFormContext } from "react-hook-form";

interface UrlInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export function UrlInput({
  name,
  label,
  placeholder = "https://",
  required,
  helperText,
}: UrlInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={name}
        type="url"
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-lg bg-surface-elevated border px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none transition-colors ${
          error
            ? "border-accent"
            : "border-zinc-700 focus:border-accent"
        }`}
      />
      {error && <p className="text-xs text-accent">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-text-secondary">{helperText}</p>
      )}
    </div>
  );
}
