/*
  # SaaS Challenge Schema

  1. New Tables
    - `saas_challenges`
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `start_date` (timestamptz)
      - `current_mrr` (numeric)
      - `active_users` (integer)
      - `conversion_rate` (numeric)
      - `churn_rate` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `saas_tasks`
      - `id` (uuid, primary key)
      - `challenge_id` (uuid)
      - `day` (integer)
      - `title` (text)
      - `completed` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create saas_challenges table
CREATE TABLE saas_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  start_date timestamptz NOT NULL DEFAULT now(),
  current_mrr numeric(10,2) DEFAULT 0,
  active_users integer DEFAULT 0,
  conversion_rate numeric(5,2) DEFAULT 0,
  churn_rate numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create saas_tasks table
CREATE TABLE saas_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid REFERENCES saas_challenges(id) ON DELETE CASCADE,
  day integer NOT NULL,
  title text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE saas_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE saas_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public access for saas_challenges"
  ON saas_challenges FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for saas_tasks"
  ON saas_tasks FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at triggers
CREATE TRIGGER update_saas_challenges_updated_at
  BEFORE UPDATE ON saas_challenges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_saas_tasks_updated_at
  BEFORE UPDATE ON saas_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();