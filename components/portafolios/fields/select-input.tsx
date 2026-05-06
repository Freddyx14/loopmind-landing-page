"use client";

import { useFormContext } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  helperText?: string;
}

export function SelectInput({
  name,
  label,
  options,
  placeholder = "Selecciona una opcion",
  required,
  helperText,
}: SelectInputProps) {
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
      <select
        id={name}
        {...register(name)}
        className={`w-full rounded-lg bg-surface-elevated border px-4 py-3 text-sm text-text-primary outline-none transition-colors appearance-none ${
          error
            ? "border-accent"
            : "border-zinc-700 focus:border-accent"
        }`}
      >
        <option value="" className="text-text-secondary">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-accent">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-text-secondary">{helperText}</p>
      )}
    </div>
  );
}
