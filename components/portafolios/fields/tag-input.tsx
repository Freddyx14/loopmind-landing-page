"use client";

import { useState, useCallback, type KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";

interface TagInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  maxItems?: number;
}

export function TagInput({
  name,
  label,
  placeholder = "Escribe y presiona Enter",
  required,
  helperText,
  maxItems,
}: TagInputProps) {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  const tags = (watch(name) as string[] | undefined) ?? [];
  const error = errors[name]?.message as string | undefined;
  const atMax = maxItems !== undefined && tags.length >= maxItems;

  const addTag = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      if (tags.includes(trimmed)) return;
      if (atMax) return;

      setValue(name, [...tags, trimmed], { shouldValidate: true });
      setInputValue("");
    },
    [tags, atMax, name, setValue]
  );

  const removeTag = useCallback(
    (index: number) => {
      const next = tags.filter((_, i) => i !== index);
      setValue(name, next, { shouldValidate: true });
    },
    [tags, name, setValue]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>

      <div
        className={`flex flex-wrap gap-2 rounded-lg bg-surface-elevated border px-3 py-2.5 min-h-[44px] ${
          error
            ? "border-accent"
            : "border-text-secondary/20 focus-within:border-accent"
        }`}
      >
        {tags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 rounded-md bg-surface-elevated px-2.5 py-1 text-xs text-text-primary"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label={`Eliminar ${tag}`}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}

        {!atMax && (
          <input
            id={name}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] bg-transparent text-sm text-text-primary placeholder:text-text-secondary/50 outline-none"
          />
        )}
      </div>

      <div className="flex justify-between">
        {error ? (
          <p className="text-xs text-accent">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-text-secondary">{helperText}</p>
        ) : (
          <span />
        )}
        {maxItems && (
          <span className="text-xs text-text-secondary">
            {tags.length}/{maxItems}
          </span>
        )}
      </div>
    </div>
  );
}
