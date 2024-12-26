/*
  # Add habits table

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
    - Enable RLS
    - Add public access policy
*/

-- Create habits table
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

-- Enable RLS
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Create public access policy
CREATE POLICY "Public access for habits"
  ON habits FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE TRIGGER update_habits_updated_at
  BEFORE UPDATE ON habits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();