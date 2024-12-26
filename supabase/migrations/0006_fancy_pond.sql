/*
  # Add habits table if not exists

  1. New Tables
    - `habits`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, optional)
      - `frequency` (text: 'daily' or 'weekly')
      - `startDate` (timestamptz)
      - `completedDates` (text array)
      - `active` (boolean)
      - `category` (text)
      - `user_id` (uuid, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS if not already enabled
    - Add public access policy if not exists
*/

-- Create habits table if not exists
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS habits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    frequency text CHECK (frequency IN ('daily', 'weekly')) NOT NULL,
    "startDate" timestamptz NOT NULL DEFAULT now(),
    "completedDates" text[] DEFAULT '{}',
    active boolean DEFAULT true,
    category text NOT NULL,
    user_id uuid,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS if not already enabled
DO $$ BEGIN
  ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create policy if not exists
DO $$ BEGIN
  CREATE POLICY "Public access for habits"
    ON habits FOR ALL
    USING (true)
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create updated_at trigger if not exists
DO $$ BEGIN
  CREATE TRIGGER update_habits_updated_at
    BEFORE UPDATE ON habits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;