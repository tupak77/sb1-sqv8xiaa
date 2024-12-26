/*
  # Add habits tracking functionality

  1. New Tables
    - `habits`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, optional)
      - `frequency` (text, either 'daily' or 'weekly')
      - `start_date` (timestamptz)
      - `completed_dates` (text array)
      - `active` (boolean)
      - `category` (text)
      - `user_id` (uuid, nullable)
      - Timestamps (created_at, updated_at)

  2. Security
    - Enable RLS on `habits` table
    - Add policy for public access (matching existing tables)
*/

-- Create habits table
CREATE TABLE habits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  frequency text CHECK (frequency IN ('daily', 'weekly')) NOT NULL,
  start_date timestamptz NOT NULL DEFAULT now(),
  completed_dates text[] DEFAULT '{}',
  active boolean DEFAULT true,
  category text NOT NULL,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;

-- Create public access policy (matching existing tables)
CREATE POLICY "Public access for habits"
  ON habits FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE TRIGGER update_habits_updated_at
  BEFORE UPDATE ON habits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();