"use client";

import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";

interface FileUploadProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  accept?: string;
  maxSize?: number;
  minDimensions?: { width: number; height: number };
  sessionId: string;
  tier: string;
}

export function FileUpload({
  name,
  label,
  placeholder = "Arrastra tu archivo aqui o haz clic para seleccionar",
  required,
  helperText,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5 * 1024 * 1024,
  minDimensions,
  sessionId,
  tier,
}: FileUploadProps) {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const currentValue = watch(name) as string | undefined;
  const error = errors[name]?.message as string | undefined;

  const validateImage = useCallback(
    (file: File): Promise<boolean> => {
      if (!minDimensions) return Promise.resolve(true);
      if (!file.type.startsWith("image/")) return Promise.resolve(true);

      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          URL.revokeObjectURL(img.src);
          resolve(
            img.width >= minDimensions.width &&
              img.height >= minDimensions.height
          );
        };
        img.onerror = () => resolve(false);
        img.src = URL.createObjectURL(file);
      });
    },
    [minDimensions]
  );

  const handleUpload = useCallback(
    async (file: File) => {
      // Validate size
      if (file.size > maxSize) {
        setValue(name, "", { shouldValidate: true });
        return;
      }

      // Validate dimensions
      if (minDimensions) {
        const valid = await validateImage(file);
        if (!valid) {
          setValue(name, "", { shouldValidate: true });
          return;
        }
      }

      setUploading(true);
      setProgress(0);
      setFileName(file.name);

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }

      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${tier}/${sessionId}/${name}/${timestamp}-${safeName}`;

      // Simulate progress for UX (Supabase doesn't expose upload progress)
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 90));
      }, 200);

      const { error: uploadError } = await supabase.storage
        .from("portfolio-uploads")
        .upload(path, file, { upsert: false });

      clearInterval(progressInterval);

      if (uploadError) {
        setUploading(false);
        setProgress(0);
        setFileName(null);
        setPreview(null);
        setValue(name, "", { shouldValidate: true });
        return;
      }

      setProgress(100);
      setUploading(false);
      setValue(name, path, { shouldValidate: true });
    },
    [maxSize, minDimensions, name, sessionId, tier, setValue, validateImage]
  );

  const handleRemove = useCallback(async () => {
    if (currentValue) {
      await supabase.storage.from("portfolio-uploads").remove([currentValue]);
    }
    setValue(name, "", { shouldValidate: true });
    setFileName(null);
    setPreview(null);
    setProgress(0);
  }, [currentValue, name, setValue]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleUpload(file);
    },
    [handleUpload]
  );

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>

      {currentValue && fileName ? (
        // File uploaded state
        <div className="rounded-lg border border-text-secondary/20 bg-surface-elevated p-4">
          <div className="flex items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-12 w-12 rounded object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded bg-surface-elevated">
                <svg
                  className="h-6 w-6 text-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary truncate">{fileName}</p>
              <p className="text-xs text-green-400">Subido correctamente</p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-text-secondary hover:text-accent transition-colors"
              aria-label="Eliminar archivo"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // Drop zone
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors cursor-pointer ${
            dragActive
              ? "border-accent bg-accent/5"
              : error
              ? "border-accent/50 bg-surface-elevated"
              : "border-text-secondary/20 bg-surface-elevated hover:border-text-secondary/40"
          }`}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={label}
          />

          {uploading ? (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Subiendo...</p>
              <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <svg
                className="mx-auto h-8 w-8 text-text-secondary mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-text-secondary">{placeholder}</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-accent">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-text-secondary">{helperText}</p>
      )}
    </div>
  );
}
