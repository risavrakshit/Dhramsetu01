-- Create lawyers table for Dharmsetu
CREATE TABLE IF NOT EXISTS public.lawyers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  category TEXT NOT NULL,
  years_of_experience INTEGER NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  institute TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view all lawyers
CREATE POLICY "lawyers_select_all" ON public.lawyers 
  FOR SELECT USING (true);

-- Policy: Users can insert their own lawyer profile
CREATE POLICY "lawyers_insert_own" ON public.lawyers 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update only their own lawyer profile
CREATE POLICY "lawyers_update_own" ON public.lawyers 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete only their own lawyer profile
CREATE POLICY "lawyers_delete_own" ON public.lawyers 
  FOR DELETE USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS lawyers_category_idx ON public.lawyers(category);
CREATE INDEX IF NOT EXISTS lawyers_user_id_idx ON public.lawyers(user_id);
