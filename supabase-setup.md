# Supabase Setup — Portfolio Factory

Run these in the **SQL Editor** of your Supabase project dashboard.

## 1. Create the submissions table

```sql
CREATE TABLE portfolio_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  tier TEXT NOT NULL CHECK (tier IN ('starter', 'plus', 'pro', 'premium')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'in_development', 'ready', 'sent', 'delivered', 'review', 'paused', 'changes')),
  session_id UUID NOT NULL,

  -- Core fields
  full_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  linkedin_url TEXT,

  -- All form data as JSONB
  form_data JSONB NOT NULL,

  -- File references
  files JSONB DEFAULT '[]'::jsonb,

  -- Admin fields
  payment_verified BOOLEAN DEFAULT false,
  portfolio_url TEXT,
  repo_url TEXT,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_submissions_status ON portfolio_submissions(status);
CREATE INDEX idx_submissions_tier ON portfolio_submissions(tier);
CREATE INDEX idx_submissions_email ON portfolio_submissions(contact_email);
```

## 2. Create the storage bucket

```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-uploads',
  'portfolio-uploads',
  false,
  10485760,
  ARRAY[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
);
```

## 3. Enable RLS + policies

```sql
-- Enable Row Level Security
ALTER TABLE portfolio_submissions ENABLE ROW LEVEL SECURITY;

-- Public can INSERT only (form submissions)
CREATE POLICY "public_insert" ON portfolio_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Storage: public can upload files
CREATE POLICY "public_upload" ON storage.objects
  FOR INSERT TO anon
  WITH CHECK (bucket_id = 'portfolio-uploads');

-- Storage: public can delete their own uploads (for file replacement)
CREATE POLICY "public_delete_own" ON storage.objects
  FOR DELETE TO anon
  USING (bucket_id = 'portfolio-uploads');
```

## 4. (Optional) Auto-update `updated_at` timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON portfolio_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

---

## Where to find your credentials

1. Go to your Supabase project dashboard
2. **Settings > API**
3. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
