export type Tier = "starter" | "plus" | "pro" | "premium";

export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "url"
  | "phone"
  | "select"
  | "file"
  | "tags"
  | "repeater";

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number; // bytes
  minDimensions?: { width: number; height: number };
  maxItems?: number;
  options?: { value: string; label: string }[];
  fields?: FieldConfig[]; // for repeater sub-fields
  helperText?: string;
}

export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
}

export interface TierConfig {
  name: string;
  price: string;
  features: string[];
  steps: StepConfig[];
  deliveryTime: string;
}

export interface DraftData {
  formData: Record<string, unknown>;
  currentStep: number;
  sessionId: string;
  lastSaved: string; // ISO timestamp
}

export interface FileReference {
  type: "cv" | "photo" | "payment_proof" | "project_image" | "media";
  path: string;
  originalName: string;
  size: number;
}

export interface SubmissionPayload {
  tier: Tier;
  session_id: string;
  full_name: string;
  contact_email: string;
  contact_phone?: string;
  linkedin_url?: string;
  form_data: Record<string, unknown>;
  files: FileReference[];
}
